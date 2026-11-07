import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Tag, DollarSign, Hash } from 'lucide-react-native';
import { Product } from "../hooks/useProductManager";
import { BottomSheet } from "../../../components/BottomSheet";
import { TextField } from "../../../components/TextField";
import { Button } from "../../../components/Button";
import { spacing } from "../../../theme";

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
        const parsedPrice = parseFloat(price.replace(',', '.'));
        const parsedStock = parseInt(stock, 10);

        if (!name.trim() || Number.isNaN(parsedPrice) || Number.isNaN(parsedStock)) {
            Alert.alert("Erro", "Preencha nome, valor e estoque.");
            return;
        }

        onSave({
            id: productToEdit?.id,
            name: name.trim(),
            price: parsedPrice,
            stock: parsedStock
        });
        onClose();
    };

    return (
        <BottomSheet
            visible={visible}
            onClose={onClose}
            title={productToEdit ? 'Editar produto' : 'Novo produto'}
        >
            <TextField
                label="Nome"
                Icon={Tag}
                placeholder="Ex: Batom matte"
                value={name}
                onChangeText={setName}
            />

            <View style={styles.row}>
                <TextField
                    label="Valor"
                    Icon={DollarSign}
                    placeholder="0,00"
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                    containerStyle={styles.rowItem}
                />
                <TextField
                    label="Estoque"
                    Icon={Hash}
                    placeholder="0"
                    keyboardType="numeric"
                    value={stock}
                    onChangeText={setStock}
                    containerStyle={styles.rowItem}
                />
            </View>

            <Button
                title={productToEdit ? 'Salvar alterações' : 'Adicionar produto'}
                onPress={handleSave}
                style={styles.button}
            />
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: spacing.sm,
    },

    rowItem: {
        flex: 1,
    },

    button: {
        marginTop: spacing.sm,
    },
});
