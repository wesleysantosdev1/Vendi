import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSaleManager } from "./hooks/useSaleManager";
import { User, Phone } from "lucide-react-native";

import { ProductChip } from "./components/ProductChip";
import { OrderSummary } from "./components/OrderSummary";
import { InputVenda } from "./components/InputVenda";

import { getProductsRequest } from "../../services/productService";
import { createSale } from "../../services/saleService";
import { Product } from "../../types/product"

export default function AddSale(){
    const { 
        selectedItems, 
        addItem, 
        removeItem, 
        totalValue
    } = useSaleManager();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function loadProducts() {
            const data = await getProductsRequest();
            setProducts(data);
        }

        loadProducts();
    },[])

    const handleSave = async () => {
        if (!name || selectedItems.length === 0) return;

        const items = selectedItems.map(item => ({
            products: item.id,
            quantity: 1
        }));

        await createSale({
            customer: {
                name,
                phone
            },
            items
        }); 

        alert("Venda Salva!")
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
                    onChangeText={setPhone}
                />
                

                <Text style={styles.subtitle}>Adicionar produtos</Text>
                <View style={styles.productGrid}>
                    {products.map(p => (
                        <ProductChip 
                        key={p.id} 
                        label={p.name} 
                        onPress={() => addItem(p)} 
                        />
                    ))}
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
        backgroundColor: '#F8F9FA' 
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
        marginTop: 30
    },

    btnText: { 
        color: '#FFF', 
        fontSize: 16, 
        fontWeight: 'bold' 
    }
})