import { Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../theme/colors";

export default function SearchInput({ placeholder, value, onChangeText }){
    return(
        <View style={styles.container}>
            <Feather name="search" size={20} color={colors.PRIMARY} style={styles.icon} />

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={colors.FADED_TEXT_COLOR}
                value={value}
                onChangeText={onChangeText}
                returnKeyType="search"
            />

        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.CARD,
        borderWidth: 1,
        borderColor: colors.BORDER,
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56, // Mesma altura do seu botão para manter o padrão
        width: "100%",
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1, // Faz o campo de texto preencher todo o resto do espaço
        color: colors.TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
    },
})