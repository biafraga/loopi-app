import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LabeledInput from "../components/LabeledInput";
import LoopiButton from "../components/LoopiButton";
import colors from "../theme/colors";


export default function LoginScreen ({ navigation }){
    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.form}>
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
                        isPassword={true}
                    />
                    
                    <TouchableOpacity style={styles.forgetButton}>
                        <Text style={styles.forgetText}>Esqueci a senha</Text>
                    </TouchableOpacity>

                    <LoopiButton
                        textButton="Entrar"
                        onPress={() => navigation.navigate("empty_state")}
                    />
                </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Não tem conta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("register")}>
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
        backgroundColor: colors.DARK_PRIMARY,
        width: "100%"
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 30, // respiro nas laterais (Margem do Figma)
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
        marginBottom: 20,

    },
    title: {
        color: colors.TEXT_COLOR,
        fontSize: 30,
        fontFamily: "Nunito_900Black",
        marginBottom: 8,
    },
    subtitle: {
        color: colors.TEXT_COLOR,
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
        alignSelf: "flex-end", 
        marginBottom: 30,
        marginTop: -5,
    },
    forgetText: {
        color: colors.PRIMARY,
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
        color: colors.TEXT_COLOR,
        opacity: 0.7,
        fontFamily: "DMSans_400Regular",
        fontSize: 18,
    },
    footerLink: {
        color: colors.PRIMARY,
        fontFamily: "DMSans_700Bold",
        fontSize: 18,
    }
});