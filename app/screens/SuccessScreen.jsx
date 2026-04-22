import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import LoopiMascot from "../components/LoopiMascot";

const DARK_PRIMARY= "#0D0F1A";
const CARD= "#141629";
const BORDER= "#1C1F38";
const PRIMARY= "#C8F135";
const SECONDARY= "#6366F1";
const TEXT_COLOR= "#F4F4FF";
const FADED_TEXT_COLOR= "#ACACAC";

export default function SuccessScreen({ userName = "Usuário" }){
    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.mascotContainer}>
                    <LoopiMascot state="chegou" size={160} />
                </View>

                <Text style={styles.title}>Seja bem-vindo,</Text>
                <Text style={styles.titleHighlight}>{userName}!</Text>

                <Text style={styles.subtitle}>Sua conta foi criada. Agora é só{"\n"}cadastrar seu primeiro trajeto.</Text>

                <View style={styles.infoCard}>
                    <View style={styles.iconBox}>
                        <Feather name="map-pin" size={20} color={PRIMARY}/>
                    </View>
                    <Text style={styles.infoText}>
                        Próximo passo: cadastrar{"\n"}seu trajeto diário para o{"\n"}Loopi começar a aprender
                    </Text>
                </View>

                <View style={styles.footer}>
                    <LoopiButton
                        textButton="Cadastrar meu trajeto"
                        onPress={() => console.log("Indo para o mapa...")}
                    />

                    <TouchableOpacity style={styles.skipButton} onPress={() => console.log("Pular por enquanto")}>
                        <Text style={styles.skipText}>Fazer isso depois</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    safeArea:{
        flex: 1,
        backgroundColor: DARK_PRIMARY,
    },

    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
    },

    mascotContainer:{
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        color: TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Unbounded_700Bold",
        textAlign: "center",
    },

    titleHighlight: {
        color: PRIMARY,
        fontSize: 28,
        fontFamily: "Unbounded_700Bold",
        textAlign: "center",
        marginBottom: 16,
    },

    subtitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 40,
    },

    infoCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: CARD,
        padding: 16,
        borderRadius: 16,
        width: "100%",
        marginBottom: 50,
    },

    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },

    infoText: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        lineHeight: 18,
    },

    footer: {
        width: "100%",
        alignItems: "center",
    },
    skipButton: {
        marginTop: 20,
        paddingVertical: 10,
    },
    skipText: {
        color: PRIMARY,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
    },

});