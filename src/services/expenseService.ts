import { api } from "./api";

export async function createExpenseRequest(data: any) {
    const formattedData = {
        title: data.description,
        amount: data.value,
        type: data.type.toUpperCase(), 
        date: new Date()
    };

    const response = await api.post('/expenses', formattedData);
    return response.data;
}