import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';

//interface Props { label: string; stock: number, onPress: void; }

export const ProductChip = ({ label, stock, onPress }: any) => {
    const isOutOfStock = (stock ?? 0) <= 0;

    return (
        <TouchableOpacity 
            style={[styles.chip, isOutOfStock && { opacity: 0.5, backgroundColor: '#E0E0E0' }]} 
            onPress={isOutOfStock ? null : onPress} 
            activeOpacity={isOutOfStock ? 1 : 0.7}
        >
            <Plus size={16} color={isOutOfStock ? "#828489" : "#4963E4"} />
            <Text style={[styles.label, isOutOfStock && { color: '#828489' }]}>
                {label} {isOutOfStock ? '(Esgotado)' : `(${stock})`}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EBEFFF',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        marginRight: 8,
        marginBottom: 10,
    },
    
    label: { 
        marginLeft: 6, 
        fontSize: 14, 
        color: '#1A1A1A', 
        fontWeight: '500' 
    }
});