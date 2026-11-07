import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme';

// Marca do app: selo escuro com o "V" em lima + nome ao lado.
export const BrandMark = () => (
    <View style={styles.row} accessibilityRole="image" accessibilityLabel="VendaFácil">
        <View style={styles.seal}>
            <Text style={styles.letter}>V</Text>
        </View>
        <Text style={styles.name}>
            VendaFácil<Text style={styles.dot}>.</Text>
        </Text>
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },

    seal: {
        width: 44,
        height: 44,
        borderRadius: radius.md,
        borderCurve: 'continuous',
        backgroundColor: colors.ink,
        alignItems: 'center',
        justifyContent: 'center',
    },

    letter: {
        color: colors.lime,
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: -1,
    },

    name: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.6,
        color: colors.ink,
    },

    dot: {
        color: colors.inkFaint,
    },
});
