import React, { createContext, useState, useContext, ReactNode, useCallback } from "react";
import { api } from "../services/api";

export interface Expense {
    id: string;
    type: 'merchandise' | 'operational';
    description: string;
    value: number; 
    date: string;
    quantity?: number;
    productId?: string;
    linkedProductName?: string | null;
    category: string;
}

interface ExpenseContextData {
    expenses: Expense[];
    totalMonthlyExpenses: number;
    loadExpenses: () => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextData>({} as ExpenseContextData);

export function ExpenseProvider({ children }: { children: ReactNode }) {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const loadExpenses = useCallback(async () => {
        try {
            const response = await api.get('/expenses');
            
            const formattedData: Expense[] = response.data.map((item: any) => ({
                id: item.id,
                type: item.type.toUpperCase() === 'COMPRA' ? 'merchandise' : 'operational',
                description: item.title,
                value: item.amount,
                date: item.date, 
                quantity: item.quantity,
                productId: item.productId,
                linkedProductName: item.linkedProductName,
                category: 'Outros' 
            }));

            setExpenses(formattedData);
        } catch (error) {
            console.error("Erro ao carregar despesas:", error);
        }
    }, []);

    const totalMonthlyExpenses = expenses.reduce((acc, curr) => {
        const expenseDate = new Date(curr.date);
        const today = new Date();
        
        if (expenseDate.getMonth() === today.getMonth() && expenseDate.getFullYear() === today.getFullYear()) {
            return acc + curr.value;
        }
        return acc;
    }, 0);

    return (
        <ExpenseContext.Provider value={{ expenses, totalMonthlyExpenses, loadExpenses }}>
            {children}
        </ExpenseContext.Provider>
    );
}

export function useExpense() {
    return useContext(ExpenseContext);
}