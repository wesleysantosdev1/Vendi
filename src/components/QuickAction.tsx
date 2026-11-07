import React from "react";
import { Text, StyleSheet, Pressable, View } from 'react-native';
import { LucideIcon, ArrowUpRight } from 'lucide-react-native';
import { colors, spacing, radius } from '../theme';

interface Props {
    label: string;
    Icon: LucideIcon;
    onPress?: () => void;
}

// Atalho da Home: bloco branco com ícone em cima e rótulo embaixo.
export const QuickAction = ({ label, Icon, onPress }: Props) => (
    <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
        <View style={styles.top}>
            <Icon size={20} color={colors.ink} strokeWidth={2.25} />
            <ArrowUpRight size={14} color={colors.inkFaint} strokeWidth={2.25} />
        </View>
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
    </Pressable>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: colors.line,
        padding: spacing.md,
        minHeight: 88,
        justifyContent: 'space-between',
    },

    pressed: {
        backgroundColor: colors.sunken,
    },

    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    label: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.ink,
    },
});
