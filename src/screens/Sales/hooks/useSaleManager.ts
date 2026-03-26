import { useState, useMemo } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
}

interface SelectedItem extends Product {
    quantity: number;
}

export function useSaleManager() {
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

    const addItem = (product: Product) => {
        setSelectedItems((prev) => {
            const existing = prev.find(item => item.id === product.id);

            if (existing) {
                if (existing.quantity >= product.stock) {
                    return prev;
                }

                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            if (product.stock <= 0) {
                return prev;
            }

            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeItem = (id: string) => {
        setSelectedItems((prev) => prev.filter(item => item.id !== id));
    };

    const totalValue = useMemo(() => {
        return selectedItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
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