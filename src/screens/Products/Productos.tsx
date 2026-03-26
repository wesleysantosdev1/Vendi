import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from "react-native"; 
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Plus } from 'lucide-react-native';
import { useProductManager, Product } from "./hooks/useProductManager";
import { ProductItem } from "./components/ProductItem";
import { ProductModal } from "./components/ProductModal";
import { deleteProductRequest } from "../../services/productService";

export default function Productos(){
    const { products, addProduct, updateProduct, loading, loadProducts } = useProductManager();
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    useFocusEffect(
        useCallback(() => {
            loadProducts();
        }, [loadProducts])
    );

    const handleOpenEdit = (product: Product) => {
        setEditingProduct(product);
        setModalVisible(true);
    };

    const handleOpenDelete = (product: Product) => {
        setProductToDelete(product);
        setDeleteModalVisible(true);
    };

    const handleSave = (data: any) => {
        if (editingProduct) updateProduct(data);
        else addProduct(data);
    };
    
    const confirmDelete = async () => {
        if (!productToDelete) return;

        try {
            await deleteProductRequest(productToDelete.id);
            Alert.alert("Sucesso", "Produto removido com sucesso!");
            setDeleteModalVisible(false);
            loadProducts(); 
        } catch (error) {
            console.log(error, "Erro aqui")
            Alert.alert("Erro", "Não foi possível excluir o produto.");
        }
    };

    if (loading) {
        return (
            <SafeAreaProvider style={styles.safe}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>Carregando produtos...</Text>
                </View>
            </SafeAreaProvider>
        );
    }

    return(
        <SafeAreaProvider style={styles.safe}> 
            <View style={styles.header}>
                <Text style={styles.title}>Produtos</Text>
                <Text style={styles.count}>{products.length} itens</Text>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductItem item={item} onEdit={handleOpenEdit} onDelete={handleOpenDelete} />
                )}
                contentContainerStyle={[
                    styles.list,
                    products.length === 0 && { flex: 1, justifyContent: 'center', alignItems: 'center' }
                ]}
                ListEmptyComponent={() => (
                    <Text style={{ color: '#828489' }}>
                        Nenhum produto cadastrado
                    </Text>
                )}
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

            <Modal
                visible={deleteModalVisible}
                transparent
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.confirmCard}>
                        <View style={styles.warningIcon}>
                            <Text style={{fontSize: 24}}>⚠️</Text>
                        </View>
                        <Text style={styles.confirmTitle}>Excluir Produto?</Text>
                        <Text style={styles.confirmSub}>
                            Tem certeza que deseja excluir o produto "{productToDelete?.name}"? 
                            Ele não aparecerá mais para vendas, mas o histórico antigo será mantido.
                        </Text>

                        <View style={styles.confirmButtons}>
                            <TouchableOpacity 
                                style={styles.btnCancel} 
                                onPress={() => setDeleteModalVisible(false)}
                            >
                                <Text style={styles.btnCancelText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.btnConfirm} 
                                onPress={confirmDelete}
                            >
                                <Text style={styles.btnConfirmText}>Sim, excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    safe: { 
        flex: 1, 
        backgroundColor: '#F8F9FA', 
        paddingTop: 10,
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
    }, 

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    confirmCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 25,
        width: '100%',
        alignItems: 'center',
        elevation: 10
    },
    warningIcon: {
        backgroundColor: '#FEF3C7',
        padding: 15,
        borderRadius: 50,
        marginBottom: 15
    },
    confirmTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#051D3B',
        marginBottom: 10
    },
    confirmSub: {
        fontSize: 14,
        color: '#828489',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 25
    },
    confirmButtons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    btnCancel: {
        flex: 1,
        paddingVertical: 15,
        marginRight: 10,
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#F0F2F5'
    },
    btnConfirm: {
        flex: 1,
        paddingVertical: 15,
        marginLeft: 10,
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#EF4444'
    },
    btnCancelText: { color: '#828489', fontWeight: 'bold' },
    btnConfirmText: { color: '#FFF', fontWeight: 'bold' }
})