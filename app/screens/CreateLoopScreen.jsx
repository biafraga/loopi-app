import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";

const DARK_PRIMARY = "#0D0F1A";
const CARD = "#141629";
const BORDER = "#1C1F38";
const PRIMARY = "#C8F135";
const SECONDARY = "#6366F1";
const TEXT_COLOR = "#F4F4FF";
const FADED_TEXT_COLOR = "#ACACAC";

export default function CreateLoopScreen() {
    // Estados para guardar o que o usuário digitar nos inputs
    const [origem, setOrigem] = useState("");
    const [destino, setDestino] = useState("");
    const [baldeacao, setBaldeacao] = useState("");

    return (
        <SafeAreaView style={styles.safeArea}>
            
            {/* CABEÇALHO */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Feather name="chevron-left" size={24} color={FADED_TEXT_COLOR} />
                    <Text style={styles.backText}>CRIAR TRAJETO</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                
                {/* FORMULÁRIO */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Origem</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ex: Barra de Maricá"
                        placeholderTextColor="#4A4D66"
                        value={origem}
                        onChangeText={setOrigem}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Destino</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ex: Centro RJ"
                        placeholderTextColor="#4A4D66"
                        value={destino}
                        onChangeText={setDestino}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Baldeação (Opcional)</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ex: Terminal rodoviário"
                        placeholderTextColor="#4A4D66"
                        value={baldeacao}
                        onChangeText={setBaldeacao}
                    />
                </View>

                {/* CARD VISUAL DA ROTA - Renderização Condicional */}
                {/* Só aparece se a pessoa preencheu Origem e Destino */}
                {(origem.trim().length > 0 && destino.trim().length > 0) && (
                    <View style={styles.routeCard}>
                        
                        {/* Linha 1: Origem */}
                        <View style={styles.routePoint}>
                            <View style={[styles.dot, { backgroundColor: PRIMARY }]} />
                            <View style={styles.pointTextContainer}>
                                <Text style={styles.pointLabel}>Origem</Text>
                                <Text style={styles.pointValue}>{origem}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.verticalLine} />

                        {/* BALDEAÇÃO - Renderização Condicional Interna */}
                        {baldeacao.trim().length > 0 && (
                            <>
                                <View style={styles.routePoint}>
                                    <View style={[styles.dot, { backgroundColor: "#4A4D66" }]} />
                                    <View style={styles.pointTextContainer}>
                                        <Text style={styles.pointLabel}>Baldeação</Text>
                                        <Text style={styles.pointValue}>{baldeacao}</Text>
                                    </View>
                                </View>
                                <View style={styles.verticalLine} />
                            </>
                        )}

                        {/* Linha 3: Destino */}
                        <View style={styles.routePoint}>
                            <View style={[styles.dot, { backgroundColor: SECONDARY }]} />
                            <View style={styles.pointTextContainer}>
                                <Text style={styles.pointLabel}>Destino</Text>
                                <Text style={styles.pointValue}>{destino}</Text>
                            </View>
                        </View>

                    </View>
                )}

            </ScrollView>

                <View style={styles.footer}>
                <LoopiButton 
                    textButton="CRIAR LOOP" 
                    variant="secondary" 
                    icon="navigation" 
                    onPress={() => console.log("Criar")} 
                />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: DARK_PRIMARY,
    },

    header: {
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 20,
    },
    
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },

    backText: {
        color: FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        marginLeft: 10,
        letterSpacing: 0.5,
    },

    content: {
        flex: 1,
        paddingHorizontal: 30,
    },

    formGroup: {
        marginBottom: 20,
    },

    label: {
        color: TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
        marginBottom: 8,
    },

    input: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
    },

    routeCard: {
        backgroundColor: CARD,
        borderRadius: 16,
        padding: 24,
        marginTop: 10,
        marginBottom: 40,
        borderWidth: 1,
        borderColor: BORDER,
    },

    routePoint: {
        flexDirection: "row",
        alignItems: "center",
    },

    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 16,
        zIndex: 2,
    },

    pointTextContainer: {
        flex: 1,
    },

    pointLabel: {
        color: FADED_TEXT_COLOR,
        fontSize: 11,
        fontFamily: "DMSans_400Regular",
        marginBottom: 2,
    },

    pointValue: {
        color: TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
    },

    verticalLine: {
        width: 1,
        height: 24,
        backgroundColor: BORDER,
        marginLeft: 5,
        marginVertical: 4,
    },

    footer: {
        paddingHorizontal: 30,
        paddingBottom: 30,
        paddingTop: 10,
    },

    submitButton: {
        backgroundColor: SECONDARY,
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
    },
    
    submitButtonText: {
        color: TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    }
});