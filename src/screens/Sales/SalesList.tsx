import React, { useState, useCallback } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, ShoppingBag } from 'lucide-react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/types";

import { SaleItem } from "./components/SaleItem";
import { ScreenHeader } from "../../components/ScreenHeader";
import { TextField } from "../../components/TextField";
import { EmptyState } from "../../components/EmptyState";
import { getSales } from "../../services/saleService";
import { Sale } from "../../types/sale";
import { colors, spacing } from "../../theme";

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'SaleDetails'
>;

export default function SalesList(){
    const navigation = useNavigation<NavigationProp>();
    const [sales, setSales] = useState<Sale[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');

    async function loadSales() {
        setRefreshing(true);
        try {
            const data = await getSales();
            const formatted = data.map((sale: any) => ({
                id: sale.id,
                name: sale.customerName,
                phone: sale.customerPhone,
                date: new Date(sale.createdAt).toLocaleDateString('pt-BR'),
                items: sale.items.reduce((acc: number, item: any) => acc + item.quantity, 0),
                value: sale.total,
                fullItems: sale.items
            }));
            setSales(formatted);
        } catch (error) {
            console.log("Erro ao carregar vendas:", error);
        } finally {
            setRefreshing(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadSales();
        }, [])
    );

    const filteredSales = sales.filter((sale) =>
        (sale.name ?? '').toLowerCase().includes(searchText.toLowerCase())
    );

    return(
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScreenHeader
                eyebrow={`${sales.length} ${sales.length === 1 ? 'venda' : 'vendas'}`}
                title="Vendas"
            />

            <View style={styles.search}>
                <TextField
                    Icon={Search}
                    placeholder="Buscar por cliente"
                    value={searchText}
                    onChangeText={setSearchText}
                    returnKeyType="search"
                    containerStyle={styles.searchField}
                />
            </View>

            <FlatList
                data={filteredSales}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={loadSales}
                        colors={[colors.ink]}
                        tintColor={colors.ink}
                    />
                }
                renderItem={({ item }) => (
                    <SaleItem
                        data={item}
                        onPress={() => navigation.navigate('SaleDetails', { sale: item })}
                    />
                )}
                ListEmptyComponent={
                    refreshing ? undefined : (
                        <EmptyState
                            Icon={ShoppingBag}
                            title={searchText ? 'Nenhuma venda encontrada' : 'Nenhuma venda ainda'}
                            hint={searchText ? 'Tente buscar por outro nome.' : 'As vendas registradas aparecem aqui.'}
                        />
                    )
                }
                contentContainerStyle={styles.listContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.paper,
    },

    search: {
        paddingHorizontal: spacing.xl,
    },

    searchField: {
        marginBottom: spacing.sm,
    },

    listContent: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xxxl,
    },
})
