import { Pressable, StyleSheet, Text } from "react-native";

const DARK_PRIMARY= "#0D0F1A";
const CARD= "#141629";
const BORDER= "#1C1F38";
const PRIMARY= "#C8F135";
const SECONDARY= "#6366F1";
const TEXT_COLOR= "#F4F4FF";
const FADED_TEXT_COLOR= "#ACACAC";


export default function LoopiButton({ textButton, onPress, variant = "primary" }){

    const isOutline = variant === "outline";

    return(
        <Pressable style={[styles.button, isOutline && styles.buttonOutline]} onPress={onPress}>
            <Text style={[styles.title, isOutline && styles.titleOutline]}>
                {textButton ? textButton : "Não informado"}
            </Text>
        </Pressable>
    )
}

const styles= StyleSheet.create({
    button:{
        backgroundColor: PRIMARY,
        padding: 16,
        marginHorizontal: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },

    title:{
        color: DARK_PRIMARY,
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "DMSans_700Bold",
    },
    buttonOutline: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: BORDER,
    },
    titleOutline: {
        color: FADED_TEXT_COLOR,
    },
})