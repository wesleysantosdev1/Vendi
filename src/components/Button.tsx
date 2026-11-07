import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors, radius, spacing } from '../theme';

const variants = {
    primary: { bg: colors.lime, fg: colors.onLime },
    dark: { bg: colors.ink, fg: colors.onInk },
    secondary: { bg: colors.sunken, fg: colors.ink },
    danger: { bg: colors.danger, fg: colors.onDanger },
    ghost: { bg: 'transparent', fg: colors.ink },
} as const;

const sizes = {
    sm: { height: 40, paddingHorizontal: spacing.md, fontSize: 14, icon: 16 },
    md: { height: 54, paddingHorizontal: spacing.xl, fontSize: 16, icon: 20 },
} as const;

interface Props {
    title: string;
    onPress?: () => void;
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    Icon?: LucideIcon;
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const Button = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    Icon,
    loading,
    disabled,
    style,
}: Props) => {
    const v = variants[variant];
    const s = sizes[size];
    const inactive = disabled || loading;

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={title}
            accessibilityState={{ disabled: !!inactive, busy: !!loading }}
            disabled={inactive}
            onPress={onPress}
            style={({ pressed }) => [
                styles.base,
                { backgroundColor: v.bg, height: s.height, paddingHorizontal: s.paddingHorizontal },
                pressed && styles.pressed,
                disabled && styles.disabled,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={v.fg} />
            ) : (
                <View style={styles.content}>
                    {Icon && <Icon size={s.icon} color={v.fg} strokeWidth={2.5} />}
                    <Text style={[styles.label, { color: v.fg, fontSize: s.fontSize }]}>{title}</Text>
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: radius.lg,
        borderCurve: 'continuous',
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },

    label: {
        fontWeight: '700',
        letterSpacing: -0.1,
    },

    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },

    disabled: {
        opacity: 0.4,
    },
});
