import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Modal, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Package, DollarSign, FileText, Calendar, Hash, Box } from 'lucide-react-native';
import { useProducts, Product } from '../../contexts/ProductContext';
import { api } from '../../services/api';

export default function AddExpense({ navigation }: any) {
    const { products } = useProducts();
    const [type, setType] = useState<'merchandise' | 'operational'>('merchandise');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isProductModalVisible, setIsProductModalVisible] = useState(false);

    
    const handleDateChange = (text: string) => {
        let cleaned = text.replace(/\D/g, '');
        let formatted = cleaned;
        if (cleaned.length > 2) {
            formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        }
        if (cleaned.length > 4) {
            formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
        }
        setDate(formatted);
    }


    const handleSave = async () => {
        if (!description || !value || !date) {
            Alert.alert("Erro", "Preencha os campos obrigatórios");
            return;
        }

        try {
            const payload = {
                title: description,
                amount: parseFloat(value.replace(',', '.')),
                type: type.toUpperCase(),
                date,
                quantity: quantity ? parseInt(quantity) : 0,
                productId: selectedProduct?.id
            };

            await api.post('/expenses', payload);
            
            Alert.alert("Sucesso", "Gasto registrado!");
            navigation.goBack();
        } catch (error) {
            console.log(error, "Erro aqui")
            Alert.alert("Erro", "Falha ao salvar no servidor.");
    }
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
                        onChangeText={handleDateChange}
                        keyboardType='numeric'
                        maxLength={10}
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
                <TouchableOpacity 
                    style={styles.selectProductBtn}
                    onPress={() => setIsProductModalVisible(true)}
                >
                    <Box size={20} color={selectedProduct ? "#4963E4" : "#828489"}/>
                    <Text style={[styles.selectProductText, !selectedProduct && { color: '#828489' }]}>
                        {selectedProduct ? selectedProduct.name : 'Selecionar produto'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveBtnText}>Salvar gasto</Text>
                </TouchableOpacity>

                {/* Modal para a selecao de produtos */}
                <Modal visible={isProductModalVisible} animationType="slide" transparent>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Escolha um produto</Text>
                            <FlatList 
                                data={products}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity 
                                        style={styles.productListItem}
                                        onPress={() => {
                                            setSelectedProduct(item);
                                            setIsProductModalVisible(false);
                                        }}
                                    >
                                        <Text style={styles.productListName}>{item.name}</Text>
                                        <Text style={styles.productListStock}>{item.stock} em estoque</Text>
                                    </TouchableOpacity>
                                )}
                                ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20}}>Nenhum produto cadastrado.</Text>}
                            />
                            <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsProductModalVisible(false)}>
                                <Text style={styles.cancelBtnText}>Cancelar</Text>
                            </TouchableOpacity>

                            {selectedProduct && (
                                <TouchableOpacity style={styles.clearBtn} onPress={() => { setSelectedProduct(null); setIsProductModalVisible(false); }}>
                                    <Text style={styles.clearBtnText}>Remover vínculo</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </Modal>
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
    }, 

    modalOverlay: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'flex-end' 
    },

    modalContent: { 
        backgroundColor: '#FFF', 
        padding: 20, 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, maxHeight: '80%' 
    },

    modalTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 15 
    
    },

    productListItem: { 
        paddingVertical: 15, 
        borderBottomWidth: 1, 
        borderBottomColor: '#F0F2F5' 
    },

    productListName: { 
        fontSize: 16, 
        color: '#1A1A1A' 
    },
    productListStock: { 
        fontSize: 13, 
        color: '#828489', 
        marginTop: 4 
    },

    cancelBtn: { 
        marginTop: 20, 
        padding: 15, 
        alignItems: 'center', 
        backgroundColor: '#F0F2F5', 
        borderRadius: 10 
    },

    cancelBtnText: { 
        fontWeight: 'bold', 
        color: '#1A1A1A' 
    },

    clearBtn: { 
        marginTop: 10, 
        padding: 15, 
        alignItems: 'center' 
    },

    clearBtnText: { 
        color: '#EF4444', 
        fontWeight: 'bold' 
    }
});