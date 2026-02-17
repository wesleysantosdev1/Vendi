import React, { memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ShoppingBag, ChevronRight } from "lucide-react-native";

interface SaleItemProps {
    data: {
        id: string;
        name: string;
        date: string;
        items: number;
        value: string;
    };
    onPress: () => void;
}


const SaleItemComponent = ({ data, onPress }: SaleItemProps) => {


    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.leftContent}>
                <View style={styles.iconCircle}>
                    <ShoppingBag size={20} color="#4963E4" strokeWidth={2.5} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.details}>{data.date} • {data.items} itens</Text>
                </View>
            </View>

            <View style={styles.rightContent}>
                <Text style={styles.value}>R$ {data.value}</Text>
                <ChevronRight size={18} color="#828489" strokeWidth={2} />
            </View>
        </TouchableOpacity>
    );
};

export const SaleItem = memo(SaleItemComponent);

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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },

    leftContent: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },

    iconCircle: { 
        backgroundColor: '#F0F3FF', 
        padding: 10, 
        borderRadius: 12 
    },

    info: { 
        marginLeft: 12 
    },

    name: { 
        fontSize: 15, 
        fontWeight: 'bold', 
        color: '#1A1A1A' 
    },

    details: { 
        fontSize: 12, 
        color: '#828489', 
        marginTop: 2 
    },

    value: { 
        fontSize: 15, 
        fontWeight: 'bold', 
        color: '#21C45D' 
    }, 

    rightContent: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
});