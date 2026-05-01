import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import LoopiMascot from "../components/LoopiMascot";

const DARK_PRIMARY = "#0D0F1A";
const CARD = "#141629";
const BORDER = "#1C1F38";
const PRIMARY = "#C8F135";
const DANGER = "#FF5252";
const TEXT_COLOR = "#F4F4FF";
const FADED_TEXT_COLOR = "#ACACAC";

export default function ArrivalScreen() {
    // Array com os dias no plural para encaixar certinho na frase
    const diasDaSemana = ["domingos", "segundas", "terças", "quartas", "quintas", "sextas", "sábados"];
    
    // new Date().getDay() retorna um número de 0 (Domingo) a 6 (Sábado)
    const diaAtual = diasDaSemana[new Date().getDay()];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
                
                <View style={styles.centerStage}>
                    <LoopiMascot state="chegou" size={140} />
                    <Text style={styles.title}>Chegou! 🎉</Text>
                    <Text style={styles.subtitle}>Centro RJ 7:44</Text>
                </View>

                <View style={styles.metricsContainer}>
                    <View style={styles.metricBox}>
                        <Text style={styles.metricLabel}>DURAÇÃO</Text>
                        <Text style={styles.metricValue}>18</Text>
                    </View>
                    <View style={styles.metricBox}>
                        <Text style={styles.metricLabel}>PREVISTO</Text>
                        <Text style={styles.metricValue}>14</Text>
                    </View>
                    <View style={styles.metricBox}>
                        <Text style={styles.metricLabel}>DIFERENÇA</Text>
                        <Text style={[styles.metricValue, { color: DANGER }]}>+4min</Text>
                    </View>
                </View>

                {/* TEXTO DINÂMICO USANDO A VARIÁVEL diaAtual */}
                <Text style={styles.infoText}>
                    Viagem salva! Isso vai melhorar as{"\n"}previsões das próximas {diaAtual}.
                </Text>

            </View>

            <View style={styles.footer}>
                <LoopiButton 
                    textButton="Ver histórico" 
                    onPress={() => console.log("Navegar para o histórico")} 
                />
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
        marginBottom: 40,
    },

    title: {
        color: TEXT_COLOR,
        fontSize: 32,
        fontFamily: "Nunito_900Black",
        marginTop: 8,
        marginBottom: 8,
    },

    subtitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
    },

    metricsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 32,
    },

    metricBox: {
        width: "31%",
        backgroundColor: CARD,
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
    },

    metricLabel: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 0.5,
        marginBottom: 8,
    },

    metricValue: {
        color: TEXT_COLOR,
        fontSize: 24,
        fontFamily: "Nunito_900Black",
    },

    infoText: {
        color: PRIMARY,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        textAlign: "center",
        lineHeight: 20,
    },
    
    footer: {
        paddingHorizontal: 30,
        paddingBottom: 40,
    }
});