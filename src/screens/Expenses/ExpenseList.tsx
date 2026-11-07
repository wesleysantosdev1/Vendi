import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Plus, Receipt } from 'lucide-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigations/types';

import { useExpense, Expense } from '../../contexts/ExpenseContext';
import { ExpenseItem } from './components/ExpenseItem';
import { ExpenseDetailModal } from './components/ExpenseDetailModal';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { EmptyState } from '../../components/EmptyState';
import { Button } from '../../components/Button';
import { formatBRL } from '../../utils/money';
import { colors, spacing, radius, type } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ExpenseList() {
    const navigation = useNavigation<NavigationProp>();
    const { expenses, totalMonthlyExpenses, loadExpenses } = useExpense();
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [searchText, setSearchText] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            loadExpenses();
        }, [loadExpenses])
    );

    const filteredExpenses = expenses.filter((expense) =>
        (expense.description ?? '').toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.safe} edges={['top']}>
            <FlatList
                data={filteredExpenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ExpenseItem item={item} onPress={() => setSelectedExpense(item)} />
                )}
                ListHeaderComponent={
                    <>
                        <View style={styles.headerWrap}>
                            <ScreenHeader
                                eyebrow="Saídas"
                                title="Gastos"
                                onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
                                right={
                                    <Button
                                        title="Adicionar"
                                        Icon={Plus}
                                        size="sm"
                                        variant="dark"
                                        onPress={() => navigation.navigate('AddExpenseForm')}
                                    />
                                }
                            />
                        </View>

                        <View style={styles.totalCard}>
                            <Text style={styles.totalLabel}>Gasto no mês</Text>
                            <Text style={styles.totalValue} numberOfLines={1} adjustsFontSizeToFit>
                                − {formatBRL(totalMonthlyExpenses)}
                            </Text>
                        </View>

                        <TextField
                            Icon={Search}
                            placeholder="Buscar gastos"
                            value={searchText}
                            onChangeText={setSearchText}
                            returnKeyType="search"
                            containerStyle={styles.search}
                        />
                    </>
                }
                ListEmptyComponent={
                    <EmptyState
                        Icon={Receipt}
                        title={searchText ? 'Nenhum gasto encontrado' : 'Nenhum gasto registrado'}
                        hint={searchText ? 'Tente buscar por outra descrição.' : 'Registre compras e despesas para ver o lucro real.'}
                    />
                }
                contentContainerStyle={styles.list}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            />

            <ExpenseDetailModal
                visible={!!selectedExpense}
                expense={selectedExpense}
                onClose={() => setSelectedExpense(null)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: colors.paper,
    },

    // O ScreenHeader já tem padding lateral; aqui a lista inteira também tem.
    headerWrap: {
        marginHorizontal: -spacing.xl,
    },

    list: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xxxl,
    },

    totalCard: {
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: colors.line,
        padding: spacing.xl,
        marginBottom: spacing.md,
    },

    totalLabel: {
        ...type.eyebrow,
    },

    totalValue: {
        ...type.display,
        fontSize: 34,
        color: colors.danger,
        marginTop: spacing.sm,
    },

    search: {
        marginBottom: spacing.sm,
    },
});
