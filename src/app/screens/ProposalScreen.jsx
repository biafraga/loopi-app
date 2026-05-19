import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import LoopiMascot from "../components/LoopiMascot";
import colors from "../theme/colors";

export default function ProposalScreen({ navigation }){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.progressWrapper}>
                <View style={[styles.progressDot, styles.progressDotActive]} />
                <View style={styles.progressDot} />
                <View style={styles.progressDot} />
            </View>

            <View style={styles.content}>
                <View style={styles.mascotContainer}>
                  <LoopiMascot state="normal" size={180} />
                </View>

            <Text style={styles.title}>
                O app que{"\n"}
                <Text style={styles.highlight}>aprende</Text> com você
            </Text>

            <Text style={styles.description}>
                Quanto mais você usa, mais inteligente ele fica. Sem dados genéricos,
                só o seu histórico real.
            </Text>
            </View>

            <View style={styles.buttonContainer}>
                <LoopiButton
                    textButton="Próximo"
                    onPress={() => navigation.navigate("Instructions")}
                />
            </View>
        </SafeAreaView>
    )
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  title: {
    color: colors.TEXT_COLOR,
    fontSize: 32,
    fontFamily: "Nunito_900Black",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 40,
  },

  highlight: {
    color: colors.PRIMARY,
  },

  description: {
    color: colors.FADED_TEXT_COLOR,
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },

  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  
});