import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import LoopiMascot from "../components/LoopiMascot";
import Menu from "../components/Menu";
import colors from "../theme/colors";

export default function EmptyStateScreen({navigation}){
    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.overline}>MEUS TRAJETOS</Text>
                    <Text style={styles.title}>Nenhum trajeto{"\n"}cadastrado ainda</Text>
                </View>

                <View style={styles.centerStage}>
                    <LoopiMascot state="normal" size={140} />

                    <Text style={styles.instruction}>
                        Adicione seu primeiro trajeto{"\n"}para o Loopi começar a aprender
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <LoopiButton
                        textButton="+ Adicionar trajeto" 
                        onPress={() => navigation.navigate("RouteOrigin")}
                    />
                </View>
            </View>

            <Menu activeTab="home"/>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.DARK_PRIMARY,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: "space-between", // Distribui Topo, Meio e Fim
        paddingTop: 40,
        paddingBottom: 20,
    },
    
    header: {
        alignItems: "flex-start",
    },
    overline: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    title: {
        color: colors.TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
        lineHeight: 36,
    },

    centerStage: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    instruction: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        textAlign: "center",
        lineHeight: 22,
        marginTop: 30, // Espaço entre o mascote e o texto
    },

    buttonContainer: {
        width: "100%",
        alignItems: "center",
    }
});