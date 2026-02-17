import React from "react";
import { View, Text, StyleSheet} from 'react-native';
import { TrendingUp } from 'lucide-react-native';

export const TotalSalesBanner = ({ total }: {total: number }) => (
    <View style={styles.banner}>
        <View style={styles.iconBox}>
            <TrendingUp size={24} color="#FFF" strokeWidth={2.5} />
        </View>

        <View style={styles.info}>
            <Text style={styles.label}>Total de vendas realizadas</Text>
            <Text style={styles.value}>{total}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#4963E4',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 22,
        borderRadius: 18,
        marginVertical: 15
    },

    iconBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        padding: 12,
        borderRadius: 14,
    }, 

    info: {
        marginLeft: 18
    }, 

    label: {
        color: '#E0E7FF', 
        fontSize: 13, 
        marginBottom: 2
    }, 

    value: {
        color: '#FFF', 
        fontSize: 32, 
        fontWeight: 'bold'
    }, 
})