import React, {useState} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"; 
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Plus } from 'lucide-react-native';
import { useProductManager, Product } from "./hooks/useProductManager";
import { ProductItem } from "./components/ProductItem";
import { ProductModal } from "./components/ProductModal";

export default function Productos(){
    const { products, addProduct, updateProduct } = useProductManager();
    const [modalVisible, setModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleOpenEdit = (product: Product) => {
        setEditingProduct(product);
        setModalVisible(true);
    };

    const handleSave = (data: any) => {
        if (editingProduct) updateProduct(data);
        else addProduct(data);
    }; 

    return(
        <SafeAreaProvider style={styles.safe}> 
            <View style={styles.header}>
                <Text style={styles.title}>Produtos</Text>
                <Text style={styles.count}>{products.length} itens</Text>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ProductItem item={item} onEdit={handleOpenEdit} />}
                contentContainerStyle={styles.list}
            />

            <TouchableOpacity 
                style={styles.fab} 
                onPress={() => { setEditingProduct(null); setModalVisible(true); }}
            >
                <Plus size={30} color="#FFF" />
            </TouchableOpacity>

            <ProductModal 
                visible={modalVisible} 
                onClose={() => setModalVisible(false)} 
                onSave={handleSave}
                productToEdit={editingProduct}
            />
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    safe: { 
        flex: 1, 
        backgroundColor: '#F8F9FA' 
    },

    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'baseline', 
        padding: 20 
    },

    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#051D3B' 
    },

    count: { 
        fontSize: 12, 
        color: '#828489' 
    },

    list: { 
        paddingHorizontal: 20, 
        paddingBottom: 100 
    },

    fab: { 
        position: 'absolute', 
        bottom: 30, 
        right: 20, 
        backgroundColor: '#4963E4', 
        width: 50, 
        height: 50, 
        borderRadius: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        elevation: 10, 
        shadowColor: '#4963E4', 
        shadowOpacity: 0.3, 
        marginBottom: 60
    }
})