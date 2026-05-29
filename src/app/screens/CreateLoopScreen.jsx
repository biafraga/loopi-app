import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import colors from "../theme/colors";

export default function CreateLoopScreen({navigation}) {
    // Estados para guardar o que o usuário digitar nos inputs
    const [origem, setOrigem] = useState("");
    const [destino, setDestino] = useState("");
    const [baldeacao, setBaldeacao] = useState("");

    return (
        <SafeAreaView style={styles.safeArea}>
            
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color={colors.FADED_TEXT_COLOR} />
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
                            <View style={[styles.dot, { backgroundColor: colors.PRIMARY }]} />
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
                            <View style={[styles.dot, { backgroundColor: colors.SECONDARY }]} />
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
                    onPress={() => navigation.navigate("route_confirmation")} 
                />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.DARK_PRIMARY,
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
        color: colors.FADED_TEXT_COLOR,
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
        color: colors.TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
        marginBottom: 8,
    },

    input: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.BORDER,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: colors.TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
    },

    routeCard: {
        backgroundColor: colors.CARD,
        borderRadius: 16,
        padding: 24,
        marginTop: 10,
        marginBottom: 40,
        borderWidth: 1,
        borderColor: colors.BORDER,
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
        color: colors.FADED_TEXT_COLOR,
        fontSize: 11,
        fontFamily: "DMSans_400Regular",
        marginBottom: 2,
    },

    pointValue: {
        color: colors.TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
    },

    verticalLine: {
        width: 1,
        height: 24,
        backgroundColor: colors.BORDER,
        marginLeft: 5,
        marginVertical: 4,
    },

    footer: {
        paddingHorizontal: 30,
        paddingBottom: 30,
        paddingTop: 10,
    },

    submitButton: {
        backgroundColor: colors.SECONDARY,
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
    },
    
    submitButtonText: {
        color: colors.TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    }
});