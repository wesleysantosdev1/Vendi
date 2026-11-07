import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { colors, spacing, radius } from '../../../theme';

interface Props {
    label: string;
    // Estoque ainda disponível (já descontando o que está no carrinho).
    stock: number;
    // Quantidade desse produto já adicionada na venda atual.
    inCart?: number;
    onPress: () => void;
}

export const ProductChip = ({ label, stock, inCart = 0, onPress }: Props) => {
    const isOutOfStock = (stock ?? 0) <= 0;
    const selected = inCart > 0;

    return (
        <Pressable
            onPress={isOutOfStock ? undefined : onPress}
            disabled={isOutOfStock}
            accessibilityRole="button"
            accessibilityLabel={`${label}, ${isOutOfStock ? 'esgotado' : `${stock} em estoque`}`}
            accessibilityState={{ disabled: isOutOfStock, selected }}
            style={({ pressed }) => [
                styles.chip,
                selected && styles.chipSelected,
                isOutOfStock && styles.chipDisabled,
                pressed && styles.chipPressed,
            ]}
        >
            {selected ? (
                <View style={styles.qtyBadge}>
                    <Text style={styles.qtyText}>{inCart}</Text>
                </View>
            ) : (
                <Plus size={14} color={isOutOfStock ? colors.inkFaint : colors.ink} strokeWidth={2.5} />
            )}
            <Text style={[styles.label, selected && styles.labelSelected, isOutOfStock && styles.labelDisabled]} numberOfLines={1}>
                {label}
            </Text>
            <Text style={[styles.stock, selected && styles.stockSelected]}>
                {isOutOfStock ? 'esgotado' : stock}
            </Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        paddingHorizontal: spacing.md,
        height: 40,
        borderRadius: radius.full,
        maxWidth: '100%',
    },

    chipSelected: {
        backgroundColor: colors.ink,
        borderColor: colors.ink,
    },

    chipDisabled: {
        backgroundColor: colors.sunken,
        borderColor: colors.sunken,
    },

    chipPressed: {
        transform: [{ scale: 0.97 }],
    },

    qtyBadge: {
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        paddingHorizontal: 5,
        backgroundColor: colors.lime,
        alignItems: 'center',
        justifyContent: 'center',
    },

    qtyText: {
        fontSize: 11,
        fontWeight: '800',
        color: colors.onLime,
        fontVariant: ['tabular-nums'],
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.ink,
        flexShrink: 1,
    },

    labelSelected: {
        color: colors.onInk,
    },

    labelDisabled: {
        color: colors.inkFaint,
        textDecorationLine: 'line-through',
    },

    stock: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.inkFaint,
        fontVariant: ['tabular-nums'],
    },

    stockSelected: {
        color: colors.onInkSoft,
    },
});
