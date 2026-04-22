import { Feather } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import LoopiMascot from "../components/LoopiMascot";

const DARK_PRIMARY = "#0D0F1A";
const CARD = "#141629";
const BORDER = "#1C1F38";
const PRIMARY = "#C8F135";
const TEXT_COLOR = "#F4F4FF";
const FADED_TEXT_COLOR = "#ACACAC";

export default function RouteConfirmationScreen({ 
    origin = "Não informado", 
    destination = "Não informado", 
    arrivalTime = "00:00", 
    days = "Dias úteis" 
}) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Feather name="chevron-left" size={24} color={FADED_TEXT_COLOR} />
                    <Text style={styles.backText}>NOVO TRAJETO</Text>
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <View style={styles.progressDot} />
                    <View style={styles.progressDot} />
                    <View style={[styles.progressDot, styles.activeDot]} />
                </View>
                <Text style={styles.stepText}>PASSO 3 DE 3</Text>
            </View>

            <ScrollView 
                style={styles.content} 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.mascotContainer}>
                    <LoopiMascot state="chegou" size={160} />
                </View>

                <Text style={styles.title}>Trajeto cadastrado!</Text>
                <Text style={styles.subtitle}>
                    O Loopi vai aprender seu padrão nas{"\n"}próximas viagens
                </Text>

                <View style={styles.summaryCard}>
                    <View style={styles.rowLabels}>
                        <Text style={styles.labelText}>ORIGEM</Text>
                        <Text style={styles.labelText}>DESTINO</Text>
                    </View>

                    <View style={styles.rowValues}>
                        <Text style={styles.valueText}>{origin}</Text>
                        
                        <View style={styles.dashedLineContainer}>
                            <View style={styles.dashedLine} />
                        </View>
                        
                        <Text style={styles.valueText}>{destination}</Text>
                    </View>

                    <Text style={styles.timeInfoText}>
                        Chegada desejada: {arrivalTime} · {days}
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <LoopiButton 
                    textButton="Próximo" 
                    onPress={() => console.log("Finalizar fluxo e ir para Home")}
                />
            </View>
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
        paddingTop: 20,
        paddingBottom: 20,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    backText: {
        color: FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        marginLeft: 10,
        letterSpacing: 0.5,
    },
    progressContainer: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 12,
    },
    progressDot: {
        height: 8,
        width: 16,
        backgroundColor: BORDER,
        borderRadius: 4,
    },
    activeDot: {
        width: 32,
        backgroundColor: PRIMARY,
    },
    stepText: {
        color: PRIMARY,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
    },
    scrollContent: {
        alignItems: "center",
        paddingBottom: 40,
    },
    mascotContainer: {
        marginTop: 20,
        marginBottom: 40,
    },
    title: {
        color: TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
        textAlign: "center",
        marginBottom: 12,
    },
    subtitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 40,
    },
    summaryCard: {
        width: "100%",
        backgroundColor: CARD,
        borderRadius: 16,
        padding: 20,
    },
    rowLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    labelText: {
        color: FADED_TEXT_COLOR,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 0.5,
    },
    rowValues: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    valueText: {
        color: TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
        maxWidth: "40%", // Evita que textos longos batam um no outro
    },
    dashedLineContainer: {
        flex: 1,
        marginHorizontal: 12,
        height: 1,
        overflow: "hidden",
    },
    dashedLine: {
        height: 2,
        borderWidth: 1,
        borderColor: PRIMARY,
        borderStyle: "dashed",
    },
    timeInfoText: {
        color: FADED_TEXT_COLOR,
        fontSize: 12,
        fontFamily: "DMSans_400Regular",
        textAlign: "center",
    },
    footer: {
        paddingHorizontal: 30,
        paddingBottom: 30,
        paddingTop: 10,
    },
});