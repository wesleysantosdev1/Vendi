import { api } from "./api";

export async function getProductsRequest() {
    const response = await api.get('/products');
    return response.data;
}

export async function createProductRequest(name: string, price: number, stock: number) {
    const response = await api.post('/products', {
        name,
        price, 
        stock
    });

    return response.data;
}

export async function updateProductRequest(id: string, name: string, price: number, stock: number) {
    const response = await api.put(`/products/${id}`, {
        name,
        price,
        stock
    });

    return response.data;
}

export async function deleteProductRequest(id: string) {
    const response = await api.patch(`/products/${id}/disable`, { 
        active: false 
    });

    return response.data;
}