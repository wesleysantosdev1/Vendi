import React, {useState, useEffect} from "react";
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { X } from 'lucide-react-native';
import { Product } from "../hooks/useProductManager";

interface Props {
    visible: boolean;
    onClose: () => void;
    onSave: (p: any) => void;
    productToEdit?: Product | null;
}

export const ProductModal = ({ visible, onClose, onSave, productToEdit }: Props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setPrice(productToEdit.price.toString());
            setStock(productToEdit.stock.toString());
        } else {
            setName('');
            setPrice('');
            setStock('');
        }
    }, [productToEdit, visible]);

    const handleSave = () => {
        onSave({
            id: productToEdit?.id,
            name,
            price: parseFloat(price.replace(',', '.')),
            stock: parseInt(stock)
        });
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{productToEdit ? 'Editar Produto' : 'Novo Produto'}</Text>
                        <TouchableOpacity onPress={onClose}><X size={24} color="#828489" /></TouchableOpacity>
                    </View>

                    <TextInput 
                    placeholder="Nome do produto" 
                    style={styles.input} value={name} 
                    onChangeText={setName} 
                    />
                    
                    <TextInput 
                    placeholder="Valor (R$)" 
                    style={styles.input} 
                    keyboardType="numeric" 
                    value={price} 
                    onChangeText={setPrice} 
                    />

                    <TextInput 
                    placeholder="Quantidade em estoque" 
                    style={styles.input} 
                    keyboardType="numeric" 
                    value={stock} 
                    onChangeText={setStock} 
                    />

                    <TouchableOpacity style={styles.btn} onPress={handleSave}>
                        <Text style={styles.btnText}>{productToEdit ? 'Salvar alterações' : 'Adicionar produto'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'flex-end' 
    },

    content: {
        backgroundColor: '#FFF', 
        borderTopLeftRadius: 24, 
        borderTopRightRadius: 24, 
        padding: 24, 
        paddingBottom: 40 
    },

    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 20 
    },

    title: { 
        fontSize: 20, 
        fontWeight: 'bold' 
    },

    input: { 
        backgroundColor: '#F0F2F5', 
        height: 55, 
        borderRadius: 12, 
        paddingHorizontal: 15, 
        marginBottom: 15, 
        fontSize: 15 
    },

    btn: { 
        backgroundColor: '#4963E4', 
        height: 55, 
        borderRadius: 14, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 10 
    },

    btnText: { 
        color: '#FFF', 
        fontSize: 16, 
        fontWeight: 'bold' 
    }
})