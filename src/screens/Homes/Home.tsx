import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, TrendingDown, BarChart3, List, ShoppingBag } from "lucide-react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../navigations/types";
import { useAuth } from "../../contexts/AuthContext";

import { getSales } from "../../services/saleService";
import { getDashboardSummary } from "../../services/dashboardService";

import { SummaryCard } from "../../components/SummaryCard";
import { QuickAction } from "../../components/QuickAction";
import { TransactionRow } from "../../components/TransactionRow";
import { EmptyState } from "../../components/EmptyState";
import { Button } from "../../components/Button";
import { formatBRL } from "../../utils/money";
import { colors, spacing, radius, type } from "../../theme";

type NavigationProp = BottomTabNavigationProp<
    TabParamList,
    'HomeTab'
>;

type RecentSaleItem = {
    id: string;
    name: string;
    time: string;
    value: string;
};

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { user } = useAuth();
    const [totalCount, setTotalCount] = useState(0);
    const [recentSales, setRecentSales] = useState<RecentSaleItem[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [summary, setSummary] = useState({
        today: 0,
        week: 0,
        month: 0
    });

    const loadData = async () => {
        setRefreshing(true);
        try {
            const [salesData, summaryData] = await Promise.all([
                getSales(),
                getDashboardSummary()
            ]);

            setTotalCount(salesData.length);

            setSummary({
                today: summaryData.today,
                week: summaryData.week,
                month: summaryData.month
            })

            const latestFour = salesData.slice(0, 4).map((sale: any) => ({
                id: sale.id,
                name: sale.customerName,
                time: new Date(sale.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                value: formatBRL(sale.total)
            }));
            setRecentSales(latestFour);
        } catch (error) {
            console.error("Erro ao carregar vendas recentes", error);
        } finally {
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    function formatDate() {
        return new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "long"
        });
    }

    const firstName = user?.name?.trim().split(' ')[0] || "Usuário";

    return (
        <SafeAreaView style={styles.safe} edges={['top']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={loadData}
                        colors={[colors.ink]}
                        tintColor={colors.ink}
                    />
                }
            >
                <View style={styles.header}>
                    <Text style={styles.date}>{formatDate()}</Text>
                    <Text style={styles.greeting}>Olá, {firstName}</Text>
                </View>

                {/* Destaque do dia */}
                <View style={styles.hero}>
                    <View style={styles.heroTop}>
                        <View style={styles.heroDot} />
                        <Text style={styles.heroLabel}>Vendido hoje</Text>
                    </View>

                    <Text style={styles.heroValue} numberOfLines={1} adjustsFontSizeToFit>
                        {formatBRL(summary.today)}
                    </Text>

                    <View style={styles.heroDivider} />

                    <Text style={styles.heroFoot}>
                        <Text style={styles.heroFootStrong}>{totalCount}</Text>
                        {totalCount === 1 ? ' venda registrada no total' : ' vendas registradas no total'}
                    </Text>
                </View>

                <View style={styles.statsGroup}>
                    <SummaryCard label="Semana" value={formatBRL(summary.week)} />
                    <View style={styles.statsDivider} />
                    <SummaryCard label="Mês" value={formatBRL(summary.month)} />
                </View>

                <Button
                    title="Nova venda"
                    Icon={Plus}
                    onPress={() => navigation.navigate('Novo')}
                    style={styles.cta}
                />

                <View style={styles.actions}>
                    <QuickAction
                        label="Gastos"
                        Icon={TrendingDown}
                        onPress={() => navigation.navigate('ExpensesList')}
                    />
                    <QuickAction
                        label="Relatórios"
                        Icon={BarChart3}
                        onPress={() => navigation.navigate('Reports')}
                    />
                    <QuickAction
                        label="Vendas"
                        Icon={List}
                        onPress={() => navigation.navigate('Vendas')}
                    />
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Últimas vendas</Text>
                    {recentSales.length > 0 && (
                        <Pressable onPress={() => navigation.navigate('Vendas')} accessibilityRole="link">
                            <Text style={styles.sectionLink}>Ver todas</Text>
                        </Pressable>
                    )}
                </View>

                {recentSales.length > 0 ? (
                    recentSales.map(sale => (
                        <TransactionRow
                            key={sale.id}
                            title={sale.name}
                            subtitle={sale.time}
                            amount={sale.value}
                        />
                    ))
                ) : (
                    <EmptyState
                        Icon={ShoppingBag}
                        title="Nenhuma venda ainda"
                        hint="Toque em Nova venda para registrar a primeira."
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: colors.paper,
    },

    container: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.lg,
        paddingBottom: spacing.xxxl,
    },

    header: {
        marginBottom: spacing.xl,
    },

    date: {
        ...type.eyebrow,
        marginBottom: spacing.xs,
    },

    greeting: {
        ...type.title,
    },

    hero: {
        backgroundColor: colors.ink,
        borderRadius: radius.xl,
        borderCurve: 'continuous',
        padding: spacing.xl,
    },

    heroTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },

    heroLabel: {
        ...type.eyebrow,
        color: colors.onInkSoft,
    },

    heroDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.lime,
    },

    heroValue: {
        ...type.display,
        color: colors.lime,
        marginTop: spacing.md,
    },

    heroDivider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.inkRaised,
        marginVertical: spacing.lg,
    },

    heroFoot: {
        fontSize: 13,
        color: colors.onInkSoft,
    },

    heroFootStrong: {
        color: colors.onInk,
        fontWeight: '700',
    },

    statsGroup: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: colors.line,
        marginTop: spacing.md,
    },

    statsDivider: {
        width: StyleSheet.hairlineWidth,
        backgroundColor: colors.line,
        marginVertical: spacing.md,
    },

    cta: {
        marginTop: spacing.xl,
    },

    actions: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginTop: spacing.sm,
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: spacing.xxxl,
        marginBottom: spacing.xs,
    },

    sectionTitle: {
        ...type.heading,
    },

    sectionLink: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.ink,
        textDecorationLine: 'underline',
    },
});
