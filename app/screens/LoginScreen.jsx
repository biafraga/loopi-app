import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LabeledInput from "../components/LabeledInput";
import LoopiButton from "../components/LoopiButton";

const DARK_PRIMARY= "#0D0F1A";
const CARD= "#141629";
const BORDER= "#1C1F38";
const PRIMARY= "#C8F135";
const SECONDARY= "#6366F1";
const TEXT_COLOR= "#F4F4FF";
const FADED_TEXT_COLOR= "#ACACAC";


export default function LoginScreen (){
    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.form}>
                <Image 
                    source={require("../../assets/images/loopi_logo.png")} 
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
                        isPassword={true}
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
        backgroundColor: DARK_PRIMARY, // Fundo escuro do app
        width: "100%"
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 30, // Dá aquele respiro nas laterais (Margem do Figma)
        paddingTop: 20,
        paddingBottom: 20,
    },
    form: {
        flex: 1, // Faz a view esticar e ocupar todo o espaço vazio
        justifyContent: "center", // Empurra o conteúdo pro meio
    },
    logo: {
        width: 160,
        height: 70,
        marginBottom: 20, // Empurra o título para baixo
    },
    title: {
        color: TEXT_COLOR,
        fontSize: 32,
        fontFamily: "Unbounded_700Bold",
        marginBottom: 8,
    },
    subtitle: {
        color: TEXT_COLOR,
        opacity: 0.7,
        fontSize: 18,
        fontFamily: "DMSans_400Regular",
        marginBottom: 30,
    },
    formContainer: {
        width: "100%",
        marginBottom: 30,
    },
    forgetButton: {
        alignSelf: "flex-end", // alinhar só este item à direita!
        marginBottom: 30, // Espaço entre o esqueci a senha e o botão de entrar
        marginTop: -5,
    },
    forgetText: {
        color: PRIMARY,
        fontSize: 18,
        fontFamily: "DMSans_400Regular",
    },
    footer: {
        flexDirection: "row", // Texto e link lado a lado
        justifyContent: "center",
        marginBottom: 10,
        paddingTop: 20,
    },
    footerText: {
        color: TEXT_COLOR,
        opacity: 0.7,
        fontFamily: "DMSans_400Regular",
        fontSize: 18,
    },
    footerLink: {
        color: PRIMARY,
        fontFamily: "DMSans_700Bold",
        fontSize: 18,
    }
});