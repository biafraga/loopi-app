import { Feather } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

export default function RegisterScreen(){
    return(
        <SafeAreaView style={styles.safeArea}> 
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                <View style={styles.headerContainer}>
                    <View style={styles.headerTop}>
                        <TouchableOpacity onPress={() => console.log("Voltar")}>
                            <Feather name="chevron-left" size={28} color={FADED_TEXT_COLOR} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>CRIAR CONTA</Text>
                    </View>

                    <View style={styles.progressContainer}>
                        {/* Pontinho Ativo (Passo 1) */}
                        <View style={[styles.progressDot, styles.progressDotActive]} />
                        {/* Pontinho Inativo (Passo 2 - Termos) */}
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
                        />

                        <LabeledInput
                            label="E-mail" 
                            iconName="mail" 
                            placeholder="seu@email.com" 
                            keyboardType="email-address"
                        />

                        <LabeledInput 
                            label="Senha" 
                            iconName="lock" 
                            placeholder="Min. 8 caracteres" 
                            secureTextEntry={true}
                        />

                        <LabeledInput
                            label="Repita a senha"
                            iconName="lock"
                            placeholder="Insira sua senha"
                            secureTextEntry={true}
                        />
                    <View style={styles.buttonWrapper}> 
                        <LoopiButton
                            textButton="Próximo" 
                            onPress={() => console.log("Ir para passo 2")}
                        />
                    </View>  

                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Já tem conta? </Text>
                        <TouchableOpacity onPress={() => console.log("Ir para Login")}>
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
        backgroundColor: DARK_PRIMARY,
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
        marginLeft: -10, // Puxa a setinha um pouco para a esquerda para alinhar visualmente
    },

    headerTitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        marginLeft: 10,
        letterSpacing: 0.5,
    },

    progressContainer: {
        flexDirection: "row",
        gap: 8, // Espaço entre os pontinhos
        marginBottom: 12,
    },

    progressDot: {
        height: 8,
        width: 16,
        backgroundColor: BORDER, // Cor das bolinhas inativas
        borderRadius: 4,
    },

    progressDotActive: {
        width: 32, // Bolinha ativa
        backgroundColor: PRIMARY,
    },

    stepText: {
        color: PRIMARY,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
    },

    formContent: {
        flex: 1,
        justifyContent: "center", 
    },

    title: {
        color: TEXT_COLOR,
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
})