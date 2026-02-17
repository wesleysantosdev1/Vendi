import React from "react";
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    label: string;
    value: string;
    color: string;
}

export const SummaryCard = ({ label, value, color}: Props) => (
    <View style={styles.card}>
        <Text style={styles.label}> {label} </Text>
        <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        width: '31%',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    }, 

    label: {
        fontSize: 10, 
        color: '#828489', 
        fontWeight: 'bold', 
        marginBottom: 6
    }, 

    value: {
        fontSize: 15, 
        fontWeight: 'bold', 
    }
})