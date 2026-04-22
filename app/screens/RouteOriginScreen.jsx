import { Feather } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import SearchInput from "../components/SearchInput";

const DARK_PRIMARY= "#0D0F1A";
const CARD= "#141629";
const BORDER= "#1C1F38";
const PRIMARY= "#C8F135";
const SECONDARY= "#6366F1";
const TEXT_COLOR= "#F4F4FF";
const FADED_TEXT_COLOR= "#ACACAC";

export default function RouteOriginScreen(){
    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Feather name="chevron-left" size={24} color={FADED_TEXT_COLOR} />
                    <Text style={styles.backText}>NOVO TRAJETO</Text>
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <View style={[styles.progressDot, styles.activeDot]} />
                    <View style={styles.progressDot} />
                    <View style={styles.progressDot} />
                </View>
                <Text style={styles.stepText}>PASSO 1 DE 3</Text>

            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>De onde você sai?</Text>
                <Text style={styles.subtitle}>Endereço ou ponto de referência</Text>

                {/* COMPONENTE DE BUSCA */}
                <View style={styles.searchSection}>
                    <SearchInput placeholder="Insira seu endereço" />
                </View>

                {/* SEÇÃO DE SUGESTÕES */}
                <Text style={styles.sectionTitle}>SUGESTÕES</Text>

                <TouchableOpacity style={styles.suggestionCard}>
                    <Feather name="map-pin" size={20} color={PRIMARY} style={styles.pinIcon} />
                    <View>
                        <Text style={styles.suggestionTitle}>Ponta Negra</Text>
                        <Text style={styles.suggestionSubtitle}>Rio de Janeiro - RJ</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.suggestionCard, styles.fadedCard]}>
                    <Feather name="map-pin" size={20} color={FADED_TEXT_COLOR} style={styles.pinIcon} />
                    <View>
                        <Text style={[styles.suggestionTitle, { color: FADED_TEXT_COLOR }]}>Av. Ponta Negra</Text>
                        <Text style={styles.suggestionSubtitle}>Rio de Janeiro - RJ</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>

            <View style={styles.footer}>
                <LoopiButton 
                    textButton="Confirmar origem" 
                    onPress={() => console.log("Ir para Destino")}
                />
            </View>

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
        gap: 8, // Espaço entre os pontinhos
        marginBottom: 12,
    },

    progressDot: {
        height: 8,
        width: 16,
        backgroundColor: BORDER, // Cor das bolinhas inativas
        borderRadius: 4,
    },

    activeDot: {
        width: 32, // Bolinha ativa
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

    title: {
        color: TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
        marginBottom: 8,
    },

    subtitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        marginBottom: 30,
    },

    searchSection: {
        marginBottom: 40,
    },

    sectionTitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 16,
    },

    suggestionCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: CARD,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },

    fadedCard: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: CARD,
    },

    pinIcon: {
        marginRight: 16,
    },

    suggestionTitle: {
        color: TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
        marginBottom: 4,
    },

    suggestionSubtitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
    },

    footer: {
        paddingHorizontal: 30,
        paddingBottom: 30,
        paddingTop: 20,
    }
})