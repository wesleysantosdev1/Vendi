import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Box, Pencil } from "lucide-react-native";
import { Product } from "../hooks/useProductManager"; 

interface Props {
    item: Product;
    onEdit: (product: Product) => void; 
}

export const ProductItem = ({ item, onEdit }: Props) => (
    <View style={styles.card}>
        <View style={styles.left}>
            <View style={styles.iconBox}><Box size={20} color="#4963E4" /></View>
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.stock}>Estoque: {item.stock} un.</Text>
            </View>
        </View>

        <View style={styles.right}>
            <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => onEdit(item)}>
                <Pencil size={20} color="#828489" strokeWidth={1.5} />
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    card: { flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#FFF', 
        padding: 16, 
        borderRadius: 16, 
        marginBottom: 12, 
        elevation: 2, 
        shadowColor: '#000', 
        shadowOpacity: 0.05 
    },

    left: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },

    iconBox: { 
        backgroundColor: '#F0F3FF', 
        padding: 10, 
        borderRadius: 12 
    },

    info: { 
        marginLeft: 12 
    },

    name: { 
        fontSize: 15, 
        fontWeight: 'bold' 
    },

    stock: { 
        fontSize: 12, 
        color: '#828489', 
        marginTop: 2 
    },

    right: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },

    price: { 
        fontSize: 15, 
        fontWeight: 'bold', 
        marginRight: 15 
    }
})