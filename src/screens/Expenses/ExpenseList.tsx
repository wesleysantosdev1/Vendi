import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Search, Plus, ArrowUpRight } from 'lucide-react-native';
import { useExpense } from '../../contexts/ExpenseContext'; 
import { ExpenseItem } from './components/ExpenseItem';
import { ExpenseDetailModal } from './components/ExpenseDetailModal';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../services/api';
import { Expense } from './hooks/useExpenseManager';

export default function ExpenseList({ navigation }: any) {
    const { totalMonthlyExpenses } = useExpense();
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [_total, setTotal] = useState<number>(0);

    const loadExpenses = async () => {
        const response = await api.get('/expenses');
        const data: Expense[] = response.data.map((item: any) => ({
            id: item.id,
            type: item.type.toLowerCase(),
            description: item.title,
            value: item.amount,
            date: item.date,
            quantity: item.quantity,
            category: 'Outros'
        }));

        setExpenses(data);

        const sum = data.reduce((acc, curr) => acc + curr.value, 0);
        setTotal(sum);
    }

    useFocusEffect(
        React.useCallback(() => {
            loadExpenses();
        }, [])
    );

    return (
        <SafeAreaProvider style={styles.safe}>
            <View style={styles.header}>
                <Text style={styles.title}>Gastos / Compras</Text>
                <TouchableOpacity 
                    style={styles.btnAdd} 
                    onPress={() => navigation.navigate('AddExpenseForm')} 
                >
                    <Plus size={18} color="#FFF" />
                    <Text style={styles.btnText}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.totalCard}>
                <View style={styles.iconCircle}>
                    <ArrowUpRight size={20} color="#EF4444" />
                </View>
                <View style={styles.totalInfo}>
                    <Text style={styles.totalLabel}>Total de gastos no mês</Text>
                    <Text style={styles.totalValue}>- R$ {totalMonthlyExpenses.toFixed(2)}</Text>
                </View>
            </View>

            <View style={styles.searchBox}>
                <Search size={20} color="#828489" />
                <TextInput
                    placeholder="Buscar gastos..."
                    style={styles.searchInput}
                    placeholderTextColor="#828489"
                />
            </View>

            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ExpenseItem item={item} onPress={() => setSelectedExpense(item)} />
                )}
                contentContainerStyle={styles.list}
            />

            <ExpenseDetailModal 
                visible={!!selectedExpense} 
                expense={selectedExpense} 
                onClose={() => setSelectedExpense(null)} 
            />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safe: { 
        flex: 1, 
        backgroundColor: '#F8F9FA' 
    },

    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 20 
    },

    title: { 
        fontSize: 24, 
        fontWeight: 'bold' 
    },

    btnAdd: { 
        backgroundColor: '#EF4444', 
        flexDirection: 'row', 
        padding: 10, 
        borderRadius: 12, 
        alignItems: 'center' 
    },

    btnText: { 
        color: '#FFF', 
        fontWeight: 'bold', 
        marginLeft: 5 
    },

    totalCard: { 
        backgroundColor: '#FEE2E2', 
        margin: 20, 
        padding: 20, 
        borderRadius: 16, 
        flexDirection: 'row', 
        alignItems: 'center' 
    },

    iconCircle: { 
        backgroundColor: '#FFF', 
        padding: 10, 
        borderRadius: 12 
    },

    totalInfo: { 
        marginLeft: 15 
    },

    totalLabel: { 
        color: '#828489', 
        fontSize: 13 
    },

    totalValue: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#EF4444' 
    },

    searchBox: { 
        flexDirection: 'row', 
        backgroundColor: '#EEF0F2', 
        marginHorizontal: 20, 
        padding: 12, 
        borderRadius: 12, 
        alignItems: 'center' 
    },

    searchInput: { 
        marginLeft: 10, 
        flex: 1 
    },

    list: { 
        padding: 20 
    }
});