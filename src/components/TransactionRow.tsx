import React, { ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors, spacing, radius, type } from '../theme';

interface Props {
    title: string;
    subtitle?: string;
    amount: string;
    // 'negative' pinta o valor de vermelho (gastos).
    tone?: 'default' | 'negative';
    // Elemento à esquerda (avatar, ícone). Se omitido, usa a inicial do título.
    leading?: ReactNode;
    onPress?: () => void;
}

// Linha de extrato: usada em vendas recentes, lista de vendas e lista de gastos.
// Fica direto sobre o fundo, separada por uma linha fina, como num livro-caixa.
export const TransactionRow = ({ title, subtitle, amount, tone = 'default', leading, onPress }: Props) => {
    const initial = title?.trim()?.charAt(0)?.toUpperCase() || '?';

    const content = (
        <>
            {leading ?? (
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{initial}</Text>
                </View>
            )}

            <View style={styles.texts}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                {subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text> : null}
            </View>

            <Text style={[styles.amount, tone === 'negative' && styles.amountNegative]}>{amount}</Text>
            {onPress && <ChevronRight size={16} color={colors.inkFaint} />}
        </>
    );

    if (!onPress) {
        return <View style={styles.row}>{content}</View>;
    }

    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`${title}, ${amount}`}
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}
        >
            {content}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.md + 2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.line,
    },

    pressed: {
        opacity: 0.55,
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        borderCurve: 'continuous',
        backgroundColor: colors.sunken,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.ink,
    },

    texts: {
        flex: 1,
    },

    title: {
        ...type.bodyStrong,
    },

    subtitle: {
        ...type.caption,
        marginTop: 2,
    },

    amount: {
        ...type.money,
    },

    amountNegative: {
        color: colors.danger,
    },
});
