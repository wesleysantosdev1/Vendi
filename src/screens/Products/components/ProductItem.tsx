import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Pencil, Trash2 } from 'lucide-react-native';
import { Product } from "../hooks/useProductManager";
import { formatBRL } from "../../../utils/money";
import { colors, spacing, radius, type, hitSlop } from "../../../theme";

interface Props {
    item: Product;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

// Abaixo disso o estoque aparece como "baixo".
const LOW_STOCK = 3;

export const ProductItem = ({ item, onEdit, onDelete }: Props) => {
    const stock = Math.max(0, item.stock);
    const status = stock === 0 ? 'out' : stock <= LOW_STOCK ? 'low' : 'ok';

    return (
        <View style={styles.row}>
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <View style={styles.meta}>
                    <Text style={styles.price}>{formatBRL(item.price)}</Text>
                    <Text style={styles.sep}>·</Text>
                    {status === 'ok' ? (
                        <Text style={styles.stock}>{stock} em estoque</Text>
                    ) : (
                        <View style={[styles.badge, status === 'out' ? styles.badgeOut : styles.badgeLow]}>
                            <Text style={[styles.badgeText, status === 'out' ? styles.badgeTextOut : styles.badgeTextLow]}>
                                {status === 'out' ? 'Esgotado' : `Só ${stock}`}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            <Pressable
                onPress={() => onEdit(item)}
                hitSlop={hitSlop}
                accessibilityRole="button"
                accessibilityLabel={`Editar ${item.name}`}
                style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
            >
                <Pencil size={16} color={colors.ink} strokeWidth={2.25} />
            </Pressable>

            <Pressable
                onPress={() => onDelete(item)}
                hitSlop={hitSlop}
                accessibilityRole="button"
                accessibilityLabel={`Excluir ${item.name}`}
                style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
            >
                <Trash2 size={16} color={colors.danger} strokeWidth={2.25} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        paddingVertical: spacing.md + 2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.line,
    },

    info: {
        flex: 1,
        marginRight: spacing.sm,
    },

    name: {
        ...type.bodyStrong,
        fontSize: 16,
    },

    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },

    price: {
        ...type.money,
        fontSize: 14,
    },

    sep: {
        color: colors.inkFaint,
    },

    stock: {
        ...type.caption,
    },

    badge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: radius.full,
    },

    badgeLow: {
        backgroundColor: colors.warningSoft,
    },

    badgeOut: {
        backgroundColor: colors.dangerSoft,
    },

    badgeText: {
        fontSize: 12,
        fontWeight: '700',
    },

    badgeTextLow: {
        color: colors.warning,
    },

    badgeTextOut: {
        color: colors.danger,
    },

    iconBtn: {
        width: 36,
        height: 36,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        alignItems: 'center',
        justifyContent: 'center',
    },

    pressed: {
        backgroundColor: colors.sunken,
    },
});
