import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Package, DollarSign, Calendar, Hash, FileText } from 'lucide-react-native';
import { InputVenda } from './components/InputVenda';
import { useExpenseManager } from './hooks/useExpenseManager.ts'
import { useNavigation } from '@react-navigation/native';

export default function AddExpense() {
    const navigation = useNavigation();
    const { addExpense } = useExpenseManager();
    const [type, setType] = useState<'merchandise' | 'operational'>('merchandise');

    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSave = () => {
        if (!description || !value) {
            Alert.alert("Atenção", "Preencha os campos obrigatórios.");
            return;
        }

        addExpense({
            type,
            description,
            value: parseFloat(value.replace(',', '.')),
            date: "25/02/2026",
            quantity: type === 'merchandise' ? parseInt(quantity) : 0,
            category: type === 'merchandise' ? 'Mercadoria / Estoque' : 'Gasto operacional'
        });

        navigation.goBack();
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Novo Gasto / Compra</Text>
            
            <Text style={styles.sectionTitle}>Tipo do gasto</Text>
            <View style={styles.typeRow}>
                <TouchableOpacity 
                style={[styles.typeBtn, type === 'merchandise' && styles.typeBtnActive]} 
                onPress={() => setType('merchandise')}
                >
                    <Package size={24} color={type === 'merchandise' ? '#EF4444' : '#828489'} />
                    <Text style={[styles.typeText, type === 'merchandise' && styles.typeTextActive]}>Compra de mercadoria</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={[styles.typeBtn, type === 'operational' && styles.typeBtnActive]} 
                onPress={() => setType('operational')}
                >
                    <DollarSign size={24} color={type === 'operational' ? '#EF4444' : '#828489'} />
                    <Text style={[styles.typeText, type === 'operational' && styles.typeTextActive]}>Gasto operacional</Text>
                </TouchableOpacity>
            </View>

            <InputVenda 
                placeholder="Descrição do gasto" 
                Icon={FileText} 
                value={description} 
                onChangeText={setDescription}
            />

            <InputVenda 
                placeholder="Valor total (R$)" 
                Icon={DollarSign} 
                keyboardType="numeric" 
                value={value}
                onChangeText={setValue}
            />

            <InputVenda 
                placeholder="dd/mm/aaaa" 
                Icon={Calendar} 
            />

            {type === 'merchandise' && (
                <>
                <InputVenda 
                    placeholder="Quantidade comprada" 
                    Icon={Hash} 
                    keyboardType="numeric" 
                    value={quantity} 
                    onChangeText={setQuantity} 
                />
                <Text style={styles.sectionTitle}>Vincular a produto (opcional)</Text>
                <TouchableOpacity style={styles.linkProductBtn}>
                    <Package size={20} color="#4963E4" />
                    <Text style={styles.linkProductText}>Selecionar produto</Text>
                </TouchableOpacity>
                </>
            )}

            <TouchableOpacity 
                style={styles.btnSave}
                onPress={handleSave}
            >
                <Text style={styles.btnSaveText}>Salvar gasto</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFF', 
        padding: 20 
    },

    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 20 
    },

    sectionTitle: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        marginVertical: 15 
    },

    typeRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 20 
    },

    typeBtn: { 
        width: '48%', 
        padding: 20, 
        borderRadius: 16, 
        backgroundColor: '#F0F2F5', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: 'transparent' 
    },

    typeBtnActive: { 
        backgroundColor: '#FEE2E2', 
        borderColor: '#EF4444' 
    },

    typeText: { 
        fontSize: 13, 
        textAlign: 'center',
        marginTop: 10, 
        color: '#828489' 
    },

    typeTextActive: { 
        color: '#EF4444', 
        fontWeight: 'bold' 
    },

    linkProductBtn: { 
        flexDirection: 'row', 
        backgroundColor: '#F0F2F5', 
        padding: 15, 
        borderRadius: 12, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    linkProductText: { 
        marginLeft: 10, 
        color: '#4963E4', 
        fontWeight: 'bold' 
    },

    btnSave: { 
        backgroundColor: '#EF4444', 
        height: 55, 
        borderRadius: 14, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 30 
    },

    btnSaveText: { 
        color: '#FFF', 
        fontWeight: 'bold', 
        fontSize: 16 
    }
});