import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import colors from "../theme/colors";

export default function InstructionsScreen({ navigation }) {
    const steps = [
        {
            id: "1",
            title: "Cadastre seu trajeto",
            description: "Origem, destino e hora que precisa chegar",
        },
        {
            id: "2",
            title: "Use todo dia",
            description: "O app registra sua saída e chegada automaticamente",
        },
        {
            id: "3",
            title: "Receba sua hora certa",
            description: "Notificação personalizada baseada no seu histórico",
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.progressWrapper}>
                <View style={styles.progressDot} />
                <View style={[styles.progressDot, styles.progressDotActive]} />
                <View style={styles.progressDot} />
            </View>

            <View style={styles.content}>
                <Text style={styles.overline}>COMO FUNCIONA</Text>
                <Text style={styles.title}>3 passos simples</Text>

                {/* Renderizando os cartões com o .map() */}
                <View style={styles.cardsContainer}>
                    {steps.map((step) => (
                        <View key={step.id} style={styles.card}>
                            <View style={styles.numberBadge}>
                                <Text style={styles.numberText}>{step.id}</Text>
                            </View>
                            <View style={styles.cardTextContainer}>
                                <Text style={styles.cardTitle}>{step.title}</Text>
                                <Text style={styles.cardDescription}>{step.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <LoopiButton
                    textButton="Próximo"
                    onPress={() => navigation.navigate("permissions")}
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
        marginBottom: 40,
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
        paddingHorizontal: 30,
    },

    overline: {
        color: colors.PRIMARY,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 8,
    },

    title: {
        color: colors.TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
        marginBottom: 32,
    },

    cardsContainer: {
        gap: 16,
    },

    card: {
        flexDirection: "row",
        backgroundColor: colors.CARD,
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
    },

    numberBadge: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },

    numberText: {
        color: colors.PRIMARY,
        fontSize: 18,
        fontFamily: "Nunito_900Black",
    },

    cardTextContainer: {
        flex: 1,
    },

    cardTitle: {
        color: colors.TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
        marginBottom: 4,
    },

    cardDescription: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        lineHeight: 20,
    },

    buttonContainer: {
        paddingHorizontal: 30,
        paddingBottom: 40,
    },
});