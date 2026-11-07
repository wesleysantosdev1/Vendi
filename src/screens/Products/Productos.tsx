import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, Package, AlertTriangle } from 'lucide-react-native';
import { useProductManager, Product } from "./hooks/useProductManager";
import { ProductItem } from "./components/ProductItem";
import { ProductModal } from "./components/ProductModal";
import { deleteProductRequest } from "../../services/productService";
import { ScreenHeader } from "../../components/ScreenHeader";
import { Button } from "../../components/Button";
import { BottomSheet } from "../../components/BottomSheet";
import { EmptyState } from "../../components/EmptyState";
import { colors, spacing, radius, type } from "../../theme";

export default function Productos(){
    const { products, addProduct, updateProduct, loading, loadProducts } = useProductManager();
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [deleting, setDeleting] = useState(false);

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
            setDeleting(true);
            await deleteProductRequest(productToDelete.id);
            Alert.alert("Sucesso", "Produto removido com sucesso!");
            setDeleteModalVisible(false);
            loadProducts();
        } catch (error: any) {
            console.log("Erro ao excluir produto:", error);
            Alert.alert("Erro", error.response?.data?.error || "Não foi possível excluir o produto.");
        } finally {
            setDeleting(false);
        }
    };

    const header = (
        <ScreenHeader
            eyebrow={`${products.length} ${products.length === 1 ? 'item' : 'itens'}`}
            title="Produtos"
            right={
                <Button
                    title="Novo"
                    Icon={Plus}
                    size="sm"
                    variant="dark"
                    onPress={() => { setEditingProduct(null); setModalVisible(true); }}
                />
            }
        />
    );

    return(
        <SafeAreaView style={styles.safe} edges={['top']}>
            {header}

            {loading && products.length === 0 ? (
                <View style={styles.loading}>
                    <ActivityIndicator color={colors.ink} />
                    <Text style={styles.loadingText}>Carregando produtos...</Text>
                </View>
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ProductItem item={item} onEdit={handleOpenEdit} onDelete={handleOpenDelete} />
                    )}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <EmptyState
                            Icon={Package}
                            title="Nenhum produto cadastrado"
                            hint="Toque em Novo para cadastrar o primeiro produto."
                        />
                    }
                    showsVerticalScrollIndicator={false}
                />
            )}

            <ProductModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSave}
                productToEdit={editingProduct}
            />

            <BottomSheet
                visible={deleteModalVisible}
                onClose={() => setDeleteModalVisible(false)}
                title="Excluir produto?"
            >
                <View style={styles.warning}>
                    <View style={styles.warningIcon}>
                        <AlertTriangle size={20} color={colors.danger} strokeWidth={2.25} />
                    </View>
                    <Text style={styles.warningText}>
                        <Text style={styles.warningStrong}>"{productToDelete?.name}"</Text> não vai mais aparecer
                        para vendas. O histórico de vendas antigas continua salvo.
                    </Text>
                </View>

                <Button
                    title="Sim, excluir"
                    variant="danger"
                    onPress={confirmDelete}
                    loading={deleting}
                />
                <Button
                    title="Cancelar"
                    variant="ghost"
                    onPress={() => setDeleteModalVisible(false)}
                    style={styles.cancel}
                />
            </BottomSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: colors.paper,
    },

    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.md,
    },

    loadingText: {
        ...type.caption,
    },

    list: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xxxl,
    },

    warning: {
        flexDirection: 'row',
        gap: spacing.md,
        backgroundColor: colors.dangerSoft,
        borderRadius: radius.lg,
        borderCurve: 'continuous',
        padding: spacing.lg,
        marginBottom: spacing.xl,
    },

    warningIcon: {
        width: 36,
        height: 36,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },

    warningText: {
        ...type.body,
        fontSize: 14,
        lineHeight: 20,
        flex: 1,
    },

    warningStrong: {
        fontWeight: '700',
    },

    cancel: {
        marginTop: spacing.sm,
    },
})
