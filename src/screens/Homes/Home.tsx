import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Plus, TrendingDown, BarChart3, List } from "lucide-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../navigations/types";
import { useAuth } from "../../contexts/AuthContext";

import { getSales } from "../../services/saleService";

import { SummaryCard } from "../../components/SummaryCard";
import { TotalSalesBanner } from "../../components/TotalSalesBanner";
import { QuickAction } from "../../components/QuickAction";
import { RecentSale } from "../../components/RecentSale";
import { getDashboardSummary } from "../../services/dashboardService";

type NavigationProp = BottomTabNavigationProp<
    TabParamList,
    'HomeTab'
>;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { user } = useAuth();
    const [totalCount, setTotalCount] = useState(0);
    const [recentSales, setRecentSales] = useState<any[]>([]);
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
                value: `R$ ${sale.total.toFixed(2)}`
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
        const date = new Date();

        const formatted = date.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "long"
        });

        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }

    return (
        <SafeAreaProvider style={styles.safe}>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadData} />
                }
            >

                <View style={styles.header}>
                    <Text style={styles.greeting}>Olá, {user?.name || "Usuário"}! 👋</Text>
                    <Text style={styles.date}>{formatDate()}</Text>
                </View>

                <View style={styles.row}>
                    <SummaryCard 
                        label="HOJE" 
                        value={`R$ ${summary.today.toFixed(2)}`}
                        color="#3653E2" 
                    />

                    <SummaryCard 
                        label="SEMANA" 
                        value={`R$ ${summary.week.toFixed(2)}`}
                        color="#21C45D" 
                    />

                    <SummaryCard 
                        label="MÊS" 
                        value={`R$ ${summary.month.toFixed(2)}`}
                        color="#F59F0A" 
                    />
                </View>

                <TotalSalesBanner total={totalCount} />

                <Text style={styles.sectionTitle}>Atalhos rápidos</Text>
                <View style={styles.row}>
                    <QuickAction 
                        label="Nova Venda" 
                        Icon={Plus} 
                        color="#FFF" 
                        bgColor="#3653E2" 
                        isPrimary 
                        onPress={() => navigation.navigate('Novo')} 
                    />
                    <QuickAction 
                        label="Gastos" 
                        Icon={TrendingDown} 
                        color="#EF4444" 
                        bgColor="#FEE2E2" 
                        onPress={() => navigation.navigate('ExpensesList')}
                    />
                    <QuickAction 
                        label="Relatórios" 
                        Icon={BarChart3} 
                        color="#10B981" 
                        bgColor="#D1FAE5" 
                        onPress={() => navigation.navigate('Reports' as never)}
                    />
                    <QuickAction 
                        label="Vendas" 
                        Icon={List} 
                        color="#F59F0A" 
                        bgColor="#FEF3C7" 
                        onPress={() => navigation.navigate('Vendas')}  
                    />
                </View>

                <Text style={styles.sectionTitle}>Vendas recentes</Text>
                {recentSales.length > 0 ? (
                    recentSales.map(sale => (
                        <RecentSale 
                            key={sale.id}
                            name={sale.name} 
                            time={sale.time} 
                            value={sale.value}
                        />
                    ))
                ) : (
                    <Text style={styles.emptyText}>Nenhuma venda recente.</Text>
                )

                }

            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 10,
    },

    container: { 
        padding: 20, 
        paddingBottom: 100 
    },

    header: { 
        marginBottom: 20 
    },

    greeting: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },

    date: {
        fontSize: 14,
        color: '#C7C7C7',
        marginTop: 4
    },

    row: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start' 
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 25,
        marginBottom: 15
    },

    emptyText: {
        color: '#C7C7C7',
        textAlign: 'center',
        marginTop: 10,
        fontStyle: 'italic'
    }
});