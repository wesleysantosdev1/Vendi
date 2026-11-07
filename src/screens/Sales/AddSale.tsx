import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Phone, Package } from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSaleManager } from "./hooks/useSaleManager";

import { ProductChip } from "./components/ProductChip";
import { OrderSummary } from "./components/OrderSummary";
import { ScreenHeader } from "../../components/ScreenHeader";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";
import { EmptyState } from "../../components/EmptyState";

import { getProductsRequest } from "../../services/productService";
import { createSale } from "../../services/saleService";
import { formatBRL } from "../../utils/money";
import { colors, spacing, type } from "../../theme";
import { logError } from "../../utils/logError";


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
    const [saving, setSaving] = useState(false);

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
                try {
                    const data = await getProductsRequest();
                    setProducts(data);
                } catch (error) {
                    logError("Erro ao carregar produtos:", error);
                }
            }
            load();
        }, [])
    );

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
            setSaving(true);
            await createSale({
                customer: { name, phone },
                items
            });

            const updatedProducts = await getProductsRequest();
            setProducts(updatedProducts);

            Alert.alert("Sucesso", "Venda salva!");

            setName("");
            setPhone("");
            clearSale();
        } catch (error: any) {
            logError("Erro ao salvar venda:", error);
            Alert.alert("Erro", error.response?.data?.error || "Falha ao salvar venda.");
        } finally {
            setSaving(false);
        }
    };

    const getInCart = (productId: string) =>
        selectedItems.find(item => item.id === productId)?.quantity ?? 0;

    const itemCount = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

    return(
        <SafeAreaView style={styles.safe} edges={['top']}>
            <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <ScreenHeader eyebrow="Registrar" title="Nova venda" />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Cliente</Text>
                        <TextField
                            placeholder="Nome do cliente"
                            Icon={User}
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />
                        <TextField
                            placeholder="Telefone (opcional)"
                            Icon={Phone}
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={(t) => setPhone(maskPhone(t))}
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Produtos</Text>
                        <Text style={styles.sectionHint}>Toque para adicionar. Toque de novo para somar mais um.</Text>

                        {products.length === 0 ? (
                            <EmptyState
                                Icon={Package}
                                title="Nenhum produto cadastrado"
                                hint="Cadastre produtos na aba Produtos para vender."
                            />
                        ) : (
                            <View style={styles.productGrid}>
                                {products.map(p => {
                                    const inCart = getInCart(p.id);
                                    const availableStock = p.stock - inCart;

                                    return (
                                        <ProductChip
                                            key={p.id}
                                            label={p.name}
                                            stock={availableStock}
                                            inCart={inCart}
                                            onPress={() => {
                                                if (availableStock > 0) {
                                                    addItem(p);
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </View>
                        )}
                    </View>

                    {selectedItems.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Itens da venda</Text>
                            <OrderSummary items={selectedItems} onRemove={removeItem} />
                        </View>
                    )}
                </ScrollView>

                {/* Rodapé fixo com total e botão de salvar */}
                <View style={styles.footer}>
                    <View style={styles.footerTotal}>
                        <Text style={styles.footerLabel}>
                            Total{itemCount > 0 ? ` · ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}` : ''}
                        </Text>
                        <Text style={styles.footerValue} numberOfLines={1} adjustsFontSizeToFit>
                            {formatBRL(totalValue)}
                        </Text>
                    </View>
                    <Button
                        title="Salvar venda"
                        onPress={handleSave}
                        loading={saving}
                        disabled={selectedItems.length === 0}
                        style={styles.footerButton}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: colors.paper,
    },

    flex: {
        flex: 1,
    },

    container: {
        paddingBottom: spacing.xxl,
    },

    section: {
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.xl,
    },

    sectionTitle: {
        ...type.eyebrow,
        marginBottom: spacing.sm,
    },

    sectionHint: {
        ...type.caption,
        marginTop: -spacing.xs,
        marginBottom: spacing.md,
    },

    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.lg,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        backgroundColor: colors.surface,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.line,
    },

    footerTotal: {
        flex: 1,
    },

    footerLabel: {
        ...type.eyebrow,
    },

    footerValue: {
        ...type.money,
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: -0.6,
        marginTop: 2,
    },

    footerButton: {
        paddingHorizontal: spacing.xxl,
    },
});
