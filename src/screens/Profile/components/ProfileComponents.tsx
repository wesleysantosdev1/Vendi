import React from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ChevronRight, LucideIcon } from 'lucide-react-native';
import { colors, spacing, radius, type } from '../../../theme';

export const StatCard = ({ label, value }: { label: string; value: string | number }) => (
    <View style={styles.statCard}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

interface MenuItemProps {
    Icon: LucideIcon;
    label: string;
    onPress: () => void;
    tone?: 'default' | 'danger';
    last?: boolean;
}

export const MenuItem = ({ Icon, label, onPress, tone = 'default', last }: MenuItemProps) => {
    const color = tone === 'danger' ? colors.danger : colors.ink;

    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            style={({ pressed }) => [styles.menuItem, !last && styles.menuItemBorder, pressed && styles.pressed]}
        >
            <View style={[styles.menuIcon, tone === 'danger' && styles.menuIconDanger]}>
                <Icon size={18} color={color} strokeWidth={2} />
            </View>
            <Text style={[styles.menuLabel, { color }]}>{label}</Text>
            {tone === 'default' && <ChevronRight size={18} color={colors.inkFaint} />}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    statCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },

    statValue: {
        ...type.money,
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.5,
    },

    statLabel: {
        ...type.eyebrow,
        fontSize: 10,
        marginTop: spacing.xs,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
    },

    menuItemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.line,
    },

    pressed: {
        backgroundColor: colors.sunken,
    },

    menuIcon: {
        width: 34,
        height: 34,
        borderRadius: radius.sm,
        borderCurve: 'continuous',
        backgroundColor: colors.sunken,
        alignItems: 'center',
        justifyContent: 'center',
    },

    menuIconDanger: {
        backgroundColor: colors.dangerSoft,
    },

    menuLabel: {
        ...type.bodyStrong,
        flex: 1,
    },
});
