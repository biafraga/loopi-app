import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoopiColors } from "../constants/Colors";
import LoopiButton from "./components/LoopiButton";

export default function OnBoarding(){
    return(
      <SafeAreaView style={styles.container}>
            <Image 
                source={require("../assets/images/loopi_logo.png")} 
                style={styles.logo} 
                resizeMode="contain"
            />

        {/*Slogan*/}
        <Text style={styles.slogan}>Seu loop diário, no horário certo</Text>

        {/*Botões*/}
        <View style={styles.buttonContainer}>
        <LoopiButton 
          textButton="Começar agora" 
          onPress={() => console.log("Indo para o Cadastro")} 
        />
        
        <LoopiButton 
            textButton="Já tenho conta" 
            variant="outline" // Olha a mágica aqui!
            onPress={() => console.log("Indo para o Login")} 
          />
      </View>

      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LoopiColors.darkPrimary,
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
    color: LoopiColors.textColor,
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    marginBottom: 60,
    opacity: 0.8,
  },
  buttonContainer: {
    width: "100%",
    gap: 20,
    position: "absolute",
    bottom: 60,
  },
  linkText: {
    color: LoopiColors.textColor,
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: "underline"
  },
});