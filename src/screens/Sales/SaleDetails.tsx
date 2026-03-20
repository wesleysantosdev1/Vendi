import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function SaleDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const { sale } = route.params as any;

    const total = Number(sale.value) || 0;

    return (
        <SafeAreaProvider style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft size={16} color="#4963E4" />
                    <Text style={styles.backText}>Voltar</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Detalhes da Venda</Text>

                <View style={styles.card}>
                    {/* Linha do Cliente */}
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Cliente</Text>
                        <Text style={styles.infoValueBold}>{sale.name}</Text>
                    </View>

                    {/* Linha do Telefone (NOVO) */}
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Telefone</Text>
                        <Text style={styles.infoValue}>{sale.phone || 'Não informado'}</Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Data</Text>
                        <Text style={styles.infoValue}>{sale.date}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Itens</Text>
                        <Text style={styles.infoValue}>{sale.items} itens</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Produtos</Text>
                    {sale.fullItems?.map((item: any, index: number) => (
                        <View key={index} style={styles.productRow}>
                            <View>
                                <Text style={styles.productName}>{item.product.name}</Text>
                                <Text style={styles.label}>{item.quantity}x R$ {item.price.toFixed(2)}</Text>
                            </View>
                            <Text style={styles.productPrice}>
                                R$ {(item.price * item.quantity).toFixed(2)}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },

    container: {
        padding: 20,
    },

    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    backText: {
        color: '#4963E4',
        fontSize: 16,
        marginLeft: 5,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051D3B',
        marginBottom: 25,
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },

    label: {
        color: '#828489',
        fontSize: 15,
    },

    infoValue: {
        color: '#1A1A1A',
        fontSize: 15,
    },

    infoValueBold: {
        color: '#1A1A1A',
        fontSize: 15,
        fontWeight: 'bold',
    },

    divider: {
        height: 1,
        backgroundColor: '#F0F2F5',
        marginVertical: 10,
    },

    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },

    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#21C45D', 
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 20,
    },

    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    productName: {
        color: '#828489',
        fontSize: 15,
    },

    productPrice: {
        color: '#1A1A1A',
        fontSize: 15,
        fontWeight: 'bold',
    }
});