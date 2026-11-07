import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Package, Receipt } from 'lucide-react-native';
import formatDateTime from '../../../utils/date';
import { formatBRL } from '../../../utils/money';
import { Expense } from '../../../contexts/ExpenseContext';
import { TransactionRow } from '../../../components/TransactionRow';
import { colors, radius } from '../../../theme';

interface Props {
    item: Expense;
    onPress: () => void;
}

export const ExpenseItem = ({ item, onPress }: Props) => {
    const Icon = item.type === 'merchandise' ? Package : Receipt;
    const subtitle = item.quantity
        ? `${formatDateTime(item.date)} · ${item.quantity} un.`
        : formatDateTime(item.date);

    return (
        <TransactionRow
            title={item.description}
            subtitle={subtitle}
            amount={`− ${formatBRL(item.value)}`}
            tone="negative"
            onPress={onPress}
            leading={
                <View style={styles.iconBox}>
                    <Icon size={18} color={colors.danger} strokeWidth={2.25} />
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        borderCurve: 'continuous',
        backgroundColor: colors.dangerSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
