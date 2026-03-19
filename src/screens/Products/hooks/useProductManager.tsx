import { useState, useEffect} from 'react';
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

    async function loadProducts() {
        try {
            const data = await getProductsRequest();
            setProducts(data);
        } catch (error) {
            console.log('Erro ao buscar produtos', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

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
        loading
    };
}