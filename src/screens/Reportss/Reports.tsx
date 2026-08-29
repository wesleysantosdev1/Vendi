import React, { useState, useCallback, useMemo } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TrendingDown, TrendingUp, DollarSign } from "lucide-react-native";
import { BarChart } from "react-native-gifted-charts";
import { api } from "../../services/api";

type TabType = "Dia" | "Semana" | "Mês";

type ChartItem = {
    value: number;
    label?: string;
    frontColor: string;
    spacing?: number;
    labelTextStyle?: {
        color?: string;
        fontSize?: number;
    };
};

type ReportSummary = {
    totalGasto: number;
    totalVendido: number;
    lucro: number;
};

type ReportResponse = {
    summary: ReportSummary;
    chartData?: {
        dia?: Array<{ label: string; vendas: number; gastos: number }>;
        semana?: Array<{ label: string; vendas: number; gastos: number }>;
        mes?: Array<{ label: string; vendas: number; gastos: number }>;
    };
};

const PRIMARY_BLUE = "#4963E4";
const DANGER_RED = "#EF4444";
const SUCCESS_GREEN = "#22C55E";
const TEXT_DARK = "#051D3B";
const TEXT_MUTED = "#828489";
const BG_LIGHT = "#F8F9FA";
const CARD_BG = "#FFFFFF";
const TAB_BG = "#EEF0F2";
const GRID_COLOR = "#E5E7EB";

