import { Pressable, StyleSheet, Text } from "react-native"
import { LoopiColors } from "../constants/Colors"

export default function LoopiButton({ textButton, onPress }){
    return(
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.title}>
                {textButton ? textButton : "Não informado"}
            </Text>
        </Pressable>
    )
}

const styles= StyleSheet.create({
    button:{
        backgroundColor: LoopiColors.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    title:{
        color: LoopiColors.darkPrimary,
        fontSize: 18,
        fontWeight: "bold",
    },
})