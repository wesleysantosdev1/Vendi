import React, { memo } from "react";
import { TransactionRow } from "../../../components/TransactionRow";
import { formatBRL } from "../../../utils/money";

interface SaleItemProps {
    data: {
        id: string;
        name: string;
        date: string;
        items: number;
        value: number;
    };
    onPress: () => void;
}

const SaleItemComponent = ({ data, onPress }: SaleItemProps) => (
    <TransactionRow
        title={data.name}
        subtitle={`${data.date} · ${data.items} ${data.items === 1 ? 'item' : 'itens'}`}
        amount={formatBRL(data.value)}
        onPress={onPress}
    />
);

export const SaleItem = memo(SaleItemComponent);
