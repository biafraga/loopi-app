import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../components/Menu";

const DARK_PRIMARY = "#0D0F1A";
const CARD = "#141629";
const BORDER = "#1C1F38";
const PRIMARY = "#C8F135";
const DANGER = "#FF5252"; 
const TEXT_COLOR = "#F4F4FF";
const FADED_TEXT_COLOR = "#ACACAC";

export default function ActiveLoopScreen() {
    // Começando em 25min 
    const [seconds, setSeconds] = useState(25 * 60 + 25);
    
    // Simulação: A viagem total dura 2h10m (7800 segundos)
    const estimatedTotalSeconds = (2 * 3600) + (10 * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
        const s = (totalSeconds % 60).toString().padStart(2, "0");
        return `${h}:${m}:${s}`;
    };

    // Barra de progresso (Limitado a 100% para não vazar a barra)
    const progressPercentage = Math.min((seconds / estimatedTotalSeconds) * 100, 100);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                style={styles.content} 
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                
                {/* CABEÇALHO */}
                <View style={styles.header}>
                    <View style={styles.statusBadge}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>LOOP ATIVO</Text>
                    </View>
                    <Text style={styles.title}>Em trânsito</Text>
                </View>

                {/* CARD PRINCIPAL - CRONÔMETRO */}
                <View style={styles.timerCard}>
                    <Text style={styles.timerLabel}>TEMPO</Text>
                    
                    <Text style={styles.timerValue}>{formatTime(seconds)}</Text>
                    
                    <Text style={styles.timerSubtitle}>Saída registrada às 5:10</Text>

                    {/* BARRA DE PROGRESSO */}
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBarBackground}>
                            {/* Dinâmico e cresce com o tempo */}
                            <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
                        </View>
                        <View style={styles.progressLabels}>
                            <Text style={styles.progressText}>Barra de Maricá</Text>
                            <Text style={styles.progressText}>Centro RJ</Text>
                        </View>
                    </View>
                </View>

                {/* CARDS MENORES DE MÉTRICAS */}
                <View style={styles.metricsRow}>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>PREVISÃO{"\n"}CHEGADA</Text>
                        <Text style={styles.metricValue}>7:40</Text>
                    </View>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>MÉDIAS{"\n"}TERÇAS</Text>
                        <Text style={styles.metricValueSecondary}>1h57m</Text>
                    </View>
                </View>

                {/* BOTÃO MANUAL */}
                <TouchableOpacity style={styles.dangerButton}>
                    <Text style={styles.dangerButtonText}>Registrar chegada manualmente</Text>
                </TouchableOpacity>

            </ScrollView>

            <Menu activeTab="home" />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: DARK_PRIMARY,
    },

    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 40,
    },

    header: {
        marginBottom: 32,
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },

    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: PRIMARY,
        marginRight: 8,
    },

    statusText: {
        color: PRIMARY,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        letterSpacing: 1,
    },

    title: {
        color: TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
    },

    timerCard: {
        backgroundColor: CARD,
        borderWidth: 1,
        borderColor: PRIMARY,
        borderRadius: 16,
        padding: 30,
        alignItems: "center",
        marginBottom: 24,
    },

    timerLabel: {
        color: FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        letterSpacing: 1,
        marginBottom: 16,
    },

    timerValue: {
        color: PRIMARY,
        fontSize: 56,
        fontFamily: "Nunito_900Black",
        marginBottom: 16,
    },

    timerSubtitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        marginBottom: 32,
    },

    progressContainer: {
        width: "100%",
    },

    progressBarBackground: {
        height: 8,
        backgroundColor: BORDER,
        borderRadius: 4,
        marginBottom: 12,
        overflow: "hidden", 
    },

    progressBarFill: {
        height: "100%",
        backgroundColor: PRIMARY,
        borderRadius: 4,
    },

    progressLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    progressText: {
        color: FADED_TEXT_COLOR,
        fontSize: 11,
        fontFamily: "DMSans_700Bold",
    },

    metricsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
    },

    metricCard: {
        width: "48%",
        backgroundColor: CARD,
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    metricLabel: {
        color: FADED_TEXT_COLOR,
        fontSize: 11,
        fontFamily: "DMSans_700Bold",
        textAlign: "center",
        letterSpacing: 1,
        marginBottom: 12,
        lineHeight: 16,
    },

    metricValue: {
        color: TEXT_COLOR,
        fontSize: 26,
        fontFamily: "Nunito_900Black",
    },

    metricValueSecondary: {
        color: PRIMARY,
        fontSize: 26,
        fontFamily: "Nunito_900Black",
    },

    dangerButton: {
        borderWidth: 1,
        borderColor: DANGER,
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
    },

    dangerButtonText: {
        color: DANGER,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    }
});