import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiMascot from "../components/LoopiMascot"; // Nosso mascote oficial importado!

const DARK_PRIMARY = "#0D0F1A";
const CARD = "#141629";
const BORDER = "#1C1F38";
const PRIMARY = "#C8F135";
const TEXT_COLOR = "#F4F4FF";
const FADED_TEXT_COLOR = "#ACACAC";

export default function LoopStartedScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
                
                <View style={styles.centerStage}>
                    <LoopiMascot state="normal" size={140} />
                    <Text style={styles.title}>Boa viagem! 🚌</Text>
                </View>

                {/* CARD DE SUCESSO - SAÍDA REGISTRADA */}
                <View style={styles.registeredCard}>
                    <Text style={styles.registeredLabel}>SAÍDA REGISTRADA ÀS</Text>
                    <Text style={styles.registeredTime}>5:10</Text>
                </View>

                <Text style={styles.infoText}>
                    O Loopi vai detectar sua chegada automaticamente. Boa viagem!
                </Text>

                {/* CARDS DE RESUMO MENORES */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Chegada prevista</Text>
                    <Text style={styles.summaryValue}>7:40</Text>
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Trajeto</Text>
                    <View style={styles.routeRow}>
                        <Text style={styles.routeTextPrimary}>Barra de Maricá</Text>
                        <Feather name="arrow-right" size={12} color={PRIMARY} style={{ marginHorizontal: 6 }} />
                        <Text style={styles.routeTextPrimary}>Centro RJ</Text>
                    </View>
                </View>

            </View>

            {/* BOTÃO FOOTER (OUTLINE) */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.outlineButton}>
                    <Text style={styles.outlineButtonText}>Ver loop ativo</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: DARK_PRIMARY,
        justifyContent: "space-between",
    },

    content: {
        flex: 1,
        paddingHorizontal: 30,
        alignItems: "center",
        justifyContent: "center", 
    },

    centerStage: {
        alignItems: "center",
        marginBottom: 24,
    },

    title: {
        color: TEXT_COLOR,
        fontSize: 24,
        fontFamily: "Nunito_900Black",
        marginTop: 16,
    },

    registeredCard: {
        backgroundColor: "rgba(200, 241, 53, 0.05)",
        borderWidth: 1,
        borderColor: PRIMARY,
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 40,
        alignItems: "center",
        marginBottom: 24,
        
    },

    registeredLabel: {
        color: PRIMARY,
        fontSize: 11,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 8,
    },

    registeredTime: {
        color: PRIMARY,
        fontSize: 40,
        fontFamily: "Nunito_900Black",
    },

    infoText: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 32,
    },

    summaryCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: CARD,
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 12,
        padding: 16,
        width: "100%",
        marginBottom: 12,
    },

    summaryLabel: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
    },

    summaryValue: {
        color: TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    },

    routeRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    routeTextPrimary: {
        color: PRIMARY,
        fontSize: 11,
        fontFamily: "DMSans_700Bold",
    },

    footer: {
        paddingHorizontal: 30,
        paddingBottom: 40,
    },

    outlineButton: {
        borderWidth: 1,
        borderColor: "#2A2D4A",
        borderRadius: 24,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
    },

    outlineButtonText: {
        color: FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    }
});