import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import colors from "../theme/colors";
import { isValidTime, maskTime } from "../utils/masks";

export default function CreateLoopScreen({ navigation }) {
    const [apelido, setApelido] = useState("");
    const [origem, setOrigem] = useState("");
    const [destino, setDestino] = useState("");
    const [baldeacoes, setBaldeacoes] = useState([]); 
    const [tempBaldeacao, setTempBaldeacao] = useState("");
    const [horaChegada, setHoraChegada] = useState(""); 
    const [notificacao, setNotificacao] = useState(""); 

    const allLocations = ["Barra de Maricá", "Centro RJ", "Terminal Menezes Cortes", "Rodoviária Novo Rio", "Botafogo"];
    const [suggestions, setSuggestions] = useState({ field: "", list: [] });

    // VALIDAÇÃO DO FORMULÁRIO INTEIRO
    const isFormValid = origem.trim().length > 0 && destino.trim().length > 0 && isValidTime(horaChegada);

    // MÁSCARA DE HORÁRIO
    const handleTimeChange = (text) => {
        setHoraChegada(maskTime(text));
    };

    const handleSearch = (text, field) => {
        if (field === "origem") setOrigem(text);
        if (field === "destino") setDestino(text);
        if (field === "baldeacao") setTempBaldeacao(text);

        if (text.length > 1) {
            setSuggestions({ field, list: allLocations.filter(loc => loc.toLowerCase().includes(text.toLowerCase())) });
        } else {
            setSuggestions({ field: "", list: [] });
        }
    };

    const addBaldeacao = () => {
        if (tempBaldeacao.trim()) {
            setBaldeacoes([...baldeacoes, tempBaldeacao]);
            setTempBaldeacao("");
        }
    };

    const removeBaldeacao = (index) => {
    setBaldeacoes(baldeacoes.filter((_, i) => i !== index));
};

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color={colors.FADED_TEXT_COLOR} />
                    <Text style={styles.backText}>CRIAR TRAJETO</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                
                {/* NOME DO LOOP */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome do loop</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ex: Faculdade, Trabalho..." 
                        placeholderTextColor="#4A4D66" 
                        value={apelido} 
                        onChangeText={setApelido} 
                    />
                </View>
                
                {/* ORIGEM */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Origem</Text>
                    <TextInput style={styles.input} placeholder="Ex: Barra de Maricá" placeholderTextColor="#4A4D66" value={origem} onChangeText={(t) => handleSearch(t, "origem")} />
                    {suggestions.field === "origem" && suggestions.list.map((loc, i) => (
                        <TouchableOpacity key={i} style={styles.suggestionItem} onPress={() => { setOrigem(loc); setSuggestions({field:"", list:[]}); }}>
                            <Feather name="map-pin" size={14} color={colors.FADED_TEXT_COLOR} />
                            <Text style={styles.suggestionText}>{loc}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* BALDEAÇÃO */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Baldeações (Opcional)</Text>
                    <View style={styles.row}>
                        <TextInput style={[styles.input, {flex: 1}]} placeholder="Ex: Terminal Menezes" placeholderTextColor="#4A4D66" value={tempBaldeacao} onChangeText={(t) => handleSearch(t, "baldeacao")} />
                        <TouchableOpacity style={styles.addButton} onPress={addBaldeacao}>
                            <Feather name="plus-circle" size={32} color={colors.SECONDARY} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* DESTINO */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Destino</Text>
                    <TextInput style={styles.input} placeholder="Ex: Centro RJ" placeholderTextColor="#4A4D66" value={destino} onChangeText={(t) => handleSearch(t, "destino")} />
                    {suggestions.field === "destino" && suggestions.list.map((loc, i) => (
                        <TouchableOpacity key={i} style={styles.suggestionItem} onPress={() => { setDestino(loc); setSuggestions({field:"", list:[]}); }}>
                            <Feather name="map-pin" size={14} color={colors.FADED_TEXT_COLOR} />
                            <Text style={styles.suggestionText}>{loc}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {(origem.trim().length > 0 && destino.trim().length > 0) && (
                    <View style={styles.routeCard}>
                        <View style={styles.routePoint}>
                            <View style={[styles.dot, { backgroundColor: colors.PRIMARY }]} />
                            <Text style={styles.pointValue}>{origem}</Text>
                        </View>
                        <View style={styles.verticalLine} />
                        {baldeacoes.map((b, i) => (
                            <View key={i}>
                                <View style={styles.routePoint}>
                                    <View style={[styles.dot, { backgroundColor: "#4A4D66" }]} />
                                    <Text style={[styles.pointValue, { flex: 1 }]}>{b}</Text>
                                    <TouchableOpacity onPress={() => removeBaldeacao(i)} hitSlop={10}>
                                        <Feather name="x" size={18} color={colors.FADED_TEXT_COLOR} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.verticalLine} />
                            </View>
                        ))}
                        <View style={styles.routePoint}>
                            <View style={[styles.dot, { backgroundColor: colors.SECONDARY }]} />
                            <Text style={styles.pointValue}>{destino}</Text>
                        </View>
                    </View>
                )}

                {/* HORÁRIOS */}
                <View style={styles.timeRow}>
                    <View style={styles.timeFieldContainer}>
                        <View style={styles.labelWrapper}>
                            <Text style={styles.label}>Que horas precisa chegar?</Text>
                        </View>
                        <TextInput 
                            style={styles.input} 
                            placeholder="08:00" 
                            placeholderTextColor="#4A4D66" 
                            value={horaChegada} 
                            onChangeText={handleTimeChange} 
                            keyboardType="numeric" 
                            maxLength={5} 
                        />
                    </View>
                    <View style={styles.timeFieldContainer}>
                        <View style={styles.labelWrapper}>
                            <Text style={styles.label}>Notificação de saída</Text> 
                        </View>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Ex: 5 min antes"
                            placeholderTextColor="#4A4D66" 
                            value={notificacao} 
                            onChangeText={setNotificacao} 
                            keyboardType="numeric" 
                            maxLength={2}
                        />
                    </View>
                </View>

                <View style={{height: 100}} />
            </ScrollView>

            <View style={[styles.footer, { opacity: isFormValid ? 1 : 0.5 }]}>
                <LoopiButton 
                    textButton="Criar Loop"  
                    icon="navigation" 
                    disabled={!isFormValid}
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
    },
    content: {
        flex: 1, 
        paddingHorizontal: 30, 
    },

    formGroup: {
        marginBottom: 20,
    },
    row: { 
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    
    timeRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 20, 
    },

    timeFieldContainer: {
        flex: 1, 
        marginHorizontal: 5,
    },

    labelWrapper: { 
        minHeight: 44, 
        justifyContent: 'flex-end', 
        marginBottom: 8, 
    },

    label: { 
        color: colors.TEXT_COLOR, 
        fontSize: 14, 
        fontFamily: "DMSans_700Bold",
        paddingBottom: 5,
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
    },

    suggestionItem: { 
        flexDirection: 'row', 
        padding: 12, 
        borderBottomWidth: 1, 
        borderBottomColor: colors.BORDER, 
        alignItems: 'center', 
    },

    suggestionText: { 
        color: colors.TEXT_COLOR, 
        marginLeft: 10, 
        fontSize: 14,
    },

    addButton: {
        marginLeft: 10, 
    },

    routeCard: { 
        backgroundColor: colors.CARD, 
        borderRadius: 16, 
        padding: 24, 
        marginBottom: 30, 
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
    },
});