import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { X } from 'lucide-react-native';
import { formatBRL } from '../../../utils/money';
import { colors, spacing, radius, type, hitSlop } from '../../../theme';

interface Props {
    items: { id: string; name: string; price: number; quantity: number }[];
    onRemove: (id: string) => void;
}

// Itens da venda em formato de cupom: quantidade, nome, subtotal e botão de remover.
export const OrderSummary = ({ items, onRemove }: Props) => (
    <View style={styles.card}>
        {items.map((item, index) => (
            <View key={item.id} style={[styles.itemRow, index > 0 && styles.itemRowBorder]}>
                <Text style={styles.qty}>{item.quantity}×</Text>
                <View style={styles.itemInfo}>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.itemSub}>{formatBRL(item.price)} cada</Text>
                </View>
                <Text style={styles.itemPrice}>{formatBRL(item.price * item.quantity)}</Text>
                <Pressable
                    onPress={() => onRemove(item.id)}
                    hitSlop={hitSlop}
                    accessibilityRole="button"
                    accessibilityLabel={`Remover ${item.name}`}
                    style={styles.remove}
                >
                    <X size={14} color={colors.inkSoft} strokeWidth={2.5} />
                </Pressable>
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: colors.line,
        paddingHorizontal: spacing.lg,
    },

    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.md,
    },

    itemRowBorder: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.line,
    },

    qty: {
        ...type.money,
        minWidth: 28,
    },

    itemInfo: {
        flex: 1,
    },

    itemName: {
        ...type.bodyStrong,
        fontSize: 14,
    },

    itemSub: {
        ...type.caption,
        fontSize: 12,
        marginTop: 1,
    },

    itemPrice: {
        ...type.money,
        fontSize: 14,
    },

    remove: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: colors.sunken,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
