import { StyleSheet, View, Image, Text } from "react-native";
import LoopiButton from "./components/LoopiButton";
import { LoopiColors } from "./constants/Colors";

export default function OnBoarding(){
    return(
        <View style={styles.container}>
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
        
        <Text style={styles.linkText} onPress={() => console.log("Indo para o Login")}>
          Já tenho conta
        </Text>
      </View>

        </View>
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