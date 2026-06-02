import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import LoopiMascot from "../components/LoopiMascot";
import colors from "../theme/colors";

export default function StatusScreen({ route, navigation }) {
  const {
    mascotState = "confuso",
    title = "Ops! Algo deu errado",
    description = "Não conseguimos carregar essa página no momento. Tente novamente mais tarde.",
    buttonText = "Voltar",
    action = "goBack"
  } = route.params || {};

  const handlePress = () => {
    if (action === "goBack") {
      navigation.goBack();
    } else {
      navigation.navigate(action);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mascotContainer}>
          <LoopiMascot state={mascotState} size={180} />
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <LoopiButton textButton={buttonText} onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DARK_PRIMARY,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  mascotContainer: {
    marginBottom: 40,
  },

  title: {
    color: colors.TEXT_COLOR,
    fontSize: 28,
    fontFamily: "Nunito_900Black",
    textAlign: "center",
    marginBottom: 16,
  },

  description: {
    color: colors.FADED_TEXT_COLOR,
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    textAlign: "center",
    lineHeight: 24,
  },

  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  
});