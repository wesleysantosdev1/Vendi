import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { spacing, type } from '../theme';

interface Props {
    label: string;
    value: string;
}

// Métrica simples: rótulo em caixa alta + valor. Pensada para ficar lado a lado
// dentro de um grupo, separadas por linha vertical.
export const SummaryCard = ({ label, value }: Props) => (
    <View style={styles.card}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    card: {
        flex: 1,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
    },

    label: {
        ...type.eyebrow,
        marginBottom: spacing.xs,
    },

    value: {
        ...type.money,
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
});
