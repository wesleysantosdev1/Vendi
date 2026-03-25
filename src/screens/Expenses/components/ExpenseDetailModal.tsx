import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Package, ArrowLeft } from 'lucide-react-native';
import formatDateTime  from '../../../utils/date'

interface Props {
    visible: boolean;
    expense: any;
    onClose: () => void;
}

export const ExpenseDetailModal = ({ visible, expense, onClose }: Props) => {
    if (!expense) return null;

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
                            <ArrowLeft size={20} color="#4963E4" />
                            <Text style={styles.backText}>Voltar</Text>
                        </TouchableOpacity>

                        <Text style={styles.title}>Detalhes do Gasto</Text>
                    </View>

                    <View style={styles.mainCard}>
                        <DetailRow 
                            label="Descrição" 
                            value={expense.description} 
                            isBold 
                        />
                        <DetailRow 
                            label="Data e Hora" 
                            value={formatDateTime(expense.date)} 
                        />
                        <DetailRow 
                            label="Quantidade" 
                            value={`${expense.quantity} un.`} 
                        />
                        <DetailRow 
                            label="Produto vinculado" 
                            value={expense.productId ? expense.productId : 'Nenhum'}
                            isLink={!!expense.linkedProductName}
                        />
                        
                        <View style={styles.divider} />
                        
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>- R$ {expense.value.toFixed(2)}</Text>
                        </View>
                    </View>

                    {expense.type === 'merchandise' && expense.linkedProductName && (
                        <View style={styles.stockBadge}>
                            <View style={styles.stockIcon}><Package size={18} color="#4963E4" /></View>

                            <View style={styles.stockInfo}>
                                <Text style={styles.stockTitle}>Estoque atualizado</Text>
                                <Text style={styles.stockDesc}>+{expense.quantity} unidades adicionadas ao produto "{expense.linkedProductName}"</Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const DetailRow = ({ label, value, isBold, isLink }: any) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, isBold && styles.bold, isLink && styles.link]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    overlay: { 
        flex: 1, 
        backgroundColor: '#F8F9FA' 
    },

    content: { 
        padding: 20 
    },

    header: { 
        marginBottom: 30 
    },

    backBtn: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 15 
    },

    backText: {
        color: '#4963E4', 
        marginLeft: 5, 
        fontSize: 16 
    },

    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#051D3B' 
    },

    mainCard: { 
        backgroundColor: '#FFF', 
        borderRadius: 16, 
        padding: 20, 
        elevation: 2 
    },

    row: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 15 
    },

    label: { 
        color: '#828489', 
        fontSize: 15 
    },

    value: { 
        color: '#1A1A1A', 
        fontSize: 15, flex: 1, 
        textAlign: 'right', 
        marginLeft: 20 
    },

    bold: { 
        fontWeight: 'bold' 
    },

    link: { 
        color: '#4963E4', 
        fontWeight: 'bold' 
    },

    divider: { 
        height: 1, 
        backgroundColor: '#F0F2F5', 
        marginVertical: 10 
    },

    totalRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 10 
    },

    totalLabel: { 
        fontSize: 16, 
        fontWeight: 'bold' 
    },

    totalValue: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#EF4444' 
    },

    stockBadge: { 
        flexDirection: 'row', 
        backgroundColor: '#EEF2FF', 
        padding: 15, 
        borderRadius: 16, 
        marginTop: 20,
        alignItems: 'center'
    },
    stockIcon: { 
        backgroundColor: '#FFF', 
        padding: 8, 
        borderRadius: 10 
    },

    stockInfo: { 
        marginLeft: 15, 
        flex: 1 
    },

    stockTitle: { 
        fontSize: 12, 
        color: '#828489' 
    },

    stockDesc: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        color: '#051D3B',
        marginTop: 2 
    }
});