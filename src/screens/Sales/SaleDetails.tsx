import React from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenHeader } from "../../components/ScreenHeader";
import { formatBRL } from "../../utils/money";
import { colors, spacing, radius, type } from "../../theme";


export default function SaleDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const { sale } = route.params as any;

    const total = Number(sale.value) || 0;
    const items: any[] = sale.fullItems ?? [];

    return (
        <SafeAreaView style={styles.safe} edges={['top']}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <ScreenHeader eyebrow="Venda" title={sale.name} onBack={() => navigation.goBack()} />

                <View style={styles.content}>
                    {/* Total em destaque */}
                    <View style={styles.hero}>
                        <Text style={styles.heroLabel}>Total da venda</Text>
                        <Text style={styles.heroValue} numberOfLines={1} adjustsFontSizeToFit>
                            {formatBRL(total)}
                        </Text>
                    </View>

                    <View style={styles.group}>
                        <InfoRow label="Cliente" value={sale.name} strong />
                        <InfoRow label="Telefone" value={sale.phone || 'Não informado'} />
                        <InfoRow label="Data" value={sale.date} />
                        <InfoRow label="Itens" value={`${sale.items} ${sale.items === 1 ? 'item' : 'itens'}`} last />
                    </View>

                    {/* Cupom com os produtos */}
                    <Text style={styles.sectionTitle}>Produtos</Text>
                    <View style={styles.receipt}>
                        {items.length === 0 ? (
                            <Text style={styles.emptyText}>Nenhum produto nesta venda.</Text>
                        ) : (
                            items.map((item: any, index: number) => (
                                <View key={item.id ?? index} style={styles.productRow}>
                                    <Text style={styles.productQty}>{item.quantity}×</Text>
                                    <View style={styles.productInfo}>
                                        <Text style={styles.productName} numberOfLines={2}>
                                            {item.product?.name ?? 'Produto removido'}
                                        </Text>
                                        <Text style={styles.productUnit}>{formatBRL(item.price)} cada</Text>
                                    </View>
                                    <Text style={styles.productPrice}>
                                        {formatBRL((item.price ?? 0) * (item.quantity ?? 0))}
                                    </Text>
                                </View>
                            ))
                        )}

                        <View style={styles.receiptDivider} />

                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>{formatBRL(total)}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

interface InfoRowProps {
    label: string;
    value: string;
    strong?: boolean;
    last?: boolean;
}

const InfoRow = ({ label, value, strong, last }: InfoRowProps) => (
    <View style={[styles.infoRow, !last && styles.infoRowBorder]}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={[styles.infoValue, strong && styles.infoValueStrong]} numberOfLines={1}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: colors.paper,
    },

    container: {
        paddingBottom: spacing.xxxl,
    },

    content: {
        paddingHorizontal: spacing.xl,
    },

    hero: {
        backgroundColor: colors.ink,
        borderRadius: radius.xl,
        borderCurve: 'continuous',
        padding: spacing.xl,
        marginBottom: spacing.md,
    },

    heroLabel: {
        ...type.eyebrow,
        color: colors.onInkSoft,
    },

    heroValue: {
        ...type.display,
        color: colors.lime,
        marginTop: spacing.sm,
    },

    group: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: colors.line,
        paddingHorizontal: spacing.lg,
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.lg,
        paddingVertical: spacing.md + 2,
    },

    infoRowBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.line,
    },

    infoLabel: {
        ...type.caption,
        fontSize: 14,
    },

    infoValue: {
        ...type.body,
        flexShrink: 1,
        textAlign: 'right',
    },

    infoValueStrong: {
        fontWeight: '700',
    },

    sectionTitle: {
        ...type.eyebrow,
        marginTop: spacing.xxl,
        marginBottom: spacing.sm,
    },

    receipt: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: colors.line,
        padding: spacing.lg,
    },

    emptyText: {
        ...type.caption,
        textAlign: 'center',
        paddingVertical: spacing.md,
    },

    productRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.md,
        paddingVertical: spacing.sm,
    },

    productQty: {
        ...type.money,
        minWidth: 28,
    },

    productInfo: {
        flex: 1,
    },

    productName: {
        ...type.bodyStrong,
    },

    productUnit: {
        ...type.caption,
        fontSize: 12,
        marginTop: 2,
    },

    productPrice: {
        ...type.money,
    },

    receiptDivider: {
        height: 1,
        backgroundColor: colors.line,
        marginVertical: spacing.md,
    },

    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },

    totalLabel: {
        ...type.subheading,
    },

    totalValue: {
        ...type.money,
        fontSize: 20,
        fontWeight: '800',
    },
});
