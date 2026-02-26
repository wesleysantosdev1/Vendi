import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Plus, TrendingDown, BarChart3, List } from "lucide-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../navigations/types";


import { SummaryCard } from "../../components/SummaryCard";
import { TotalSalesBanner } from "../../components/TotalSalesBanner";
import { QuickAction } from "../../components/QuickAction";
import { RecentSale } from "../../components/RecentSale";

type NavigationProp = BottomTabNavigationProp<
    TabParamList,
    'HomeTab'
>;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <SafeAreaProvider style={styles.safe}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.greeting}>Olá, Wesley! 👋</Text>
                    <Text style={styles.date}>Quarta-feira, 11 de Fevereiro</Text>
                </View>

                <View style={styles.row}>
                    <SummaryCard label="HOJE" value="R$ 450,00" color="#3653E2" />
                    <SummaryCard label="SEMANA" value="R$ 2.340,00" color="#21C45D" />
                    <SummaryCard label="MÊS" value="R$ 8.750,00" color="#F59F0A" />
                </View>

                <TotalSalesBanner total={142} />

                <Text style={styles.sectionTitle}>Atalhos rápidos</Text>
                <View style={styles.row}>
                    <QuickAction 
                        label="Nova Venda" 
                        Icon={Plus} 
                        color="#FFF" 
                        bgColor="#3653E2" 
                        isPrimary 
                        onPress={() => navigation.navigate('Novo')} 
                    />
                    <QuickAction 
                        label="Gastos" 
                        Icon={TrendingDown} 
                        color="#EF4444" 
                        bgColor="#FEE2E2" 
                        onPress={() => navigation.navigate('Expense')}
                    />
                    <QuickAction 
                        label="Relatórios" 
                        Icon={BarChart3} 
                        color="#10B981" 
                        bgColor="#D1FAE5" 
                    />
                    <QuickAction 
                        label="Vendas" 
                        Icon={List} 
                        color="#F59F0A" 
                        bgColor="#FEF3C7" 
                        onPress={() => navigation.navigate('Vendas')}  
                    />
                </View>

                <Text style={styles.sectionTitle}>Vendas recentes</Text>
                <RecentSale name="Maria Silva" time="Hoje, 14:30" value="R$ 120,00" />
                <RecentSale name="Carlos Santos" time="Hoje, 11:15" value="R$ 85,00" />
                <RecentSale name="Ana Oliveira" time="Ontem, 16:45" value="R$ 245,00" />

            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safe: { 
        flex: 1, 
        backgroundColor: '#F8F9FA' 
    },

    container: { 
        padding: 20, 
        paddingBottom: 100 
    },

    header: { 
        marginBottom: 20 
    },

    greeting: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#1A1A1A' 
    },

    date: { 
        fontSize: 14, 
        color: '#828489',
        marginTop: 4 
    },

    row: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start' 
    },

    sectionTitle: { 
        fontSize: 17, 
        fontWeight: 'bold', 
        color: '#1A1A1A', 
        marginTop: 25, 
        marginBottom: 15 
    },
});