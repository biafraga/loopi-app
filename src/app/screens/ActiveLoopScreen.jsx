import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme/colors";

export default function ActiveLoopScreen({navigation}) {
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
    
                <View style={styles.header}>
                    <View style={styles.statusBadge}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>LOOP ATIVO</Text>
                    </View>
                    <Text style={styles.title}>Em trânsito</Text>
                </View>

                {/* CARD PRINCIPAL COM CRONÔMETRO */}
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

                {/* CARDS DE MÉTRICAS */}
                <View style={styles.metricsRow}>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>PREVISÃO DE{"\n"}CHEGADA</Text>
                        <Text style={styles.metricValue}>7:40</Text>
                    </View>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>MÉDIAS{"\n"}TERÇAS</Text>
                        <Text style={styles.metricValueSecondary}>1h57m</Text>
                    </View>
                </View>

                {/* BOTÃO MANUAL */}
                {<TouchableOpacity style={styles.dangerButton} 
                    onPress={() => navigation.navigate("status", {
                    mascotState: "construcao",
                    title: "Página em Obras",
                    description: "Ainda estamos martelando os códigos por aqui. Volte em breve!",
                    buttonText: "Entendi",
                    action: "goBack"
                })}>
                    <Text style={styles.dangerButtonText}>Registrar chegada manualmente</Text>
                </TouchableOpacity>}

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.DARK_PRIMARY,
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
        backgroundColor: colors.PRIMARY,
        marginRight: 8,
    },

    statusText: {
        color: colors.PRIMARY,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        letterSpacing: 1,
    },

    title: {
        color: colors.TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
    },

    timerCard: {
        backgroundColor: colors.CARD,
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        borderRadius: 16,
        padding: 30,
        alignItems: "center",
        marginBottom: 24,
    },

    timerLabel: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        letterSpacing: 1,
        marginBottom: 16,
    },

    timerValue: {
        color: colors.PRIMARY,
        fontSize: 56,
        fontFamily: "Nunito_900Black",
        marginBottom: 16,
    },

    timerSubtitle: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        marginBottom: 32,
    },

    progressContainer: {
        width: "100%",
    },

    progressBarBackground: {
        height: 8,
        backgroundColor: colors.BORDER,
        borderRadius: 4,
        marginBottom: 12,
        overflow: "hidden", 
    },

    progressBarFill: {
        height: "100%",
        backgroundColor: colors.PRIMARY,
        borderRadius: 4,
    },

    progressLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    progressText: {
        color: colors.FADED_TEXT_COLOR,
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
        backgroundColor: colors.CARD,
        borderWidth: 1,
        borderColor: colors.BORDER,
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    metricLabel: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 11,
        fontFamily: "DMSans_700Bold",
        textAlign: "center",
        letterSpacing: 1,
        marginBottom: 12,
        lineHeight: 16,
    },

    metricValue: {
        color: colors.TEXT_COLOR,
        fontSize: 26,
        fontFamily: "Nunito_900Black",
    },

    metricValueSecondary: {
        color: colors.PRIMARY,
        fontSize: 26,
        fontFamily: "Nunito_900Black",
    },

    dangerButton: {
        borderWidth: 1,
        borderColor: colors.DANGER,
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
    },

    dangerButtonText: {
        color: colors.DANGER,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    }
});