import { useState, useMemo } from "react";

interface Product {
    id: string;
    name: string;
    price: number; 
}

export function useSaleManager() {
    const [selectedItems, setSelectedItems] = useState<Product[]>([]);

    const addItem = (product: Product) => {
        const newItem = { ...product, id: Math.random().toString() };
        setSelectedItems((prev) => [...prev, newItem]);
    };

    const removeItem = (id: string) => {
        setSelectedItems((prev) => prev.filter(item => item.id !== id));
    };

    const totalValue = useMemo(() => {
        return selectedItems.reduce((acc, curr) => acc + curr.price, 0);
    }, [selectedItems]);

    const clearSale = () => setSelectedItems([]);

    return {
        selectedItems, 
        addItem, 
        removeItem, 
        totalValue, 
        clearSale
    };
}