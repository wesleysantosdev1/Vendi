import { useState, useEffect, useCallback } from 'react';
import { getProductsRequest, createProductRequest, updateProductRequest } from '../../../services/productService';

export interface Product {
    id: string;
    name: string; 
    price: number;
    stock: number;
}

export function useProductManager(){
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true);

    const loadProducts = useCallback(async () => {
        setLoading(true); 
        try {
            const data = await getProductsRequest();

            const normalizedProducts = data.map((product: Product) => ({
                ...product,
                stock: Math.max(0, product.stock)
            }));

            setProducts(normalizedProducts);
        } catch (error) {
            console.log('Erro ao buscar produtos', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const addProduct = async (newProduct: Omit<Product, 'id'>) => {
        try {
            const created = await createProductRequest(
                newProduct.name,
                newProduct.price,
                newProduct.stock
            );

            setProducts((prev) => [...prev, created]);
        } catch (error) {
            console.log("Erro ao criar produto", error);
        }
    };

    const updateProduct = async (updatedProduct: Product) => {
        try {
            const updated = await updateProductRequest(
                updatedProduct.id,
                updatedProduct.name,
                updatedProduct.price,
                updatedProduct.stock
            );

            setProducts((prev) => 
                prev.map(p => p.id === updated.id ? updated : p)
            );
        } catch (error) {
            console.log("Erro ao atualizar produto", error);
        }
    };

    return {
        products, 
        addProduct, 
        updateProduct,
        loading,
        loadProducts
    };
}