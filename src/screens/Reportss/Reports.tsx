import React, { useState, useCallback, useMemo } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart } from "react-native-gifted-charts";
import { api } from "../../services/api";
import { ScreenHeader } from "../../components/ScreenHeader";
import { formatBRL } from "../../utils/money";
import { colors, spacing, radius, type } from "../../theme";

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

// Cores do gráfico (sobre o card escuro)
const SALES_COLOR = colors.lime;
const EXPENSES_COLOR = colors.dangerOnInk;

const SCREEN_PADDING = spacing.xl;
const CARD_PADDING = spacing.lg;
const Y_AXIS_LABEL_WIDTH = 44;

export default function Reports() {
    const navigation = useNavigation();
    const { width: screenWidth } = useWindowDimensions();
    const [activeTab, setActiveTab] = useState<TabType>("Dia");
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<ReportResponse | null>(null);

    const chartWidth = screenWidth - SCREEN_PADDING * 2 - CARD_PADDING * 2 - Y_AXIS_LABEL_WIDTH;

    const buildChartData = (
        source?: Array<{ label: string; vendas: number; gastos: number }>
    ): ChartItem[] => {
        if (!source || source.length === 0) {
            return [];
        }

        return source.flatMap((item) => [
            {
                value: Math.max(0, Number(item.vendas ?? 0)),
                label: item.label,
                frontColor: SALES_COLOR,
                spacing: 4,
                labelTextStyle: {
                    color: colors.onInkSoft,
                    fontSize: 11,
                },
            },
            {
                value: Math.max(0, Number(item.gastos ?? 0)),
                frontColor: EXPENSES_COLOR,
            },
        ]);
    };

    const chartDataByTab = useMemo(() => {
        return {
            Dia: buildChartData(stats?.chartData?.dia),
            Semana: buildChartData(stats?.chartData?.semana),
            Mês: buildChartData(stats?.chartData?.mes),
        };
    }, [stats]);

    const currentData = chartDataByTab[activeTab];

    const getCurrentMaxValue = () => {
        const values = currentData.map((item) => Number(item.value) || 0);
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

    const renderTooltip = (_item: ChartItem, index: number) => {
        const isVenda = index % 2 === 0;
        const baseIndex = isVenda ? index : index - 1;

        const currentLabel = currentData[baseIndex]?.label ?? "";
        const vendaValue = currentData[baseIndex]?.value ?? 0;
        const gastoValue = currentData[baseIndex + 1]?.value ?? 0;

        return (
            <View style={styles.tooltipContainer}>
                <Text style={styles.tooltipTitle}>{currentLabel}</Text>
                <Text style={styles.tooltipLine}>Vendas  {formatBRL(vendaValue)}</Text>
                <Text style={styles.tooltipLine}>Gastos  {formatBRL(gastoValue)}</Text>
            </View>
        );
    };

    const lucro = stats?.summary?.lucro ?? 0;
    const groupCount = currentData.length / 2;
    // Distribui os grupos de barras na largura disponível.
    const barWidth = 12;
    const groupSpacing = groupCount > 0
        ? Math.max(10, Math.min(28, (chartWidth - 20 - groupCount * (barWidth * 2 + 4)) / groupCount))
        : 18;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <ScreenHeader eyebrow="Visão geral" title="Relatórios" onBack={() => navigation.goBack()} />

                <View style={styles.content}>
                    {/* Seletor de período */}
                    <View style={styles.tabContainer} accessibilityRole="tablist">
                        {(["Dia", "Semana", "Mês"] as TabType[]).map((tab) => {
                            const active = activeTab === tab;
                            return (
                                <Pressable
                                    key={tab}
                                    style={[styles.tabBtn, active && styles.activeTab]}
                                    onPress={() => setActiveTab(tab)}
                                    accessibilityRole="tab"
                                    accessibilityState={{ selected: active }}
                                >
                                    <Text style={[styles.tabText, active && styles.activeTabText]}>{tab}</Text>
                                </Pressable>
                            );
                        })}
                    </View>

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color={colors.ink} />
                            <Text style={styles.loadingText}>Carregando relatórios...</Text>
                        </View>
                    ) : (
                        <>
                            <View style={styles.chartCard}>
                                <View style={styles.chartHeader}>
                                    <Text style={styles.chartTitle}>Vendas vs gastos</Text>
                                    <View style={styles.legendContainer}>
                                        <View style={styles.legendItem}>
                                            <View style={[styles.legendColor, { backgroundColor: SALES_COLOR }]} />
                                            <Text style={styles.legendText}>Vendas</Text>
                                        </View>
                                        <View style={styles.legendItem}>
                                            <View style={[styles.legendColor, { backgroundColor: EXPENSES_COLOR }]} />
                                            <Text style={styles.legendText}>Gastos</Text>
                                        </View>
                                    </View>
                                </View>

                                {currentData.length === 0 ? (
                                    <View style={styles.chartEmpty}>
                                        <Text style={styles.chartEmptyText}>Sem movimento nesse período.</Text>
                                    </View>
                                ) : (
                                    <BarChart
                                        data={currentData}
                                        width={chartWidth}
                                        height={200}
                                        barWidth={barWidth}
                                        spacing={groupSpacing}
                                        initialSpacing={10}
                                        endSpacing={10}
                                        barBorderTopLeftRadius={4}
                                        barBorderTopRightRadius={4}
                                        xAxisThickness={1}
                                        xAxisColor={colors.inkRaised}
                                        yAxisThickness={0}
                                        yAxisColor="transparent"
                                        yAxisLabelWidth={Y_AXIS_LABEL_WIDTH}
                                        noOfSections={4}
                                        maxValue={getCurrentMaxValue()}
                                        yAxisTextStyle={styles.axisText}
                                        xAxisLabelTextStyle={styles.axisText}
                                        rulesColor={colors.inkRaised}
                                        rulesType="solid"
                                        disableScroll
                                        isAnimated
                                        animationDuration={400}
                                        renderTooltip={renderTooltip}
                                        autoCenterTooltip
                                    />
                                )}
                            </View>

                            <Text style={styles.sectionTitle}>Resultado do mês</Text>

                            <View style={styles.group}>
                                <ResultRow label="Total vendido" value={formatBRL(stats?.summary?.totalVendido ?? 0)} />
                                <ResultRow
                                    label="Total gasto (compras)"
                                    value={`− ${formatBRL(stats?.summary?.totalGasto ?? 0)}`}
                                    negative
                                />
                                <View style={styles.profitRow}>
                                    <Text style={styles.profitLabel}>Lucro</Text>
                                    <Text
                                        style={[styles.profitValue, lucro < 0 && styles.profitNegative]}
                                        numberOfLines={1}
                                        adjustsFontSizeToFit
                                    >
                                        {formatBRL(lucro)}
                                    </Text>
                                    <Text style={styles.profitHint}>vendas − gastos</Text>
                                </View>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const ResultRow = ({ label, value, negative }: { label: string; value: string; negative?: boolean }) => (
    <View style={styles.resultRow}>
        <Text style={styles.resultLabel}>{label}</Text>
        <Text style={[styles.resultValue, negative && styles.resultNegative]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.paper,
    },

    scrollContent: {
        paddingBottom: spacing.xxxl,
    },

    content: {
        paddingHorizontal: SCREEN_PADDING,
    },

    loadingContainer: {
        alignItems: "center",
        paddingVertical: spacing.xxxl * 2,
        gap: spacing.md,
    },

    loadingText: {
        ...type.caption,
    },

    tabContainer: {
        flexDirection: "row",
        backgroundColor: colors.sunken,
        borderRadius: radius.md,
        borderCurve: 'continuous',
        padding: 4,
        marginBottom: spacing.md,
    },

    tabBtn: {
        flex: 1,
        paddingVertical: spacing.sm + 2,
        alignItems: "center",
        borderRadius: radius.sm,
        borderCurve: 'continuous',
    },

    activeTab: {
        backgroundColor: colors.ink,
    },

    tabText: {
        fontSize: 14,
        color: colors.inkSoft,
        fontWeight: "600",
    },

    activeTabText: {
        color: colors.onInk,
    },

    chartCard: {
        backgroundColor: colors.ink,
        borderRadius: radius.xl,
        borderCurve: 'continuous',
        padding: CARD_PADDING,
        paddingTop: spacing.xl,
        overflow: 'hidden',
    },

    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },

    chartTitle: {
        ...type.subheading,
        color: colors.onInk,
    },

    chartEmpty: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },

    chartEmptyText: {
        ...type.caption,
        color: colors.onInkSoft,
    },

    axisText: {
        color: colors.onInkSoft,
        fontSize: 11,
    },

    legendContainer: {
        flexDirection: "row",
        gap: spacing.md,
    },

    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    legendColor: {
        width: 8,
        height: 8,
        borderRadius: 2,
    },

    legendText: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.onInk,
    },

    sectionTitle: {
        ...type.eyebrow,
        marginTop: spacing.xxl,
        marginBottom: spacing.sm,
    },

    group: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: colors.line,
        paddingHorizontal: spacing.lg,
    },

    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md + 2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.line,
    },

    resultLabel: {
        ...type.caption,
        fontSize: 14,
    },

    resultValue: {
        ...type.money,
    },

    resultNegative: {
        color: colors.danger,
    },

    profitRow: {
        paddingVertical: spacing.lg,
    },

    profitLabel: {
        ...type.eyebrow,
    },

    profitValue: {
        ...type.display,
        fontSize: 34,
        color: colors.ink,
        marginTop: spacing.xs,
    },

    profitNegative: {
        color: colors.danger,
    },

    profitHint: {
        ...type.caption,
        fontSize: 12,
        marginTop: 2,
    },

    tooltipContainer: {
        backgroundColor: colors.paper,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm + 2,
        borderRadius: radius.sm,
        minWidth: 140,
    },

    tooltipTitle: {
        ...type.bodyStrong,
        fontSize: 13,
        marginBottom: 4,
    },

    tooltipLine: {
        ...type.caption,
        fontSize: 12,
        color: colors.ink,
        fontVariant: ['tabular-nums'],
    },
});
