import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import SearchInput from "../components/SearchInput";

const DARK_PRIMARY = "#0D0F1A";
const CARD = "#141629";
const BORDER = "#1C1F38";
const PRIMARY = "#C8F135";
const TEXT_COLOR = "#F4F4FF";
const FADED_TEXT_COLOR = "#ACACAC";

export default function RouteOriginScreen() {
    // 1. Estado para guardar o que o usuário está digitando
    const [searchText, setSearchText] = useState("");
    
    // 2. Estado para guardar a lista de DTOs Mockados (de mentirinha)
    const [suggestions, setSuggestions] = useState([]);

    // 3. A função que simula a busca
    const buscarSugestoes = (textoDigitado) => {
        setSearchText(textoDigitado);

        // Se o usuário digitou algo (tamanho maior que zero), mostramos o mock.
        // Se a barra de pesquisa ficar vazia de novo, a gente limpa as sugestões.
        if (textoDigitado.trim().length > 0) {
            setSuggestions([
                { id: "1", title: "Afonso Pena", subtitle: "Tijuca, Rio de Janeiro - RJ" },
                { id: "2", title: "Martins Pena", subtitle: "Tijuca, Rio de Janeiro - RJ" },
                { id: "3", title: "Estação Afonso Pena", subtitle: "Metrô Rio - Linha 1" }
            ]);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Feather name="chevron-left" size={24} color={FADED_TEXT_COLOR} />
                    <Text style={styles.backText}>NOVO TRAJETO</Text>
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <View style={[styles.progressDot, styles.activeDot]} />
                    <View style={styles.progressDot} />
                    <View style={styles.progressDot} />
                </View>
                <Text style={styles.stepText}>PASSO 1 DE 3</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>De onde você sai?</Text>
                <Text style={styles.subtitle}>Endereço ou ponto de referência</Text>

                {/* COMPONENTE DE BUSCA (Mockado) */}
                <View style={styles.searchSection}>
                    <SearchInput 
                        placeholder="Insira seu endereço" 
                        value={searchText}
                        onChangeText={buscarSugestoes} // Chama nossa função mockada a cada letra
                    />
                </View>

                {/* SEÇÃO DE SUGESTÕES DINÂMICAS */}
                {/* Só mostra a palavra "SUGESTÕES" se a lista não estiver vazia */}
                {suggestions.length > 0 && (
                    <Text style={styles.sectionTitle}>SUGESTÕES</Text>
                )}

                {/* Renderiza a lista Mockada */}
                {suggestions.map((item, index) => {
                    const isFirstItem = index === 0;

                    return (
                        <TouchableOpacity 
                            key={item.id} 
                            style={[
                                styles.suggestionCard, 
                                !isFirstItem && styles.fadedCard 
                            ]}
                            onPress={() => console.log("Usuário escolheu a origem: ", item.title)}
                        >
                            <Feather 
                                name="map-pin" 
                                size={20} 
                                color={isFirstItem ? PRIMARY : FADED_TEXT_COLOR} 
                                style={styles.pinIcon} 
                            />
                            <View>
                                <Text style={[
                                    styles.suggestionTitle, 
                                    !isFirstItem && { color: FADED_TEXT_COLOR }
                                ]}>
                                    {item.title}
                                </Text>
                                <Text style={styles.suggestionSubtitle}>
                                    {item.subtitle}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}

            </ScrollView>

            <View style={styles.footer}>
                <LoopiButton 
                    textButton="Confirmar origem" 
                    onPress={() => console.log("Ir para Destino")}
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
        paddingBottom: 30,
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
    activeDot: {
        width: 32, 
        backgroundColor: PRIMARY
    },
    stepText: {
        color: PRIMARY,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
    },
    title: {
        color: TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
        marginBottom: 8,
    },
    subtitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        marginBottom: 30,
    },
    searchSection: {
        marginBottom: 40,
    },
    sectionTitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 16,
    },
    suggestionCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: CARD,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    fadedCard: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: CARD,
    },
    pinIcon: {
        marginRight: 16,
    },
    suggestionTitle: {
        color: TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
        marginBottom: 4,
    },
    suggestionSubtitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
    },
    footer: {
        paddingHorizontal: 30,
        paddingBottom: 30,
        paddingTop: 20,
    }
});