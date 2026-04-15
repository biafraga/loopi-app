import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LabeledInput from "../components/LabeledInput";
import LoopiButton from "../components/LoopiButton";
import { LoopiColors } from "../constants/Colors";

export default function LoginScreen (){
    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                <Image 
                    source={require("../assets/images/loopi_logo.png")} 
                    style={styles.logo} 
                    resizeMode="contain"
                />
                <Text style={styles.title}>Bem-vindo{"\n"}de volta</Text>
                <Text style={styles.subtitle}>Entre para ver seu loop</Text>

                <View style={styles.formContainer}>
                    <LabeledInput
                        label="E-mail" 
                        iconName="mail" 
                        placeholder="Insira seu email" 
                        keyboardType="email-address"
                    />
                    <LabeledInput 
                        label="Senha" 
                        iconName="lock" 
                        placeholder="Insira sua senha" 
                        secureTextEntry={true}
                    />
                    
                    {/* Esqueci a senha (Alinhado à direita) */}
                    <TouchableOpacity style={styles.forgetButton}>
                        <Text style={styles.forgetText}>Esqueci a senha</Text>
                    </TouchableOpacity>

                    <LoopiButton
                        textButton="Entrar"
                        onPress={() => console.log("Clicou em Entrar")}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Não tem conta? </Text>
                    <TouchableOpacity onPress={() => console.log("Ir para Cadastro")}>
                        <Text style={styles.footerLink}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: LoopiColors.darkPrimary, // Fundo escuro do app
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 30, // Dá aquele respiro nas laterais (Margem do Figma)
        paddingTop: 40,
        paddingBottom: 20,
    },
    logo: {
        width: 100,
        height: 40,
        marginBottom: 30, // Empurra o título para baixo
    },
    title: {
        color: LoopiColors.textColor,
        fontSize: 32,
        fontFamily: "Unbounded_700Bold", // A fonte chique que você escolheu!
        marginBottom: 8,
    },
    subtitle: {
        color: LoopiColors.textColor,
        opacity: 0.7,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        marginBottom: 40,
    },
    formContainer: {
        width: "100%",
        marginBottom: 30,
    },
    forgetButton: {
        alignSelf: "flex-end", // O segredo para alinhar só este item à direita!
        marginBottom: 30, // Espaço entre o esqueci a senha e o botão de entrar
        marginTop: -5,
    },
    forgetText: {
        color: LoopiColors.primary, // Cor verde para mostrar que é clicável
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
    },
    footer: {
        flexDirection: "row", // Texto e link lado a lado
        justifyContent: "center",
        marginTop: "auto", // Empurra o rodapé pro fundo da tela!
        paddingTop: 30,
    },
    footerText: {
        color: LoopiColors.textColor,
        opacity: 0.7,
        fontFamily: "DMSans_400Regular",
    },
    footerLink: {
        color: LoopiColors.primary,
        fontFamily: "DMSans_700Bold",
    }
});