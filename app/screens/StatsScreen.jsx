import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../components/Menu";

const DARK_PRIMARY = "#0D0F1A";
const CARD = "#141629";
const BORDER = "#1C1F38";
const PRIMARY = "#C8F135";
const DANGER = "#FF5252";  // Vermelho para atrasos
const TEXT_COLOR = "#F4F4FF";
const FADED_TEXT_COLOR = "#ACACAC";

export default function StatsScreen() {
    // Estado para controlar qual aba de tempo está selecionada
    const [activeFilter, setActiveFilter] = useState("Mês");
    const filters = ["Mês", "Semana", "Total"];

    // MOCK DO GRÁFICO (De Segunda a Sexta)
    // O 'value' é a porcentagem da altura da barra (de 0 a 100)
    // O 'type' define a cor (se foi um dia rápido ou um dia com atraso)
    const chartData = [
        { id: "1", label: "S", value: 30, type: "good" },
        { id: "2", label: "T", value: 15, type: "bad" }, // Terça vermelha igual ao Figma
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

                {/* HERO CARD - VOCÊ ECONOMIZOU (Fundo Verde Neon!) */}
                <View style={styles.heroCard}>
                    <Text style={styles.heroCardLabel}>VOCÊ ECONOMIZOU ESSE MÊS</Text>
                    <Text style={styles.heroCardValue}>2h30m</Text>
                    <Text style={styles.heroCardSub}>de espera desnecessária</Text>
                </View>

                {/* GRÁFICO DE BARRAS NATIVO (Sem bibliotecas!) */}
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
                                        backgroundColor: item.type === "good" ? PRIMARY : DANGER 
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
                        <Text style={[styles.metricValue, { color: PRIMARY }]}>78%</Text>
                    </View>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>DIA MAIS LENTO</Text>
                        <Text style={[styles.metricValue, { color: DANGER }]}>Sex</Text>
                    </View>
                </View>

                {/* Espaçamento para o Menu não engolir o conteúdo */}
                <View style={{ height: 100 }} /> 
            </ScrollView>

            <Menu activeTab="stats" />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: DARK_PRIMARY,
    },

    header: {
        paddingHorizontal: 30,
        paddingTop: 30,
        paddingBottom: 20,
    },

    preTitle: {
        color: PRIMARY,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 4,
        textTransform: "uppercase",
    },

    titleText: {
        color: TEXT_COLOR,
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
        borderColor: PRIMARY,
        backgroundColor: "rgba(200, 241, 53, 0.1)", // Verde com opacidade
    },

    filterText: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
    },

    filterTextActive: {
        color: PRIMARY,
    },

    heroCard: {
        backgroundColor: PRIMARY,
        borderRadius: 24,
        padding: 24,
        alignItems: "center",
        marginBottom: 24,
    },

    heroCardLabel: {
        color: DARK_PRIMARY,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 8,
    },

    heroCardValue: {
        color: DARK_PRIMARY,
        fontSize: 48,
        fontFamily: "Nunito_900Black",
        marginBottom: 4,
    },

    heroCardSub: {
        color: DARK_PRIMARY,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
    },

    chartCard: {
        backgroundColor: CARD,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: BORDER,
        marginBottom: 24,
    },

    chartTitle: {
        color: FADED_TEXT_COLOR,
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
        color: FADED_TEXT_COLOR,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
    },

    metricsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    metricCard: {
        width: "48%",
        backgroundColor: CARD,
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: BORDER,
    },

    metricLabel: {
        color: FADED_TEXT_COLOR,
        fontSize: 11,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 8,
    },
    
    metricValue: {
        fontSize: 32,
        fontFamily: "Nunito_900Black",
    }
});