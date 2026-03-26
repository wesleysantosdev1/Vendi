import React, {useState, useEffect, useCallback} from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSaleManager } from "./hooks/useSaleManager";
import { User, Phone } from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";

import { ProductChip } from "./components/ProductChip";
import { OrderSummary } from "./components/OrderSummary";
import { InputVenda } from "./components/InputVenda";

import { getProductsRequest } from "../../services/productService";
import { createSale } from "../../services/saleService";


type Product = {
    id: string;
    name: string;
    price: number;
    stock: number;
};


export default function AddSale(){
    const { 
        selectedItems, 
        addItem, 
        removeItem, 
        totalValue,
        clearSale
    } = useSaleManager();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [products, setProducts] = useState<Product[]>([]);

    const maskPhone = (value: string) => {
        return value 
            .replace(/\D/g, "")
            .replace(/^(\d{2})(\d)/g, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .substring(0, 15);
    };

    useFocusEffect(
        useCallback(() => {
            async function load() {
                const data = await getProductsRequest();
                setProducts(data);
            }
            load();
        }, [])
    );

    useEffect(() => {
        async function loadProducts() {
            const data = await getProductsRequest();
            setProducts(data);
        }

        loadProducts();
    },[])

    const handleSave = async () => {
        if (!name || selectedItems.length === 0) {
            Alert.alert("Erro", "Preencha o nome e adicione itens.");
            return;
        }

        const items = selectedItems.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));

        try {
            await createSale({
                customer: { name, phone },
                items
            });

            const updatedProducts = await getProductsRequest();
            setProducts(updatedProducts);

            Alert.alert("Sucesso", "Venda Salva!");

            setName("");
            setPhone("");
            clearSale();
        } catch (error) {
            console.log("Erro ao salvar venda:", error);
            Alert.alert("Erro", "Falha ao salvar venda.");
        }
    };

    const getAvailableStock = (productId: string, originalStock: number) => {
        const selected = selectedItems.find(item => item.id === productId);
        const quantityInCart = selected ? selected.quantity : 0;

        return originalStock - quantityInCart;
    }

    return(
        <SafeAreaProvider style={styles.safe}> 
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Nova Venda</Text>

                <InputVenda 
                    placeholder="Nome do cliente" 
                    Icon={User} 
                    value={name}
                    onChangeText={setName}
                />
                <InputVenda 
                    placeholder="Telefone (opcional)" 
                    Icon={Phone} 
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={(t) => setPhone(maskPhone(t))}
                />
                

                <Text style={styles.subtitle}>Adicionar produtos</Text>
                <View style={styles.productGrid}>
                    {products.map(p => {
                        const availableStock = getAvailableStock(p.id, p.stock);

                        return (
                            <ProductChip
                                key={p.id}
                                label={p.name}
                                stock={availableStock}
                                onPress={() => {
                                    if (availableStock > 0) {
                                        addItem(p);
                                    }
                                }}
                            />
                        );
                    })}
                </View>

                {selectedItems.length > 0 && (  
                <OrderSummary 
                    items={selectedItems} 
                    onRemove={removeItem} 
                    total={totalValue} 
                />
                )}

                <TouchableOpacity 
                style={styles.btnSave} 
                onPress={handleSave}
                >
                    <Text style={styles.btnText}>Salvar Venda</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    safe: { 
        flex: 1, 
        backgroundColor: '#F8F9FA', 
        paddingTop: 10
    },
    
    container: { 
        padding: 20, 
        paddingBottom: 40 
    },

    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#051D3B', 
        marginBottom: 20 
    },

    subtitle: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#1A1A1A', 
        marginBottom: 15 
    },

    productGrid: { 
        flexDirection: 'row', 
        flexWrap: 'wrap' 
    },

    btnSave: {
        backgroundColor: '#4963E4',
        height: 55,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30, 
        marginBottom: 60
    },

    btnText: { 
        color: '#FFF', 
        fontSize: 16, 
        fontWeight: 'bold' 
    }
})