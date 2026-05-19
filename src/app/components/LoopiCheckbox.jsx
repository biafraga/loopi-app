import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";

export default function LoopiCheckbox({ text, isChecked, onPress }){
    return(
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
            
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                {isChecked && <Feather name="check" size={16} color={colors.DARK_PRIMARY} />}
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
        backgroundColor: colors.CARD,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16, // Dá um espacinho entre um checkbox e outro
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    checkboxChecked: {
        backgroundColor: colors.PRIMARY, // Pinta o fundo quando ativado
    },
    text: {
        color: colors.TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        flex: 1, // Faz o texto quebrar de linha se for muito grande
        opacity: 0.8,
    }
});