import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme/colors";
import { isValidTime, maskTime } from "../utils/masks";

export default function ActiveLoopScreen({navigation}) {
    // ESTADOS DO MODAL E INPUT
    const [modalVisible, setModalVisible] = useState(false);
    const [arrivalTime, setArrivalTime] = useState("");

    // MOCK DA TELA: Centralizando os dados para manter a coerência
    const activeTrip = {
        startTime: "05:10",
        origin: "Barra de Maricá",
        destination: "Centro RJ",
        eta: "7:40",
        averageTime: "1h57m",
        isFirstTrip: false // Mude para true para simular o Cold Start das médias
    };
    
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

    // FUNÇÃO PARA MÁSCARA DO HORÁRIO (00:00)
    const handleTimeChange = (text) => {
        const formatted = maskTime(text);
        setArrivalTime(formatted);
    }

    // FUNÇÃO DE CONFIRMAÇÃO DO MODAL
    const handleConfirmArrival = () => {
        setModalVisible(false);
        setArrivalTime(""); // Limpa o input para a próxima vez
        // TODO: Aqui entrará o Axios para enviar o 'arrivalTime' pro Spring Boot
        navigation.navigate("arrival");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                style={styles.content} 
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
    
                <View style={styles.header}>
                    <View style={styles.headerTopRow}>
                        <View style={styles.statusBadge}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>LOOP ATIVO</Text>
                        </View>
                        
                        {/* BOTÃO PARA MINIMIZAR E VOLTAR PARA A HOME */}
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Feather name="x" size={28} color={colors.FADED_TEXT_COLOR} />
                        </TouchableOpacity>
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
                            <Text style={styles.progressText}>{activeTrip.origin}</Text>
                            <Text style={styles.progressText}>{activeTrip.destination}</Text>
                        </View>
                    </View>
                </View>

                {/* CARDS DE MÉTRICAS */}
                <View style={styles.metricsRow}>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>PREVISÃO DE{"\n"}CHEGADA</Text>
                        <Text style={styles.metricValue}>{activeTrip.eta}</Text>
                    </View>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>MÉDIAS{"\n"}TERÇAS</Text>
                        <Text style={styles.metricValueSecondary}>
                            {activeTrip.isFirstTrip ? "--" : activeTrip.averageTime}
                        </Text>
                    </View>
                </View>

                {/* BOTÃO MANUAL */}
                <TouchableOpacity 
                    style={styles.primaryButton} 
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.primaryButtonText}>Registrar chegada manualmente</Text>
                </TouchableOpacity>

                {/* BOTÃO DE CANCELAMENTO */}
                <TouchableOpacity style={styles.dangerButton} 
                // TODO (Integração): Fazer requisição para o Spring Boot cancelar o status no banco de dados
                    onPress={() => navigation.navigate("main")}>
                    <Text style={styles.dangerButtonText}>Cancelar Trajeto</Text>
                </TouchableOpacity>

            </ScrollView>

            {/* MODAL(CARD FLUTUANTE) */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalOverlay}
                >
                    {/* Área escura que fecha o modal ao clicar fora */}
                    <TouchableOpacity 
                        style={styles.modalDismiss} 
                        activeOpacity={1} 
                        onPress={() => setModalVisible(false)} 
                    />
                    
                    <View style={styles.modalCard}>
                        
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Chegou mais cedo?</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Feather name="x" size={24} color={colors.FADED_TEXT_COLOR} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalSubtitle}>
                            Informe o horário exato que você chegou no seu destino para o Loopi aprender sua rotina.
                        </Text>

                        <View style={styles.inputContainer}>
                            <Feather name="clock" size={20} color={colors.FADED_TEXT_COLOR} style={styles.inputIcon} />
                            <TextInput
                                style={styles.timeInput}
                                placeholder="00:00"
                                placeholderTextColor={colors.FADED_TEXT_COLOR}
                                keyboardType="numeric"
                                maxLength={5}
                                value={arrivalTime}
                                onChangeText={handleTimeChange}
                            />
                        </View>

                        <TouchableOpacity 
                            style={[
                                styles.confirmButton, 
                                !isValidTime(arrivalTime) && styles.confirmButtonDisabled
                            ]}
                            disabled={!isValidTime(arrivalTime)}
                            onPress={handleConfirmArrival}
                        >
                            <Text style={styles.confirmButtonText}>Confirmar horário</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </Modal>

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

    headerTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },

    primaryButton: {
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        marginBottom: 16,
    },

    primaryButtonText: {
        color: colors.PRIMARY,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
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
    },

   modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    modalDismiss: {
        position: "absolute",
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0,
    },

    modalCard: {
        backgroundColor: colors.DARK_PRIMARY,
        borderRadius: 24,
        padding: 24,
        width: "100%",
        borderWidth: 1,
        borderColor: colors.BORDER,
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },

    modalTitle: {
        color: colors.TEXT_COLOR,
        fontSize: 24,
        fontFamily: "Nunito_900Black",
    },

    modalSubtitle: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        lineHeight: 24,
        marginBottom: 32,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.CARD,
        borderWidth: 1,
        borderColor: colors.BORDER,
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 60,
        marginBottom: 32,
    },

    inputIcon: {
        marginRight: 12,
    },

    timeInput: {
        flex: 1,
        color: colors.TEXT_COLOR,
        fontSize: 18,
        fontFamily: "DMSans_700Bold",
    },

    confirmButton: {
        backgroundColor: colors.PRIMARY,
        borderRadius: 24,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
    },

    confirmButtonDisabled: {
        backgroundColor: colors.SECONDARY,
        opacity: 0.6, 
    },

    confirmButtonText: {
        color: colors.DARK_PRIMARY,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    },
});