import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from '../theme/colors';

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
                        color={colors.PRIMARY} 
                        style={styles.icon} 
                    />
                )}

                <TextInput 
                    style={styles.input}
                    placeholderTextColor={colors.FADED_TEXT_COLOR}
                    secureTextEntry={isSecure}
                    {...rest}
                />

                {isPassword && (
                    <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                        <Feather 
                            name={isSecure ? "eye-off" : "eye"} // Troca o ícone dinamicamente
                            size={20} 
                            color={colors.FADED_TEXT_COLOR} 
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
        color: colors.TEXT_COLOR,
        opacity: 0.8,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.CARD,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.PRIMARY, 
        paddingHorizontal: 14,
        height: 52,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: colors.TEXT_COLOR,
        fontSize: 18,
        fontFamily: "DMSans_400Regular",
    },
});