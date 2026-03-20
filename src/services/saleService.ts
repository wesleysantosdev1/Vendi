import { api } from "./api";

export async function getSales() {
    const response = await api.get("/sales");
    return response.data;
}

export async function createSale(data: any) {
    const response = await api.post("/sales", data);
    return response.data;
}