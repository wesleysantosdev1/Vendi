import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';

interface Props { label: string; onPress: () => void; }

export const ProductChip = ({ label, onPress }: Props) => (
    <TouchableOpacity style={styles.chip} onPress={onPress} activeOpacity={0.7}>
        <Plus size={16} color="#4963E4" strokeWidth={2.5} />
        <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
);

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