import { Pressable, StyleSheet, Text } from "react-native";
import { LoopiColors } from "../../constants/Colors";

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
        backgroundColor: LoopiColors.primary,
        padding: 16,
        marginHorizontal: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },

    title:{
        color: LoopiColors.darkPrimary,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "DMSans_700Bold",
    },
    buttonOutline: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: LoopiColors.border,
    },
    titleOutline: {
        color: LoopiColors.fadedTextColor,
    },
})