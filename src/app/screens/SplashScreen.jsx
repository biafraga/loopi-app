import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import colors from "../theme/colors";


export default function SplashScreen({ navigation }){
    return(
        <SafeAreaView style={styles.container}>
            <Image
                source={require("../assets/images/loopi_logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.slogan}>Seu loop diário, no horário certo</Text>

            <View style={styles.buttonContainer}>
                <LoopiButton
                    textButton="Começar agora"
                    onPress={() => navigation.navigate("proposal")}
                />

                <LoopiButton
                    textButton="Já tenho conta"
                    variant="outline"
                    textButton="Já tenho conta"
                    onPress={() => navigation.navigate("login")}
                />

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.DARK_PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  logo: {
    width: 200,
    height: 100,
    marginBottom: 10,
  },

  slogan: {
    color: colors.TEXT_COLOR,
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    marginBottom: 60,
    opacity: 0.8,
  },

  buttonContainer: {
    width: "100%",
    gap: 20,
    paddingHorizontal: 30,
    position: "absolute",
    bottom: 60,
  },


});