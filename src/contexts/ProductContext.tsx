import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Product {
    id: string; 
    name: string; 
    price: number; 
    stock: number; 
}

interface ProductContextData {
    products: Product[];
    addProduct: (newProduct: Omit<Product, 'id'>) => void;
    updateProduct: (updatedProduct: Product) => void;
}

const ProductContext = createContext<ProductContextData>({} as ProductContextData);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts ] = useState<Product[]>([]); 

    const addProduct = (newProduct: Omit<Product, 'id'>) => {
        const product = { ...newProduct, id: Math.random().toString() };
        setProducts(prev => [...prev, product]);
    }; 

    const updateProduct = (updatedProduct: Product) => {
        setProducts(prev => 
            prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
        );
    }; 

    return (
        <ProductContext.Provider value={{ 
            products, 
            addProduct, 
            updateProduct,
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProducts() {
    return useContext(ProductContext);
}