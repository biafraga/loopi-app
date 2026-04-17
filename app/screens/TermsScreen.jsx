import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import LoopiCheckbox from "../components/LoopiCheckbox";
import LoopiButton from "../components/LoopiButton";

const DARK_PRIMARY= "#0D0F1A";
const CARD= "#141629";
const BORDER= "#1C1F38";
const PRIMARY= "#C8F135";
const SECONDARY= "#6366F1";
const TEXT_COLOR= "#F4F4FF";
const FADED_TEXT_COLOR= "#ACACAC";

export default function TermsScreen(){
    // Criando os estados para os dois checkboxes começarem desmarcados (false)
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [notificationsAccepted, setNotificationsAccepted] = useState(false);

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
                        {/* Pontinho Inativo (Passo 1 já passou) */}
                        <View style={styles.progressDot} />
                        {/* Pontinho Ativo (Passo 2 atual) */}
                        <View style={[styles.progressDot, styles.progressDotActive]} />
                    </View>

                    <Text style={styles.stepText}>PASSO 2 DE 2</Text>
                </View>

                <View style={styles.mainContent}>
                    <Text style={styles.title}>Quase lá!</Text>
                    <Text style={styles.subtitle}>Só mais duas confirmações.</Text>

                    <View style={styles.checkboxGroup}>
                        <LoopiCheckbox 
                            text="Li e aceito os Termos de Uso e a Política de Privacidade"
                            isChecked={termsAccepted}
                            onPress={() => setTermsAccepted(!termsAccepted)} // Inverte o estado ao clicar
                        />
                        
                        <LoopiCheckbox 
                            text="Aceito receber notificações push com o horário de saída"
                            isChecked={notificationsAccepted}
                            onPress={() => setNotificationsAccepted(!notificationsAccepted)} // Inverte o estado ao clicar
                        />
                    </View>

                    <Text style={styles.disclaimerText}>
                        Sua localização é usada apenas para detectar saída e chegada. Não compartilhamos seus dados.
                    </Text>

                    <View style={styles.buttonContainer}>
                        <LoopiButton 
                            textButton="Criar minha conta" 
                            onPress={() => console.log("Conta Finalizada!")}
                        />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
        backgroundColor: DARK_PRIMARY,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 30, 
        paddingTop: 20,
        paddingBottom: 40,
    },
    
    headerContainer: {
        width: "100%",
        marginBottom: 30, 
    },
    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
        marginLeft: -10, 
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
        gap: 8, 
        marginBottom: 12,
    },
    progressDot: {
        height: 8,
        width: 16,
        backgroundColor: BORDER, 
        borderRadius: 4,
    },
    progressDotActive: {
        width: 32, 
        backgroundColor: PRIMARY,
    },
    stepText: {
        color: PRIMARY,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
    },
    mainContent: {
        flex: 1,
        justifyContent: "flex-start", 
    },
    title: {
        color: TEXT_COLOR,
        fontSize: 32,
        fontFamily: "Nunito_900Black",
        marginBottom: 8, 
    },
    subtitle: {
        color: TEXT_COLOR,
        opacity: 0.7,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        marginBottom: 40,
    },
    checkboxGroup: {
        marginBottom: 30,
    },
    disclaimerText: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        lineHeight: 22,
        marginBottom: 40,
    },
    buttonContainer: {
        marginTop: "auto", // Empurra o botão pro final da tela, caso sobre espaço!
    }
});