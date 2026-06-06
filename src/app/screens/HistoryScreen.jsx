import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme/colors";

export default function HistoryScreen(){
    //MOCK DE DADOS
    const [historyData] = useState([
        { id: "1", date: "Segunda-feira (09/03)", details: "Saída 05:12 · Chegada 6:31 → 1h19m", status: "on_time", statusText: "No prazo" },
        { id: "2", date: "Terça-feira (10/03)", details: "Saída 05:10 · Chegada 6:48 → 1h38m", status: "late", statusText: "+15 min" },
        { id: "3", date: "Quarta-feira (11/03)", details: "Saída 05:08 · Chegada 6:29 → 1h21m", status: "on_time", statusText: "No prazo" },
        { id: "4", date: "Quinta-feira (12/03)", details: "Saída 05:15 · Chegada 6:34 → 1h22m", status: "on_time", statusText: "No prazo" },
        { id: "5", date: "Sexta-feira (13/03)", details: "Saída 05:10 · Chegada 6:32 → 1h13m", status: "early", statusText: "-6 min" },
    ]);

    // Resumo do mês (Também viria do Back-end no futuro)
    const summary = { month: "MARÇO 2025", totalTrips: 18, onTime: 14, late: 4 };

    const isColdStart = false; // Mude para true para ver a tela zerada!
    const [activeFilter, setActiveFilter] = useState("all");
    const filteredData = historyData.filter(item => activeFilter === "all" || item.status === activeFilter);

    // Função auxiliar que decide as cores da etiqueta (badge) baseada no status
    const getBadgeStyle = (status) => {
        switch (status) {
            case "late":
                return { backgroundColor: "rgba(255, 82, 82, 0.1)", color: colors.DANGER };
            case "early":
                return { backgroundColor: "rgba(99, 102, 241, 0.1)", color: colors.INFO };
            case "on_time":
            default:
                return { backgroundColor: "rgba(200, 241, 53, 0.1)", color: colors.PRIMARY };
        }
    };

    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.monthText}>{isColdStart ? "BEM-VINDA" : summary.month}</Text>
                <Text style={styles.titleText}>Histórico</Text>
            </View>

            {isColdStart ? (
                // TELA VAZIA (COLD START)
                <View style={styles.emptyStateContainer}>
                    <Feather name="map" size={48} color={colors.BORDER} />
                    <Text style={styles.emptyStateTitle}>Nenhuma viagem ainda</Text>
                    <Text style={styles.emptyStateText}>
                        Quando você começar a usar o Loopi, seus trajetos e atrasos ficarão salvos aqui.
                    </Text>
                </View>
            ) : (
                // TELA CHEIA (USUÁRIO ATIVO)
                <>
                    <View style={styles.summaryRow}>
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryLabel}>Viagens</Text>
                            <Text style={[styles.summaryValue, { color: colors.TEXT_COLOR }]}>{summary.totalTrips}</Text>
                        </View>
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryLabel}>No prazo</Text>
                            <Text style={[styles.summaryValue, { color: colors.PRIMARY }]}>{summary.onTime}</Text>
                        </View>
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryLabel}>Atrasos</Text>
                            <Text style={[styles.summaryValue, { color: colors.DANGER }]}>{summary.late}</Text>
                        </View>
                    </View>

                    {/* FILTROS */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
                        <TouchableOpacity 
                            style={[styles.filterChip, activeFilter === "all" && styles.filterChipActive]}
                            onPress={() => setActiveFilter("all")}>
                            <Text style={[styles.filterText, activeFilter === "all" && styles.filterTextActive]}>Todos</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[styles.filterChip, activeFilter === "on_time" && styles.filterChipActive]}
                            onPress={() => setActiveFilter("on_time")}>
                            <Text style={[styles.filterText, activeFilter === "on_time" && styles.filterTextActive]}>No Prazo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.filterChip, activeFilter === "late" && styles.filterChipActive]}
                            onPress={() => setActiveFilter("late")}>
                            <Text style={[styles.filterText, activeFilter === "late" && styles.filterTextActive]}>Atrasos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.filterChip, activeFilter === "early" && styles.filterChipActive]}
                            onPress={() => setActiveFilter("early")}>
                            <Text style={[styles.filterText, activeFilter === "early" && styles.filterTextActive]}>Adiantados</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    {/* LISTA DE HISTÓRICO FILTRADA */}
                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {filteredData.map((item) => {
                            const badgeStyle = getBadgeStyle(item.status);
                            return (
                                <View key={item.id} style={styles.historyCard}>
                                    <View style={styles.cardInfo}>
                                        <Text style={styles.dateText}>{item.date}</Text>
                                        <Text style={styles.detailsText}>{item.details}</Text>
                                    </View>
                                    <View style={[styles.badge, { backgroundColor: badgeStyle.backgroundColor }]}>
                                        <Text style={[styles.badgeText, { color: badgeStyle.color }]}>{item.statusText}</Text>
                                    </View>
                                </View>
                            );
                        })}
                        <View style={{ height: 100 }} /> 
                    </ScrollView>
                </>
            )}
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.DARK_PRIMARY,
    },

    header: {
        paddingHorizontal: 30,
        paddingTop: 30,
        paddingBottom: 20,
    },

    monthText: {
        color: colors.PRIMARY,
        fontSize: 12,
        fontFamily: "DMSans_400Regular",
        letterSpacing: 1,
        marginBottom: 4,
        textTransform: "uppercase",
    },

    titleText: {
        color: colors.TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        marginBottom: 24,
    },

    summaryCard: {
        backgroundColor: colors.CARD,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: "center",
        flex: 1, // Faz os 3 cards dividirem o espaço igualmente
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: colors.BORDER,
    },

    summaryLabel: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 11,
        fontFamily: "DMSans_700Bold",
        marginBottom: 8,
    },

    summaryValue: {
        fontSize: 24,
        fontFamily: "Nunito_900Black",
    },

    content: {
        flex: 1,
        paddingHorizontal: 30,
    },

    historyCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.CARD,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.BORDER,
    },

    cardInfo: {
        flex: 1,
        paddingRight: 12,
    },

    dateText: {
        color: colors.TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
        marginBottom: 4,
    },

    detailsText: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 11,
        fontFamily: "DMSans_400Regular",
    },

    badge: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    
    badgeText: {
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
    },

    filterRow: {
        flexDirection: "row",
        paddingHorizontal: 30,
        marginBottom: 20,
        maxHeight: 32, // Impede que o scrollview roube espaço
    },
    filterChip: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.BORDER,
        marginRight: 8,
        justifyContent: "center",
    },
    filterChipActive: {
        backgroundColor: colors.PRIMARY,
        borderColor: colors.PRIMARY,
    },
    filterText: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
    },
    filterTextActive: {
        color: colors.DARK_PRIMARY,
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