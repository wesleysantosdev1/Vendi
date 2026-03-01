import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Package, DollarSign, FileText, Calendar, Hash, Box } from 'lucide-react-native';
import { useExpense } from '../../contexts/ExpenseContext';

export default function AddExpense({ navigation }: any) {
    const { addExpense } = useExpense();
    const [type, setType] = useState<'merchandise' | 'operational'>('merchandise');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSave = () => {
        if (!description || !value || !date) {
            Alert.alert("Erro", "Preencha os campos obrigatórios");
            return;
        }

        addExpense({
            type,
            description,
            value: parseFloat(value.replace(',', '.')),
            date,
            quantity: quantity ? parseInt(quantity) : 0,
            category: type === 'merchandise' ? 'Mercadoria' : 'Operacional'
        });

        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Novo Gasto / Compra</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.label}>Tipo do gasto</Text>
                
                <View style={styles.typeContainer}>
                    <TouchableOpacity 
                        style={[styles.typeCard, type === 'merchandise' && styles.selectedType]} 
                        onPress={() => setType('merchandise')}
                    >
                        <Package size={24} color={type === 'merchandise' ? '#EF4444' : '#828489'} />
                        <Text style={[styles.typeText, type === 'merchandise' && styles.selectedText]}>Compra de{'\n'}mercadoria</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.typeCard, type === 'operational' && styles.selectedType]}
                        onPress={() => setType('operational')}
                    >
                        <DollarSign size={24} color={type === 'operational' ? '#EF4444' : '#828489'} />
                        <Text style={[styles.typeText, type === 'operational' && styles.selectedText]}>Gasto{'\n'}operacional</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <FileText size={20} color="#828489" />
                    <TextInput 
                        style={styles.input} 
                        placeholder={type === 'merchandise' ? "Ex: 1 caixa de batom" : "Descrição do gasto"}
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <DollarSign size={20} color="#828489" />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Valor total (R$)" 
                        keyboardType="numeric"
                        value={value}
                        onChangeText={setValue}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Calendar size={20} color="#828489" />
                    <TextInput 
                        style={styles.input} 
                        placeholder="dd/mm/aaaa"
                        value={date}
                        onChangeText={setDate}
                    />
                </View>

                {type === 'merchandise' && (
                    <View style={styles.inputContainer}>
                        <Hash size={20} color="#828489" />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Quantidade comprada" 
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={setQuantity}
                        />
                    </View>
                )}

                <Text style={styles.sectionTitle}>Vincular a produto (opcional)</Text>
                <TouchableOpacity style={styles.selectProductBtn}>
                    <Box size={20} color="#4963E4" />
                    <Text style={styles.selectProductText}>Selecionar produto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveBtnText}>Salvar gasto</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFF' 
    },

    header: { 
        paddingTop: 40, 
        marginLeft: 20
    },

    title: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#000' 
    },

    content: { 
        padding: 20 
    },

    label: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        marginBottom: 15, 
        color: '#000' 
    },

    typeContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 25 
    },

    typeCard: { 
        width: '48%', 
        backgroundColor: '#F0F2F5', 
        padding: 20, borderRadius: 12,
        alignItems: 'center', 
        justifyContent: 'center', 
        borderWidth: 1, 
        borderColor: 'transparent' 
    },

    selectedType: { 
        backgroundColor: '#FEE2E2', 
        borderColor: '#EF4444' 
    },

    typeText: { 
        marginTop: 10, 
        textAlign: 'center', 
        color: '#828489', 
        fontWeight: '500' 
    },

    selectedText: { 
        color: '#EF4444', 
        fontWeight: 'bold' 
    },
    
    inputContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#F0F2F5', 
        paddingHorizontal: 15, 
        height: 55, 
        borderRadius: 12, 
        marginBottom: 15 
    },

    input: { 
        flex: 1, 
        marginLeft: 10, 
        fontSize: 15, 
        color: '#1A1A1A' 
    },
    
    sectionTitle: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        marginTop: 10, 
        marginBottom: 10, 
        color: '#000' 
    },

    selectProductBtn: { 
        flexDirection: 'row', 
        backgroundColor: '#F0F2F5', 
        height: 55, 
        borderRadius: 12, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 30 
    },

    selectProductText: { 
        color: '#4963E4', 
        fontWeight: 'bold', 
        marginLeft: 10 
    },
    
    saveBtn: { 
        backgroundColor: '#EF4444', 
        height: 55, 
        borderRadius: 12, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    saveBtnText: { 
        color: '#FFF', 
        fontSize: 16, 
        fontWeight: 'bold' 
    }
});