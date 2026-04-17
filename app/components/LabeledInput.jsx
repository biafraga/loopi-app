import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from 'react';

const DARK_PRIMARY= "#0D0F1A";
const CARD= "#141629";
const BORDER= "#1C1F38";
const PRIMARY= "#C8F135";
const SECONDARY= "#6366F1";
const TEXT_COLOR= "#F4F4FF";
const FADED_TEXT_COLOR= "#ACACAC";

export default function LabeledInput ({ label, iconName, isPassword, ...rest }) {

    const [isSecure, setIsSecure] = useState(isPassword);

    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{ label ? label : "Não informado" }</Text>

            <View style={styles.inputContainer}>
                {iconName && (
                    <Feather 
                        name={iconName} 
                        size={20} 
                        color={PRIMARY} 
                        style={styles.icon} 
                    />
                )}

                <TextInput 
                    style={styles.input}
                    placeholderTextColor="#888888"
                    secureTextEntry={isSecure}
                    {...rest}
                />

                {isPassword && (
                    <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                        <Feather 
                            name={isSecure ? "eye-off" : "eye"} // Troca o ícone dinamicamente
                            size={20} 
                            color={FADED_TEXT_COLOR} 
                        />
                    </TouchableOpacity>
                )}


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
        color: TEXT_COLOR,
        opacity: 0.8,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: CARD,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: PRIMARY, 
        paddingHorizontal: 14,
        height: 52,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: TEXT_COLOR,
        fontSize: 18,
        fontFamily: "DMSans_400Regular",
    },
});