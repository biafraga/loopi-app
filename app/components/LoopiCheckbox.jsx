import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';

const DARK_PRIMARY= "#0D0F1A";
const CARD= "#141629";
const BORDER= "#1C1F38";
const PRIMARY= "#C8F135";
const SECONDARY= "#6366F1";
const TEXT_COLOR= "#F4F4FF";
const FADED_TEXT_COLOR= "#ACACAC";

export default function LoopiCheckbox({ text, isChecked, onPress }){
    return(
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
            
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                {isChecked && <Feather name="check" size={16} color={DARK_PRIMARY} />}
            </View>

            {/* O texto do lado */}
            <Text style={styles.text}>{text}</Text>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: CARD,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16, // Dá um espacinho entre um checkbox e outro
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    checkboxChecked: {
        backgroundColor: PRIMARY, // Pinta o fundo quando ativado
    },
    text: {
        color: TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        flex: 1, // Faz o texto quebrar de linha se for muito grande
        opacity: 0.8,
    }
});