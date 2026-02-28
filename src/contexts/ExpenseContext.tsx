import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Expense {
    id: string;
    type: 'merchandise' | 'operational';
    description: string;
    value: number;
    date: string;
    quantity?: number;
    linkedProductId?: string;
    category: string;
}

interface ExpenseContextData {
    expenses: Expense[];
    totalMonthlyExpenses: number;
    addExpense: (newExpenses: Omit<Expense, 'id'>) => void;
}

const ExpenseContext = createContext<ExpenseContextData>({} as ExpenseContextData);


export function ExpenseProvider({ children }: { children: ReactNode }) {
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

    const totalMonthlyExpenses = expenses.reduce((acc, curr) => acc + curr.value, 0);

    const addExpense = (newExpense: Omit<Expense, 'id'>) => {
        const expense = { ...newExpense, id: Math.random().toString() };
        setExpenses(prev => [expense, ...prev]);
    };

    return (
        <ExpenseContext.Provider value={{ expenses, totalMonthlyExpenses, addExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
}

export function useExpense() {
    return useContext(ExpenseContext);
}