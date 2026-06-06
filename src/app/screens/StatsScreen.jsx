import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme/colors";

export default function StatsScreen() {
    // Estado para controlar qual aba de tempo está selecionada
    const [activeFilter, setActiveFilter] = useState("Mês");
    const filters = ["Mês", "Semana", "Total"];
    const isColdStart = false;

    // MOCK DO GRÁFICO (De Segunda a Sexta)
    // O 'value' é a porcentagem da altura da barra (de 0 a 100)
    // O 'type' define a cor (se foi um dia rápido ou um dia com atraso)
    const chartData = [
        { id: "1", label: "S", value: 30, type: "good" },
        { id: "2", label: "T", value: 15, type: "bad" },
        { id: "3", label: "Q", value: 80, type: "good" },
        { id: "4", label: "Q", value: 25, type: "good" },
        { id: "5", label: "S", value: 35, type: "good" },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            
            {/* CABEÇALHO */}
            <View style={styles.header}>
                <Text style={styles.preTitle}>SEU DESEMPENHO</Text>
                <Text style={styles.titleText}>Estatísticas</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                
                {isColdStart ? (
                    // COLD START
                    <View style={styles.emptyStateContainer}>
                        <Feather name="bar-chart-2" size={48} color={colors.BORDER} />
                        <Text style={styles.emptyStateTitle}>Ainda sem dados</Text>
                        <Text style={styles.emptyStateText}>
                            Continue a usar o Loopi nos seus trajetos para começarmos a gerar as suas estatísticas de economia de tempo.
                        </Text>
                    </View>
                ) : (
                    // USUÁRIO ATIVO
                    <>
                        {/* FILTROS DE TEMPO (Mês / Semana / Total) */}
                        <View style={styles.filtersRow}>
                            {filters.map(filter => (
                                <TouchableOpacity 
                                    key={filter}
                                    style={[
                                        styles.filterButton, 
                                        activeFilter === filter && styles.filterButtonActive
                                    ]}
                                    onPress={() => setActiveFilter(filter)}
                                >
                                    <Text style={[
                                        styles.filterText,
                                        activeFilter === filter && styles.filterTextActive
                                    ]}>
                                        {filter}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* HERO CARD */}
                        <View style={styles.heroCard}>
                            <Text style={styles.heroCardLabel}>POUPOU ESTE MÊS</Text>
                            <Text style={styles.heroCardValue}>2h30m</Text>
                            <Text style={styles.heroCardSub}>de espera desnecessária</Text>
                        </View>

                        {/* GRÁFICO DE BARRAS (Sem bibliotecas) */}
                        <View style={styles.chartCard}>
                            <Text style={styles.chartTitle}>TEMPO MÉDIO POR DIA</Text>
                            
                            <View style={styles.chartContainer}>
                                {chartData.map((item) => (
                                    <View key={item.id} style={styles.barWrapper}>
                                        {/* A Barra Visual */}
                                        <View style={[
                                            styles.bar, 
                                            { 
                                                height: `${item.value}%`,
                                                backgroundColor: item.type === "good" ? colors.PRIMARY : colors.DANGER 
                                            }
                                        ]} />
                                        {/* Letra do dia da semana (S, T, Q...) */}
                                        <Text style={styles.barLabel}>{item.label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* CARDS MENORES DA BASE */}
                        <View style={styles.metricsRow}>
                            <View style={styles.metricCard}>
                                <Text style={styles.metricLabel}>TAXA PONTUAL</Text>
                                <Text style={[styles.metricValue, { color: colors.PRIMARY }]}>78%</Text>
                            </View>
                            <View style={styles.metricCard}>
                                <Text style={styles.metricLabel}>DIA MAIS LENTO</Text>
                                <Text style={[styles.metricValue, { color: colors.DANGER }]}>Sex</Text>
                            </View>
                        </View>
                    </>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.DARK_PRIMARY,
    },

    header: {
        paddingHorizontal: 30,
        paddingTop: 30,
        paddingBottom: 20,
    },

    preTitle: {
        color: colors.PRIMARY,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 4,
        textTransform: "uppercase",
    },

    titleText: {
        color: colors.TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
    },

    content: {
        flex: 1,
        paddingHorizontal: 30,
    },

    filtersRow: {
        flexDirection: "row",
        marginBottom: 24,
    },

    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 12,
    },

    filterButtonActive: {
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        backgroundColor: "rgba(200, 241, 53, 0.1)", // Verde com opacidade
    },

    filterText: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
    },

    filterTextActive: {
        color: colors.PRIMARY,
    },

    heroCard: {
        backgroundColor: colors.PRIMARY,
        borderRadius: 24,
        padding: 24,
        alignItems: "center",
        marginBottom: 24,
    },

    heroCardLabel: {
        color: colors.DARK_PRIMARY,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 8,
    },

    heroCardValue: {
        color: colors.DARK_PRIMARY,
        fontSize: 48,
        fontFamily: "Nunito_900Black",
        marginBottom: 4,
    },

    heroCardSub: {
        color: colors.DARK_PRIMARY,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
    },

    chartCard: {
        backgroundColor: colors.CARD,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.BORDER,
        marginBottom: 24,
    },

    chartTitle: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 24,
    },

    chartContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        height: 120,
        paddingHorizontal: 8,
    },

    barWrapper: {
        alignItems: "center",
        height: "100%", 
        justifyContent: "flex-end",
    },

    bar: {
        width: 32,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        marginBottom: 8,
    },

    barLabel: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
    },

    metricsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    metricCard: {
        width: "48%",
        backgroundColor: colors.CARD,
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.BORDER,
    },

    metricLabel: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 11,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 8,
    },
    
    metricValue: {
        fontSize: 32,
        fontFamily: "Nunito_900Black",
    },

    emptyStateContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
        marginTop: 60,
    },
    emptyStateTitle: {
        color: colors.TEXT_COLOR,
        fontSize: 20,
        fontFamily: "Nunito_900Black",
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateText: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        textAlign: "center",
        lineHeight: 20,
    },
});