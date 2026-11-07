import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors, spacing, radius, type } from '../theme';

interface Props {
    Icon: LucideIcon;
    title: string;
    hint?: string;
}

export const EmptyState = ({ Icon, title, hint }: Props) => (
    <View style={styles.container}>
        <View style={styles.iconBox}>
            <Icon size={22} color={colors.ink} strokeWidth={2} />
        </View>
        <Text style={styles.title}>{title}</Text>
        {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: spacing.xxxl,
        paddingHorizontal: spacing.xxl,
    },

    iconBox: {
        width: 52,
        height: 52,
        borderRadius: radius.lg,
        borderCurve: 'continuous',
        backgroundColor: colors.limeSoft,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },

    title: {
        ...type.subheading,
        textAlign: 'center',
    },

    hint: {
        ...type.caption,
        textAlign: 'center',
        marginTop: spacing.xs,
        lineHeight: 19,
    },
});
