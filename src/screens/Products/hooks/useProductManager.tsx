import { useState} from 'react';

export interface Product {
    id: string;
    name: string; 
    price: number;
    stock: number;
}

export function useProductManager(){
    const [products, setProducts] = useState<Product[]>([
        { id: '1', name: "Camiseta Básica", price: 39.90, stock: 25 },
        { id: '2', name: "Calça Jeans", price: 89.90, stock: 12 },
    ]);

    const addProduct = (newProduct: Omit<Product, 'id'>) => {
        const product = { ...newProduct, id: Math.random().toString() };
        setProducts((prev) => [...prev, product]);
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts((prev) => 
            prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
        );
    };

    return {
        products, 
        addProduct, 
        updateProduct
    };
}