export default function Reports() {
    const [activeTab, setActiveTab] = useState<TabType>("Dia");
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<ReportResponse | null>(null);

    const formatCurrency = (value: number = 0) => {
        return value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const buildChartData = (
        source?: Array<{ label: string; vendas: number; gastos: number }>
    ): ChartItem[] => {
        if (!source || source.length === 0) {
            return [];
        }

        const normalized = source.flatMap((item) => [
            {
                value: Math.max(0, Number(item.vendas ?? 0)),
                label: item.label,
                frontColor: PRIMARY_BLUE,
                spacing: 18,
                labelTextStyle: {
                    color: TEXT_MUTED,
                    fontSize: 12,
                },
            },
            {
                value: Math.max(0, Number(item.gastos ?? 0)),
                frontColor: DANGER_RED,
            },
        ]);

        return normalized;
    };

    const chartDataByTab = useMemo(() => {
        return {
            Dia: buildChartData(stats?.chartData?.dia),
            Semana: buildChartData(stats?.chartData?.semana),
            Mês: buildChartData(stats?.chartData?.mes),
        };
    }, [stats]);

    const getCurrentData = () => {
        return chartDataByTab[activeTab];
    };

    const getCurrentMaxValue = () => {
        const values = getCurrentData().map((item) => Number(item.value) || 0);
        const max = Math.max(...values, 0);

        if (max <= 0) return 100;
        return Math.ceil(max * 1.25);
    };

    const loadReports = async () => {
        try {
            setLoading(true);
            const response = await api.get("/reports/daily");
            setStats(response.data);
        } catch (error) {
            console.log("Erro ao carregar relatórios:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadReports();
        }, [])
    );

    const renderTooltip = (item: ChartItem, index: number) => {
        const isVenda = index % 2 === 0;
        const baseIndex = isVenda ? index : index - 1;
        const currentData = getCurrentData();

        const currentLabel = currentData[baseIndex]?.label ?? "";
        const vendaValue = currentData[baseIndex]?.value ?? 0;
        const gastoValue = currentData[baseIndex + 1]?.value ?? 0;

        return (
            <View style={styles.tooltipContainer}>
                <Text style={styles.tooltipTitle}>{currentLabel}</Text>
                <Text style={styles.tooltipVendas}>Vendas: R$ {formatCurrency(vendaValue)}</Text>
                <Text style={styles.tooltipGastos}>Gastos: R$ {formatCurrency(gastoValue)}</Text>
            </View>
        );
    };

    if (loading) {
        return (
            <SafeAreaProvider style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={PRIMARY_BLUE} />
                    <Text style={styles.loadingText}>Carregando relatórios...</Text>
                </View>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Relatórios</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.tabContainer}>
                    {(["Dia", "Semana", "Mês"] as TabType[]).map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabBtn, activeTab === tab && styles.activeTab]}
                            activeOpacity={0.8}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Vendas vs Gastos por {activeTab.toLowerCase()}</Text>

                    <View style={styles.chartWrapper}>
                        <BarChart
                            data={getCurrentData()}
                            width={300}
                            height={220}
                            barWidth={14}
                            spacing={18}
                            initialSpacing={10}
                            endSpacing={10}
                            roundedTop
                            roundedBottom
                            xAxisThickness={1}
                            yAxisThickness={0}
                            noOfSections={4}
                            maxValue={getCurrentMaxValue()}
                            yAxisTextStyle={styles.yAxisText}
                            xAxisLabelTextStyle={styles.xAxisText}
                            rulesColor={GRID_COLOR}
                            hideRules={false}
                            xAxisColor={TEXT_MUTED}
                            yAxisColor="transparent"
                            disableScroll
                            isAnimated
                            animationDuration={400}
                            renderTooltip={renderTooltip}
                            autoCenterTooltip
                        />
                    </View>

                    <View style={styles.legendContainer}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: PRIMARY_BLUE }]} />
                            <Text style={[styles.legendText, { color: PRIMARY_BLUE }]}>Vendas</Text>
                        </View>

                        <View style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: DANGER_RED }]} />
                            <Text style={[styles.legendText, { color: DANGER_RED }]}>Gastos</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Resultado do mês</Text>

                <View style={styles.resultCard}>
                    <View style={[styles.iconBox, { backgroundColor: "#FEE2E2" }]}>
                        <TrendingDown size={22} color={DANGER_RED} />
                    </View>

                    <View style={styles.resultInfo}>
                        <Text style={styles.resultLabel}>Total gasto (compras)</Text>
                        <Text style={[styles.resultValue, { color: DANGER_RED }]}>
                            R$ {formatCurrency(stats?.summary?.totalGasto ?? 0)}
                        </Text>
                    </View>
                </View>

                <View style={styles.resultCard}>
                    <View style={[styles.iconBox, { backgroundColor: "#DCFCE7" }]}>
                        <TrendingUp size={22} color={SUCCESS_GREEN} />
                    </View>

                    <View style={styles.resultInfo}>
                        <Text style={styles.resultLabel}>Total vendido</Text>
                        <Text style={[styles.resultValue, { color: SUCCESS_GREEN }]}>
                            R$ {formatCurrency(stats?.summary?.totalVendido ?? 0)}
                        </Text>
                    </View>
                </View>

                <View style={styles.resultCard}>
                    <View style={[styles.iconBox, { backgroundColor: "#E0E7FF" }]}>
                        <DollarSign size={22} color={PRIMARY_BLUE} />
                    </View>

                    <View style={styles.resultInfo}>
                        <Text style={styles.resultLabel}>Lucro (vendas - gastos)</Text>
                        <Text style={[styles.resultValue, { color: PRIMARY_BLUE }]}>
                            R$ {formatCurrency(stats?.summary?.lucro ?? 0)}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_LIGHT,
        paddingTop: 12,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },

    loadingText: {
        marginTop: 12,
        fontSize: 15,
        color: TEXT_MUTED,
        fontWeight: "500",
    },

    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 8,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: TEXT_DARK,
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 110,
    },

    tabContainer: {
        flexDirection: "row",
        backgroundColor: TAB_BG,
        borderRadius: 16,
        padding: 4,
        marginBottom: 16,
    },

    tabBtn: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 12,
    },

    activeTab: {
        backgroundColor: CARD_BG,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },

    tabText: {
        fontSize: 15,
        color: TEXT_MUTED,
        fontWeight: "600",
    },

    activeTabText: {
        color: TEXT_DARK,
    },

    chartCard: {
        backgroundColor: CARD_BG,
        borderRadius: 20,
        padding: 18,
        marginBottom: 22,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        minHeight: 320,
    },

    chartTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: TEXT_DARK,
        marginBottom: 18,
    },

    chartWrapper: {
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 8,
    },

    yAxisText: {
        color: TEXT_MUTED,
        fontSize: 12,
    },

    xAxisText: {
        color: TEXT_MUTED,
        fontSize: 12,
    },

    legendContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },

    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 14,
    },

    legendColor: {
        width: 14,
        height: 14,
        borderRadius: 3,
        marginRight: 8,
    },

    legendText: {
        fontSize: 14,
        fontWeight: "600",
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: TEXT_DARK,
        marginBottom: 14,
    },

    resultCard: {
        backgroundColor: CARD_BG,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },

    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },

    resultInfo: {
        marginLeft: 14,
        flex: 1,
    },

    resultLabel: {
        fontSize: 13,
        color: TEXT_MUTED,
        marginBottom: 4,
    },

    resultValue: {
        fontSize: 18,
        fontWeight: "bold",
    },

    tooltipContainer: {
        backgroundColor: "#1F2937",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        minWidth: 130,
    },

    tooltipTitle: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 13,
        marginBottom: 6,
    },

    tooltipVendas: {
        color: "#93C5FD",
        fontSize: 12,
        marginBottom: 2,
    },

    tooltipGastos: {
        color: "#FCA5A5",
        fontSize: 12,
    },
});