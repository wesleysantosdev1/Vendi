import React, {useState, useCallback} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
//import { TrendingDown, TrendingUp, DollarSign } from 'lucide-react-native'
import { BarChart } from 'react-native-gifted-charts'
import { api } from "../../services/api";


export default function Reports(){
    const [activeTab, setActiveTab] = useState<'Dia' | 'Semana' | 'Mês'>('Dia');

    const dataDia = [
        { value: 320, label: 'Seg', frontColor: '#4963E4' }, { value: 80, frontColor: '#EF4444' },
        { value: 450, label: 'Ter', frontColor: '#4963E4' }, { value: 150, frontColor: '#EF4444' },
        { value: 280, label: 'Qua', frontColor: '#4963E4' }, { value: 0, frontColor: '#EF4444' },
        { value: 520, label: 'Qui', frontColor: '#4963E4' }, { value: 220, frontColor: '#EF4444' },
        { value: 390, label: 'Sex', frontColor: '#4963E4' }, { value: 50, frontColor: '#EF4444' },
        { value: 610, label: 'Sáb', frontColor: '#4963E4' }, { value: 349, frontColor: '#EF4444' },
        { value: 180, label: 'Dom', frontColor: '#4963E4' }, { value: 250, frontColor: '#EF4444' },
    ];

    const dataSemana = [
        { value: 2100, label: 'S1', frontColor: '#4963E4' }, { value: 480, frontColor: '#EF4444' },
        { value: 2800, label: 'S2', frontColor: '#4963E4' }, { value: 650, frontColor: '#EF4444' },
        { value: 2340, label: 'S3', frontColor: '#4963E4' }, { value: 350, frontColor: '#EF4444' },
        { value: 3200, label: 'S4', frontColor: '#4963E4' }, { value: 850, frontColor: '#EF4444' },
    ];

    const dataMes = [
        { value: 8000, label: 'Out', frontColor: '#4963E4' }, { value: 3100, frontColor: '#EF4444' },
        { value: 9000, label: 'Nov', frontColor: '#4963E4' }, { value: 3500, frontColor: '#EF4444' },
        { value: 12500, label: 'Dez', frontColor: '#4963E4' }, { value: 4800, frontColor: '#EF4444' },
        { value: 8500, label: 'Jan', frontColor: '#4963E4' }, { value: 3200, frontColor: '#EF4444' },
        { value: 6000, label: 'Fev', frontColor: '#4963E4' }, { value: 1358.34, frontColor: '#EF4444' },
    ];

    const getCurrentData = () => {
        if (activeTab === 'Dia') return dataDia;
        if (activeTab === 'Semana') return dataSemana;
        return dataMes
    };

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);

    const loadReports = async () => {
        try {
            const response = await api.get('/reports/daily');
            setStats(response.data);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadReports();
        }, [])
    );

    if (loading) return <Text>Carregando...</Text>;

    const renderTooltip = (item: any, index: number) => {
        const isVenda = index % 2 === 0;
        const baseIndex = isVenda ? index : index - 1;
        const currentData = getCurrentData();

        const label = currentData[baseIndex].label;
        const vendaValue = currentData[baseIndex].value;
        const gastoValue = currentData[baseIndex + 1].value;

        return (
            <View style={styles.tooltipContainer}>
                <Text style={styles.tooltipTitle}>{label}</Text>
                <Text style={styles.tooltipVendas}>Vendas: {vendaValue}</Text>
                <Text style={styles.tooltipGastos}>Gastos: {gastoValue}</Text>
            </View>
        );
    };


    return(
        <SafeAreaProvider style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.title}>Relatórios</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Abas de Navegação (Tabs) */}
                <View style={styles.tabContainer}>
                    {['Dia', 'Semana', 'Mês'].map((tab) => (
                        <TouchableOpacity 
                            key={tab} 
                            style={[styles.tabBtn, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab as any)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Seção do Gráfico */}
                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Vendas vs Gastos por {activeTab.toLowerCase()}</Text>
                    
                    <View style={styles.chartWrapper}>
                        <BarChart
                            data={getCurrentData()}
                            barWidth={12}
                            spacing={8}
                            roundedTop
                            xAxisThickness={1}
                            yAxisThickness={0}
                            yAxisTextStyle={{color: '#828489', fontSize: 12}}
                            noOfSections={4}
                            maxValue={activeTab === 'Mês' ? 14000 : activeTab === 'Semana' ? 3200 : 800}
                            renderTooltip={renderTooltip}
                            autoCenterTooltip
                            isAnimated
                        />
                    </View>

                    <View style={styles.legendContainer}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendColor, {backgroundColor: '#4963E4'}]} />
                            <Text style={[styles.legendText, {color: '#4963E4'}]}>Vendas</Text>
                        </View>

                        <View style={styles.legendItem}>
                            <View style={[styles.legendColor, {backgroundColor: '#EF4444'}]} />
                            <Text style={[styles.legendText, {color: '#EF4444'}]}>Gastos</Text>
                        </View>
                    </View>
                </View>

                {/* Seção de Resultados */}
                <Text style={styles.sectionTitle}>Resultado do mês</Text>
                
                <View style={styles.resultCard}>
                    <Text style={[styles.resultValue, { color: '#EF4444' }]}>
                        R$ {stats?.summary.totalGasto.toFixed(2)}
                    </Text>
                </View>
                
                <View style={styles.resultCard}>
                    <Text style={[styles.resultValue, { color: '#10B981' }]}>
                        R$ {stats?.summary.totalVendido.toFixed(2)}
                    </Text>
                </View>

                <View style={styles.resultCard}>
                    <Text style={[styles.resultValue, { color: '#4963E4' }]}>
                        R$ {stats?.summary.lucro.toFixed(2)}
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },

    header: {
        padding: 20,
        paddingTop: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051D3B',
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Espaço para a barra inferior (TabNavigator)
    },

    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#EEF0F2',
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
    },

    tabBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },

    activeTab: {
        backgroundColor: '#FFF',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    tabText: {
        fontSize: 15,
        color: '#828489',
        fontWeight: '600',
    },

    activeTabText: {
        color: '#051D3B',
    },
    
    chartCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 25,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },

    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#051D3B',
        marginBottom: 20,
    },

    chartWrapper: {
        alignItems: 'center',
        marginLeft: -10, // Ajuste fino para alinhar o gráfico
    },

    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },

    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
    },

    legendColor: {
        width: 16,
        height: 12,
        borderRadius: 2,
        marginRight: 8,
    },

    legendText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    
    tooltipContainer: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        marginBottom: 10,
    },

    tooltipTitle: {
        fontWeight: 'bold',
        color: '#051D3B',
        marginBottom: 5,
    },

    tooltipVendas: {
        color: '#4963E4',
        fontSize: 13,
    },

    tooltipGastos: {
        color: '#EF4444',
        fontSize: 13,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#051D3B',
        marginBottom: 15,
    },

    resultCard: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 5,
    },

    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    resultInfo: {
        marginLeft: 15,
    },

    resultLabel: {
        fontSize: 13,
        color: '#828489',
        marginBottom: 4,
    },

    resultValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})