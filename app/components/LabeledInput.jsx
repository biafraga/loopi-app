import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View } from "react-native";
import { LoopiColors } from "../../constants/Colors";

export default function LabeledInput ({ label, iconName, ...rest }) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{ label ? label : "Não informado" }</Text>

            <View style={styles.inputContainer}>
                {iconName && (
                    <Feather 
                        name={iconName} 
                        size={20} 
                        color={LoopiColors.primary} 
                        style={styles.icon} 
                    />
                )}

                <TextInput 
                    style={styles.input}
                    placeholderTextColor="#888888"
                    {...rest}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
        color: LoopiColors.textColor,
        opacity: 0.8,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: LoopiColors.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: LoopiColors.card, 
        paddingHorizontal: 14,
        height: 52,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: LoopiColors.textColor,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
    },
});