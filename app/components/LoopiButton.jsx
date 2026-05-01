import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

const DARK_PRIMARY= "#0D0F1A";
const CARD= "#141629";
const BORDER= "#1C1F38";
const PRIMARY= "#C8F135";
const SECONDARY= "#6366F1";
const TEXT_COLOR= "#F4F4FF";
const FADED_TEXT_COLOR= "#ACACAC";


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
                        color={isOutline ? FADED_TEXT_COLOR : (isSecondary ? TEXT_COLOR : DARK_PRIMARY)} 
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
        backgroundColor: PRIMARY,
        padding: 16,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    
    buttonOutline: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: BORDER,
    },

    buttonSecondary: {
        backgroundColor: SECONDARY,
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
        color: DARK_PRIMARY,
        fontSize: 20,
        fontFamily: "DMSans_700Bold",
    },

    titleOutline: {
        color: FADED_TEXT_COLOR,
    },

    titleSecondary: {
        color: TEXT_COLOR,
    },

    titleSmall: {
        fontSize: 14,
    },
})