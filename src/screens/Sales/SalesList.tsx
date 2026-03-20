import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { SaleItem } from "./components/SaleItem";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/types";

import { getSales } from "../../services/saleService";
import { Sale } from "../../types/sale";

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'SaleDetails'
>;

export default function SalesList(){
    const navigation = useNavigation<NavigationProp>();
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        async function loadSales() {
            const data = await getSales();

            const formatted = data.map((sale: any) => ({
                id: sale.id,
                name: sale.customerName,
                date: new Date(sale.createdAt).toLocaleDateString(),
                items: sale.items.length,
                value: sale.total.toFixed(2)
            }));

            setSales(formatted);
        }

        loadSales();
    }, [])

    return(
        <SafeAreaProvider style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Vendas</Text>
            </View>

            <View style={styles.searchContainer}>
                <Search size={20} color="#828489" />
                <TextInput 
                placeholder="Buscar vendas..." 
                style={styles.searchInput}
                placeholderTextColor="#828489"
                />
            </View>

            <FlatList
                data={sales}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => 
                    <SaleItem data={item} 
                        onPress={() => 
                            navigation.navigate('SaleDetails', { sale: item })
                        }
                    />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F8F9FA' 
    },

    header: { 
        paddingHorizontal: 20, 
        paddingTop: 20, 
        paddingBottom: 15 
    },

    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#1A1A1A' 
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF0F2',
        marginHorizontal: 20,
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 48,
        marginBottom: 20,
    },

    searchInput: { 
        flex: 1, 
        fontSize: 15, 
        marginLeft: 10 
    },

    listContent: { 
        paddingHorizontal: 20, 
        paddingBottom: 100 
    },

})