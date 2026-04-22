import { Feather } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import SearchInput from "../components/SearchInput";

const DARK_PRIMARY = "#0D0F1A";
const CARD = "#141629";
const BORDER = "#1C1F38";
const PRIMARY = "#C8F135";
const SECONDARY = "#6366F1";
const TEXT_COLOR = "#F4F4FF";
const FADED_TEXT_COLOR = "#ACACAC";

export default function RouteDestinationScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Feather name="chevron-left" size={24} color={FADED_TEXT_COLOR} />
                    <Text style={styles.backText}>NOVO TRAJETO</Text>
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <View style={styles.progressDot} />
                    <View style={[styles.progressDot, styles.activeDot]} />
                    <View style={styles.progressDot} />
                </View>
                <Text style={styles.stepText}>PASSO 2 DE 3</Text>
            </View>

            <ScrollView style={styles.content} 
                contentContainerStyle={styles.scrollContent} 
                showsVerticalScrollIndicator={false}>
                
                <Text style={styles.title}>Para onde você vai?</Text>
                
                {/* BUSCA DE DESTINO */}
                <View style={styles.searchSection}>
                    <SearchInput placeholder="Insira seu destino" />
                </View>

                {/* SELETOR DE HORÁRIO */}
                <Text style={styles.sectionTitle}>QUE HORAS PRECISA CHEGAR?</Text>
                
                <View style={styles.timeWrapper}>
                    {/* Bloco de Hora */}
                    <View style={styles.timeBox}>
                        <Text style={styles.timeLabel}>HORA</Text>
                        <TextInput 
                            style={styles.timeInput} 
                            placeholder="08"
                            placeholderTextColor={FADED_TEXT_COLOR}
                            keyboardType="numeric"
                            maxLength={2}
                        />
                    </View>

                    {/* Os dois pontos separadores */}
                    <Text style={styles.timeSeparator}>:</Text>

                    {/* Bloco de Minuto */}
                    <View style={styles.timeBox}>
                        <Text style={styles.timeLabel}>MIN</Text>
                        <TextInput 
                            style={styles.timeInput} 
                            placeholder="00"
                            placeholderTextColor={FADED_TEXT_COLOR}
                            keyboardType="numeric"
                            maxLength={2}
                        />
                    </View>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <LoopiButton 
                    textButton="Próximo" 
                    onPress={() => console.log("Ir para Confirmação")}
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
        paddingBottom: 30,
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
        backgroundColor: PRIMARY
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
        flexGrow: 1,
        justifyContent: "center",
        paddingBottom: 40,
    },

    title: {
        color: TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
        marginBottom: 30, // Deixei 30 aqui para dar o mesmo espaço do subtitle da outra tela
    },

    searchSection: {
        marginBottom: 40,
    },

    sectionTitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 14, // Aumentado para acompanhar sua Origem
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 16,
    },

    timeWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start", 
    },

    timeBox: {
        backgroundColor: DARK_PRIMARY,
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: "center",
        width: 90,
    },

    timeLabel: {
        color: FADED_TEXT_COLOR,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        marginBottom: 4,
    },

    timeInput: {
        color: TEXT_COLOR,
        fontSize: 32,
        fontFamily: "Nunito_900Black",
        textAlign: "center",
    },

    timeSeparator: {
        color: TEXT_COLOR,
        fontSize: 32,
        fontFamily: "Nunito_900Black",
        marginHorizontal: 12,
        paddingTop: 16, 
    },

    footer: {
        paddingHorizontal: 30,
        paddingBottom: 30,
        paddingTop: 20,
    }
});