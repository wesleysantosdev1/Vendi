import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TrendingDown, ChevronRight } from 'lucide-react-native';
import { Expense } from '../hooks/useExpenseManager';

interface Props {
    item: Expense;
    onPress: () => void;
}

export const ExpenseItem = ({ item, onPress }: Props) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.left}>
            <View style={styles.iconCircle}>
                <TrendingDown size={20} color="#EF4444" />
            </View>

            <View style={styles.info}>
                <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
                <Text style={styles.subDetails}>{item.date} • {item.quantity} un.</Text>
            </View>
        </View>
        
        <View style={styles.right}>
            <Text style={styles.value}>- R$ {(item.value ?? 0).toFixed(2)}</Text>
            <ChevronRight size={18} color="#828489" />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    left: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        flex: 1 
    },

    iconCircle: { 
        backgroundColor: '#FEE2E2', 
        padding: 10, 
        borderRadius: 12 
    },

    info: { 
        marginLeft: 12, 
        flex: 1 
    },

    description: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        color: '#1A1A1A' 
    },

    subDetails: { 
        fontSize: 12, 
        color: '#828489', 
        marginTop: 2 
    },

    right: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },

    value: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        color: '#EF4444', 
        marginRight: 8 
    }
});