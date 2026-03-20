import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';

interface Props { 
    items: any[]; 
    onRemove: (id: string) => void; 
    total: number; 
}

export const OrderSummary = ({ items, onRemove, total }: Props) => (
    <View style={styles.container}>
        <Text style={styles.title}>Itens da venda</Text>
        <View style={styles.card}>
        {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
                <View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemSub}>{item.quantity}x R$ {item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => onRemove(item.id)}>
                        <Trash2 size={18} color="#EF4444" />
                    </TouchableOpacity>
                </View>
            </View>
        ))}

            <View style={styles.divider} />
            
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { 
        marginTop: 20 
    },

    title: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#1A1A1A', 
        marginBottom: 12 
    },

    card: { 
        backgroundColor: '#FFF', 
        borderRadius: 16, 
        padding: 16,
        elevation: 3, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05, 
        shadowRadius: 10 
    },

    itemRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 12 
    },

    itemName: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        color: '#1A1A1A' 
    },

    itemSub: { 
        fontSize: 12, 
        color: '#828489' 
    },

    right: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },

    itemPrice: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        marginRight: 12 
    },

    divider: { 
        height: 1, 
        backgroundColor: '#F0F2F5', 
        marginVertical: 10 
    },

    totalRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },

    totalLabel: { 
        fontSize: 16, 
        fontWeight: 'bold',
        color: '#1A1A1A'
    },

    totalValue: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#21C45D' 
    },
});