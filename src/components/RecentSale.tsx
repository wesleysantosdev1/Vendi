import React from "react";
import {View, Text, StyleSheet } from 'react-native'; 
import { ShoppingBag } from 'lucide-react-native';

interface Props { 
    name: string; 
    time: string; 
    value: string;
}

export const RecentSale = ({ name, time, value }: Props) => (
    <View style={styles.item}>
        <View style={styles.left}>
            <View style={styles.iconCircle}>
                <ShoppingBag size={18} color="#4963E4" strokeWidth={2.5} />
            </View>

            <View style={styles.texts}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
        </View>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 16,
        marginBottom: 10,
    },

    left: {
        flexDirection: 'row', 
        alignItems: 'center'
    }, 

    iconCircle: {
        backgroundColor: '#F0F3FF', 
        padding: 10, 
        borderRadius: 12
    }, 

    texts: {
        marginLeft: 12
    }, 

    name: {
        fontSize: 15, 
        fontWeight: 'bold', 
        color: '#1A1A1A'
    }, 

    time: {
        fontSize: 12, 
        color: '#828489', 
        marginTop: 2
    }, 

    value: {
        fontSize: 15, 
        fontWeight: 'bold', 
        color: '#21C45D'
    },
});