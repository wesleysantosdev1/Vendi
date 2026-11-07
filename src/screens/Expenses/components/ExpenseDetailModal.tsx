import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Package } from 'lucide-react-native';
import formatDateTime from '../../../utils/date';
import { formatBRL } from '../../../utils/money';
import { Expense } from '../../../contexts/ExpenseContext';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { colors, spacing, radius, type } from '../../../theme';

interface Props {
    visible: boolean;
    expense: Expense | null;
    onClose: () => void;
}

export const ExpenseDetailModal = ({ visible, expense, onClose }: Props) => {
    if (!expense) return null;

    const linkedProduct = expense.linkedProductName
        || (expense.productId ? 'Produto vinculado' : 'Nenhum');

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <SafeAreaProvider>
                <SafeAreaView style={styles.safe}>
                    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                        <ScreenHeader
                            eyebrow={expense.type === 'merchandise' ? 'Compra de mercadoria' : 'Gasto operacional'}
                            title={expense.description}
                            onBack={onClose}
                        />

                        <View style={styles.content}>
                            <View style={styles.hero}>
                                <Text style={styles.heroLabel}>Valor</Text>
                                <Text style={styles.heroValue} numberOfLines={1} adjustsFontSizeToFit>
                                    − {formatBRL(expense.value)}
                                </Text>
                            </View>

                            <View style={styles.group}>
                                <DetailRow label="Descrição" value={expense.description} strong />
                                <DetailRow label="Data e hora" value={formatDateTime(expense.date)} />
                                <DetailRow label="Quantidade" value={expense.quantity ? `${expense.quantity} un.` : '—'} />
                                <DetailRow label="Produto" value={linkedProduct} last />
                            </View>

                            {expense.type === 'merchandise' && expense.linkedProductName && expense.quantity ? (
                                <View style={styles.stockNote}>
                                    <View style={styles.stockIcon}>
                                        <Package size={18} color={colors.ink} />
                                    </View>
                                    <View style={styles.stockInfo}>
                                        <Text style={styles.stockTitle}>Estoque atualizado</Text>
                                        <Text style={styles.stockDesc}>
                                            +{expense.quantity} unidades adicionadas a "{expense.linkedProductName}"
                                        </Text>
                                    </View>
                                </View>
                            ) : null}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </Modal>
    );
};

interface DetailRowProps {
    label: string;
    value: string;
    strong?: boolean;
    last?: boolean;
}

const DetailRow = ({ label, value, strong, last }: DetailRowProps) => (
    <View style={[styles.row, !last && styles.rowBorder]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, strong && styles.valueStrong]}>{value}</Text>
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
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: colors.line,
        padding: spacing.xl,
        marginBottom: spacing.md,
    },

    heroLabel: {
        ...type.eyebrow,
    },

    heroValue: {
        ...type.display,
        color: colors.danger,
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

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.lg,
        paddingVertical: spacing.md + 2,
    },

    rowBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.line,
    },

    label: {
        ...type.caption,
        fontSize: 14,
    },

    value: {
        ...type.body,
        flex: 1,
        textAlign: 'right',
    },

    valueStrong: {
        fontWeight: '700',
    },

    stockNote: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.limeSoft,
        padding: spacing.lg,
        borderRadius: radius.lg,
        borderCurve: 'continuous',
        marginTop: spacing.md,
    },

    stockIcon: {
        backgroundColor: colors.surface,
        padding: spacing.sm,
        borderRadius: radius.sm,
    },

    stockInfo: {
        marginLeft: spacing.md,
        flex: 1,
    },

    stockTitle: {
        ...type.eyebrow,
    },

    stockDesc: {
        ...type.bodyStrong,
        fontSize: 14,
        marginTop: 2,
    },
});
