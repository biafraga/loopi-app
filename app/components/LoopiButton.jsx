import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../theme/colors";


export default function LoopiButton({ textButton, onPress, variant = "primary", icon, size = "default" }){

    const isOutline = variant === "outline";
    const isSecondary = variant === "secondary";
    const isSmall = size === "small";

    return(
        <Pressable 
            style={[
                styles.button, 
                isOutline && styles.buttonOutline,
                isSecondary && styles.buttonSecondary,
                isSmall && styles.buttonSmall
            ]} 
            onPress={onPress}
        >
            <View style={styles.contentRow}>
                {icon && (
                    <Feather 
                        name={icon} 
                        size={isSmall ? 16 : 18}
                        color={isOutline ? colors.FADED_TEXT_COLOR : (isSecondary ? colors.TEXT_COLOR : colors.DARK_PRIMARY)} 
                        style={styles.iconSpacing} 
                    />
                )}
                <Text 
                    style={[
                        styles.title, 
                        isOutline && styles.titleOutline,
                        isSecondary && styles.titleSecondary,
                        isSmall && styles.titleSmall
                    ]}
                >
                    {textButton ? textButton : "Não informado"}
                </Text>
            </View>
        </Pressable>
    )
}

const styles= StyleSheet.create({
    button:{
        width: "100%",
        backgroundColor: colors.PRIMARY,
        padding: 16,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    
    buttonOutline: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: colors.BORDER,
    },

    buttonSecondary: {
<<<<<<< HEAD
        backgroundColor: colors.SECONDARY,
=======
        backgroundColor: SECONDARY,
        
>>>>>>> bb2a0894ea7b44feddc60bd3b35f7955dc7358ad
    },

    buttonSmall: {
        padding: 12,
    },

    contentRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    iconSpacing: {
        marginRight: 8,
    },

    title:{
        color: colors.DARK_PRIMARY,
        fontSize: 20,
        fontFamily: "DMSans_700Bold",
    },

    titleOutline: {
        color: colors.FADED_TEXT_COLOR,
    },

    titleSecondary: {
        color: colors.TEXT_COLOR,
    },

    titleSmall: {
        fontSize: 14,
    },
})