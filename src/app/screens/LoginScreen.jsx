import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LabeledInput from "../components/LabeledInput";
import LoopiButton from "../components/LoopiButton";
//import { AuthContext } from "../context/AuthContext";
import colors from "../theme/colors";
import { isValidEmail } from "../utils/masks";

export default function LoginScreen ({ navigation }){

    // ESTADOS PARA CAPTURAR O QUE O USUÁRIO DIGITA
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

    // Extraímos a função login do nosso contexto
    //const { login } = useContext(AuthContext);

    const isFormValid = isValidEmail(email) && password.length > 0;

    // Função que vai gerir o clique do botão
    // const handleLogin = async () => {
    //     setIsLoading(true);
    //     try {
    //         // Chama o contexto, que chama o authService, que bate no Axios, que chega ao Spring Boot
    //         await login(email, password);
            
    //         // Se OK, entramos na aplicação
    //         navigation.navigate("main");
    //     } catch (error) {
    //         // Se o Java devolver erro 403 (Forbidden/Palavra-passe errada)
    //         Alert.alert(
    //             "Erro de Autenticação", 
    //             "As credenciais estão incorretas ou o utilizador não existe. Tente novamente."
    //         );
    //     } finally {
    //         setIsLoading(false); // Tira o estado de carregamento independentemente do resultado
    //     }
    // };

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
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
                        value={email}
                        onChangeText={setEmail}
                    />
                    <LabeledInput 
                        label="Senha" 
                        iconName="lock" 
                        placeholder="Insira sua senha" 
                        isPassword={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    
                    <TouchableOpacity style={styles.forgetButton}>
                        <Text style={styles.forgetText}>Esqueci a senha</Text>
                    </TouchableOpacity>

                    <View style={{ opacity: isFormValid ? 1 : 0.5 }}>
                            <LoopiButton
                                textButton="Entrar"
                                disabled={!isFormValid}
                                onPress={() => navigation.navigate("main")}
                            />
                    </View>
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