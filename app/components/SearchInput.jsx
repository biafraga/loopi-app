import { Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";


const DARK_PRIMARY= "#0D0F1A";
const CARD= "#141629";
const BORDER= "#1C1F38";
const PRIMARY= "#C8F135";
const SECONDARY= "#6366F1";
const TEXT_COLOR= "#F4F4FF";
const FADED_TEXT_COLOR= "#ACACAC";

export default function SearchInput({ placeholder, value, onChangeText }){
    return(
        <View style={styles.container}>
            <Feather name="search" size={20} color={PRIMARY} style={styles.icon} />

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={FADED_TEXT_COLOR}
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
        backgroundColor: CARD,
        borderWidth: 1,
        borderColor: BORDER,
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
        color: TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
    },
})