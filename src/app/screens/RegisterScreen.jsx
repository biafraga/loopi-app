import { Feather } from '@expo/vector-icons';
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LabeledInput from "../components/LabeledInput";
import LoopiButton from "../components/LoopiButton";
//import { AuthContext } from "../context/AuthContext";
import colors from '../theme/colors';
import { isValidEmail } from '../utils/masks';

export default function RegisterScreen({navigation}){

    // ESTADOS DO FORMULÁRIO
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    //const [isLoading, setIsLoading] = useState(false);
    
    //const { register } = useContext(AuthContext);

    // VALIDAÇÃO ROBUSTA: Tudo deve estar correto para prosseguir
    const isFormValid = 
        name.length > 0 && 
        isValidEmail(email) && 
        password.length >= 8 && 
        password === confirmPassword;

    // Função que aciona o backend para criar a conta
    // const handleRegister = async () => {
    //     setIsLoading(true);
    //     try {
    //         // Vai lá no Spring Boot e cadastra o usuário no banco H2
    //         await register(name, email, password);
            
    //         Alert.alert("Sucesso!", "Conta criada com sucesso no banco de dados! Agora faça o login.");
            
    //         // Joga o usuário para a tela de login para testarmos o fluxo
    //         navigation.navigate("login");
    //     } catch (error) {
    //         Alert.alert("Erro", "Não foi possível criar a conta. O Spring Boot está rodando?");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    return(
        <SafeAreaView style={styles.safeArea}> 
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                
                <View style={styles.headerContainer}>
                    <View style={styles.headerTop}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Feather name="chevron-left" size={28} color={colors.FADED_TEXT_COLOR} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>CRIAR CONTA</Text>
                    </View>

                    <View style={styles.progressContainer}>
                        <View style={[styles.progressDot, styles.progressDotActive]} />
                        <View style={styles.progressDot} />
                    </View>

                    <Text style={styles.stepText}>PASSO 1 DE 2</Text>
                </View>

                <View style={styles.formContent}>
                    <Text style={styles.title}>Seus dados</Text>

                    <View style={styles.formContainer}>
                        <LabeledInput
                            label="Nome"
                            iconName="user"
                            placeholder="Insira seu nome"
                            value={name}
                            onChangeText={setName}
                        />

                        <LabeledInput
                            label="E-mail" 
                            iconName="mail" 
                            placeholder="seu@email.com" 
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <LabeledInput 
                            label="Senha" 
                            iconName="lock" 
                            placeholder="Min. 8 caracteres" 
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <LabeledInput
                            label="Repita a senha"
                            iconName="lock"
                            placeholder="Insira sua senha"
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    <View style={[styles.buttonWrapper, { opacity: isFormValid ? 1 : 0.5 }]}> 
                        <LoopiButton
                            textButton="Próximo" 
                            disabled={!isFormValid}
                            onPress={() => navigation.navigate("terms")}
                        />
                    </View>  

                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Já tem conta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("login")}>
                            <Text style={styles.footerLink}>Entrar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    safeArea:{
        flex: 1,
        backgroundColor: colors.DARK_PRIMARY,
    },
    
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 30, 
        paddingTop: 20,
        paddingBottom: 20,
    },

    headerContainer: {
        width: "100%",
        marginBottom: 10,
    },

    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
        marginLeft: -10,
    },

    headerTitle: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        marginLeft: 10,
        letterSpacing: 0.5,
    },

    progressContainer: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 12,
    },

    progressDot: {
        height: 8,
        width: 16,
        backgroundColor: colors.BORDER, // Cor das bolinhas inativas
        borderRadius: 4,
    },

    progressDotActive: {
        width: 32, // Bolinha ativa
        backgroundColor: colors.PRIMARY,
    },

    stepText: {
        color: colors.PRIMARY,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
    },

    formContent: {
        flex: 1,
        justifyContent: "center", 
    },

    title: {
        color: colors.TEXT_COLOR,
        fontSize: 32,
        fontFamily: "Nunito_900Black",
        marginBottom: 10, 
    },

    formContainer: {
        width: "100%",
        marginBottom: 30,
    },

    buttonWrapper: {
        marginTop: 20,
    },

    footer: {
        flexDirection: "row", 
        justifyContent: "center",
        marginTop: "auto", 
        marginBottom: 20,  
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
})