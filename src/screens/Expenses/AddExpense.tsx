import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Package, Receipt, FileText, DollarSign, Calendar, Hash, Box, ChevronDown, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../../types/product';
import { api } from '../../services/api';

import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { BottomSheet } from '../../components/BottomSheet';
import { EmptyState } from '../../components/EmptyState';
import { colors, spacing, radius, type } from '../../theme';

type ExpenseType = 'merchandise' | 'operational';

const TYPE_OPTIONS: { key: ExpenseType; label: string; hint: string; Icon: typeof Package }[] = [
    { key: 'merchandise', label: 'Mercadoria', hint: 'Compra para revender', Icon: Package },
    { key: 'operational', label: 'Operacional', hint: 'Aluguel, frete, taxas', Icon: Receipt },
];

export default function AddExpense() {
    const navigation = useNavigation();
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [expenseType, setExpenseType] = useState<ExpenseType>('merchandise');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [saving, setSaving] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isProductModalVisible, setIsProductModalVisible] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await api.get('/products');
                setProductsList(response.data);
            } catch (error) {
                console.log("Erro ao carregar a lista de produtos:", error);
            }
        }

        fetchProducts();
    }, []);

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
            setSaving(true);
            const backendType = expenseType === 'merchandise' ? 'COMPRA' : 'OPERACIONAL';
            const parsedQuantity = quantity ? parseInt(quantity, 10) : 0;

            const payload = {
                title: description,
                amount: parseFloat(value.replace(',', '.')),
                type: backendType,
                date,
                quantity: parsedQuantity > 0 ? parsedQuantity : undefined,
                productId: selectedProduct?.id
            };

            await api.post('/expenses', payload);

            Alert.alert("Sucesso", "Gasto registrado!");
            navigation.goBack();
        } catch (error: any) {
            console.log("Erro ao salvar gasto:", error);
            Alert.alert("Erro", error.response?.data?.error || "Falha ao salvar no servidor.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <ScreenHeader eyebrow="Registrar" title="Novo gasto" onBack={() => navigation.goBack()} />

                    <View style={styles.content}>
                        <Text style={styles.sectionTitle}>Tipo</Text>
                        <View style={styles.typeContainer}>
                            {TYPE_OPTIONS.map(({ key, label, hint, Icon }) => {
                                const selected = expenseType === key;
                                return (
                                    <Pressable
                                        key={key}
                                        onPress={() => setExpenseType(key)}
                                        accessibilityRole="radio"
                                        accessibilityState={{ selected }}
                                        style={[styles.typeCard, selected && styles.typeCardSelected]}
                                    >
                                        <View style={styles.typeTop}>
                                            <Icon size={20} color={selected ? colors.lime : colors.ink} strokeWidth={2.25} />
                                            {selected && <Check size={16} color={colors.lime} strokeWidth={3} />}
                                        </View>
                                        <Text style={[styles.typeLabel, selected && styles.typeLabelSelected]}>{label}</Text>
                                        <Text style={[styles.typeHint, selected && styles.typeHintSelected]}>{hint}</Text>
                                    </Pressable>
                                );
                            })}
                        </View>

                        <Text style={styles.sectionTitle}>Detalhes</Text>
                        <TextField
                            Icon={FileText}
                            placeholder={expenseType === 'merchandise' ? "Ex: 1 caixa de batom" : "Descrição do gasto"}
                            value={description}
                            onChangeText={setDescription}
                        />

                        <View style={styles.row}>
                            <TextField
                                Icon={DollarSign}
                                placeholder="Valor (R$)"
                                keyboardType="numeric"
                                value={value}
                                onChangeText={setValue}
                                containerStyle={styles.rowItem}
                            />
                            <TextField
                                Icon={Calendar}
                                placeholder="dd/mm/aaaa"
                                value={date}
                                onChangeText={handleDateChange}
                                keyboardType="numeric"
                                maxLength={10}
                                containerStyle={styles.rowItem}
                            />
                        </View>

                        {expenseType === 'merchandise' && (
                            <TextField
                                Icon={Hash}
                                placeholder="Quantidade comprada"
                                keyboardType="numeric"
                                value={quantity}
                                onChangeText={setQuantity}
                            />
                        )}

                        <Text style={styles.sectionTitle}>Vincular a produto · opcional</Text>
                        <Pressable
                            style={({ pressed }) => [styles.selectProduct, pressed && styles.selectProductPressed]}
                            onPress={() => setIsProductModalVisible(true)}
                            accessibilityRole="button"
                        >
                            <Box size={18} color={selectedProduct ? colors.ink : colors.inkFaint} />
                            <Text
                                style={[styles.selectProductText, !selectedProduct && styles.selectProductPlaceholder]}
                                numberOfLines={1}
                            >
                                {selectedProduct ? selectedProduct.name : 'Selecionar produto'}
                            </Text>
                            <ChevronDown size={18} color={colors.inkSoft} />
                        </Pressable>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Button title="Salvar gasto" onPress={handleSave} loading={saving} />
                </View>
            </KeyboardAvoidingView>

            <BottomSheet
                visible={isProductModalVisible}
                onClose={() => setIsProductModalVisible(false)}
                title="Escolha um produto"
            >
                {productsList.length === 0 ? (
                    <EmptyState Icon={Package} title="Nenhum produto cadastrado" />
                ) : (
                    productsList.map(item => {
                        const selected = selectedProduct?.id === item.id;
                        return (
                            <Pressable
                                key={item.id}
                                style={({ pressed }) => [styles.productListItem, pressed && styles.selectProductPressed]}
                                onPress={() => {
                                    setSelectedProduct(item);
                                    setIsProductModalVisible(false);
                                }}
                                accessibilityRole="button"
                                accessibilityState={{ selected }}
                            >
                                <View style={styles.flex}>
                                    <Text style={styles.productListName}>{item.name}</Text>
                                    <Text style={styles.productListStock}>{item.stock} em estoque</Text>
                                </View>
                                {selected && <Check size={18} color={colors.ink} strokeWidth={2.75} />}
                            </Pressable>
                        );
                    })
                )}

                {selectedProduct && (
                    <Button
                        title="Remover vínculo"
                        variant="ghost"
                        onPress={() => { setSelectedProduct(null); setIsProductModalVisible(false); }}
                        style={styles.unlink}
                    />
                )}
            </BottomSheet>
        </SafeAreaView>
    );
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

    content: {
        paddingHorizontal: spacing.xl,
    },

    sectionTitle: {
        ...type.eyebrow,
        marginBottom: spacing.sm,
        marginTop: spacing.sm,
    },

    typeContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.xl,
    },

    typeCard: {
        flex: 1,
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: colors.line,
        borderRadius: radius.lg,
        borderCurve: 'continuous',
        padding: spacing.lg,
    },

    typeCardSelected: {
        backgroundColor: colors.ink,
        borderColor: colors.ink,
    },

    typeTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
    },

    typeLabel: {
        ...type.subheading,
        fontSize: 15,
    },

    typeLabelSelected: {
        color: colors.onInk,
    },

    typeHint: {
        ...type.caption,
        fontSize: 12,
        marginTop: 2,
    },

    typeHintSelected: {
        color: colors.onInkSoft,
    },

    row: {
        flexDirection: 'row',
        gap: spacing.sm,
    },

    rowItem: {
        flex: 1,
    },

    selectProduct: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: colors.line,
        borderStyle: 'dashed',
        minHeight: 54,
        borderRadius: radius.md,
        borderCurve: 'continuous',
        paddingHorizontal: spacing.lg,
    },

    selectProductPressed: {
        opacity: 0.6,
    },

    selectProductText: {
        ...type.bodyStrong,
        flex: 1,
    },

    selectProductPlaceholder: {
        color: colors.inkFaint,
        fontWeight: '400',
    },

    footer: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        backgroundColor: colors.surface,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.line,
    },

    productListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.md + 2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.line,
    },

    productListName: {
        ...type.bodyStrong,
    },

    productListStock: {
        ...type.caption,
        marginTop: 2,
    },

    unlink: {
        marginTop: spacing.md,
    },
});
