import { Feather } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import LoopiMascot from "../components/LoopiMascot";
import colors from "../theme/colors";

export default function PermissionsScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.progressWrapper}>
                <View style={styles.progressDot} />
                <View style={styles.progressDot} />
                <View style={[styles.progressDot, styles.progressDotActive]} />
            </View>

            <ScrollView 
                style={styles.content} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.mascotContainer}>
                    <LoopiMascot state="alerta" size={160} />
                </View>

                <Text style={styles.title}>Preciso de duas permissões</Text>

                <Text style={styles.description}>
                    Para funcionar, o Loopi precisa da sua localização e permissão para enviar notificações.
                </Text>

                <View style={styles.cardsContainer}>
                    <View style={styles.permissionCard}>
                        <Feather name="map-pin" size={24} color={colors.PRIMARY} style={styles.icon} />
                        <Text style={styles.permissionText}>
                            <Text style={styles.permissionTitle}>Localização</Text> — detectar saída e chegada
                        </Text>
                    </View>

                    <View style={styles.permissionCard}>
                        <Feather name="bell" size={24} color={colors.PRIMARY} style={styles.icon} />
                        <Text style={styles.permissionText}>
                            <Text style={styles.permissionTitle}>Notificações</Text> — avisar hora de sair
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <LoopiButton
                    textButton="Permitir e começar"
                    onPress={() => navigation.navigate("register")}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.DARK_PRIMARY,
    },

    progressWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        marginTop: 40,
        marginBottom: 30,
    },

    progressDot: {
        height: 10,
        width: 20,
        backgroundColor: colors.BORDER,
        borderRadius: 5,
    },

    progressDotActive: {
        width: 40,
        backgroundColor: colors.PRIMARY,
    },

    content: {
        flex: 1,
    },

    contentContainer: {
        paddingHorizontal: 30,
        alignItems: "center",
        paddingBottom: 20,
    },

    mascotContainer: {
        marginBottom: 30,
    },

    title: {
        color: colors.TEXT_COLOR,
        fontSize: 26,
        fontFamily: "Nunito_900Black",
        textAlign: "center",
        marginBottom: 16,
    },

    description: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 15,
        fontFamily: "DMSans_400Regular",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 40,
    },

    cardsContainer: {
        width: "100%",
        gap: 16,
    },

    permissionCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.CARD,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.BORDER,
    },

    icon: {
        marginRight: 16,
    },

    permissionText: {
        flex: 1,
        color: colors.FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        lineHeight: 20,
    },

    permissionTitle: {
        color: colors.TEXT_COLOR,
        fontFamily: "DMSans_700Bold",
    },
    
    buttonContainer: {
        paddingHorizontal: 30,
        paddingBottom: 40,
        paddingTop: 10,
    },
});