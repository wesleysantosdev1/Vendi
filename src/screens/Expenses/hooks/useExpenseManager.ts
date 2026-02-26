import { useState, useMemo } from 'react';

export interface Expense {
    id: string;
    type: 'merchandise' | 'operational';
    description: string;
    value: number;
    date: string;
    quantity?: number;
    category: string;
}

export function useExpenseManager() {
    const [expenses, setExpenses] = useState<Expense[]>([
        { 
            id: '1', 
            type: 'merchandise', 
            description: 'Compra de 1 caixa grande com 25 Nescauzinho', 
            value: 53.34, 
            date: '08/02/2026', 
            quantity: 25, 
            category: 'Mercadorias / Estoque' 
        },
    ]);

    const totalMonthlyExpenses = useMemo(() => {
        return expenses.reduce((acc, curr) => acc + curr.value, 0);
    }, [expenses]);

    const addExpense = (newExpense: Omit<Expense, 'id'>) => {
        const expense = { ...newExpense, id: Math.random().toString() };
        setExpenses(prev => [expense, ...prev]);
    };

    return {
        expenses,
        totalMonthlyExpenses, 
        addExpense,
    };
}