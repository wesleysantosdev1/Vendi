import React, { ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { colors, spacing, radius, type, hitSlop } from '../theme';

interface Props {
    title: string;
    eyebrow?: string;
    onBack?: () => void;
    // Ação à direita do título (ex: botão "Adicionar").
    right?: ReactNode;
}

export const ScreenHeader = ({ title, eyebrow, onBack, right }: Props) => (
    <View style={styles.container}>
        {onBack && (
            <Pressable
                onPress={onBack}
                hitSlop={hitSlop}
                accessibilityRole="button"
                accessibilityLabel="Voltar"
                style={({ pressed }) => [styles.back, pressed && styles.pressed]}
            >
                <ArrowLeft size={20} color={colors.ink} strokeWidth={2.25} />
            </Pressable>
        )}

        <View style={styles.row}>
            <View style={styles.texts}>
                {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
                <Text style={styles.title} accessibilityRole="header">{title}</Text>
            </View>
            {right}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.lg,
        paddingBottom: spacing.lg,
    },

    back: {
        width: 40,
        height: 40,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
    },

    pressed: {
        opacity: 0.6,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: spacing.md,
    },

    texts: {
        flex: 1,
    },

    eyebrow: {
        ...type.eyebrow,
        marginBottom: spacing.xs,
    },

    title: {
        ...type.title,
    },
});
