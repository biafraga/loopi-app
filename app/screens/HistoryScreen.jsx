import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../components/Menu";


const DARK_PRIMARY= "#0D0F1A";
const CARD= "#141629";
const BORDER= "#1C1F38";
const PRIMARY= "#C8F135";
const DANGER = "#FF5252"; // Vermelho (Atrasos)
const INFO = "#6366F1"; // Azul/Roxo (Adiantado)
const SECONDARY= "#6366F1";
const TEXT_COLOR= "#F4F4FF";
const FADED_TEXT_COLOR= "#ACACAC";

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

    // Função auxiliar que decide as cores da etiqueta (badge) baseada no status
    const getBadgeStyle = (status) => {
        switch (status) {
            case "late":
                return { backgroundColor: "rgba(255, 82, 82, 0.1)", color: DANGER };
            case "early":
                return { backgroundColor: "rgba(99, 102, 241, 0.1)", color: INFO };
            case "on_time":
            default:
                return { backgroundColor: "rgba(200, 241, 53, 0.1)", color: PRIMARY };
        }
    };

    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.monthText}>{summary.month}</Text>
                <Text style={styles.titleText}>Histórico</Text>
            </View>

            <View style={styles.summaryRow}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Viagens</Text>
                    <Text style={[styles.summaryValue, { color: TEXT_COLOR }]}>{summary.totalTrips}</Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>No prazo</Text>
                    <Text style={[styles.summaryValue, { color: PRIMARY }]}>{summary.onTime}</Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Atrasos</Text>
                    <Text style={[styles.summaryValue, { color: DANGER }]}>{summary.late}</Text>
                </View>
            </View>

            {/* LISTA DE HISTÓRICO */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {historyData.map((item) => {
                    // Pega as cores certas pra esse item específico
                    const badgeStyle = getBadgeStyle(item.status);

                    return (
                        <View key={item.id} style={styles.historyCard}>
                            <View style={styles.cardInfo}>
                                <Text style={styles.dateText}>{item.date}</Text>
                                <Text style={styles.detailsText}>{item.details}</Text>
                            </View>
                            
                            {/* ETIQUETA / BADGE */}
                            <View style={[styles.badge, { backgroundColor: badgeStyle.backgroundColor }]}>
                                <Text style={[styles.badgeText, { color: badgeStyle.color }]}>
                                    {item.statusText}
                                </Text>
                            </View>
                        </View>
                    );
                })}
                
                {/* Espaçamento extra no fim pra Nav Bar não tampar o último item */}
                <View style={{ height: 100 }} /> 
            </ScrollView>

            <Menu activeTab="history" />

        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: DARK_PRIMARY,
    },

    header: {
        paddingHorizontal: 30,
        paddingTop: 30,
        paddingBottom: 20,
    },

    monthText: {
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

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        marginBottom: 24,
    },

    summaryCard: {
        backgroundColor: CARD,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: "center",
        flex: 1, // Faz os 3 cards dividirem o espaço igualmente
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: BORDER,
    },

    summaryLabel: {
        color: FADED_TEXT_COLOR,
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
        backgroundColor: CARD,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: BORDER,
    },

    cardInfo: {
        flex: 1,
        paddingRight: 12,
    },

    dateText: {
        color: TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
        marginBottom: 4,
    },

    detailsText: {
        color: FADED_TEXT_COLOR,
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
    }

});