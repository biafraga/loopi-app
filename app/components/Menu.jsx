import { Feather } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from '../theme/colors';

export default function Menu({ activeTab = "home" }){

    const tabs = [
        { id: "home", icon: "home" },
        { id: "history", icon: "clock" },
        { id: "stats", icon: "bar-chart-2" },
        { id: "profile", icon: "user" },
    ];

    return (
            <View style={styles.container}>
                {tabs.map((tab) => (
                    <TouchableOpacity 
                        key={tab.id} 
                        style={styles.tabButton}
                        onPress={() => console.log(`Navegar para: ${tab.id}`)}
                    >
                        <Feather 
                            name={tab.icon} 
                            size={24} 
                            // Usa o verde principal se estiver ativo, senão usa a cor apagada do texto
                            color={activeTab === tab.id ? colors.PRIMARY : colors.FADED_TEXT_COLOR} 
                        />
                    </TouchableOpacity>
                ))}
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: colors.DARK_PRIMARY,
        paddingVertical: 16,
        paddingBottom: 24,
        borderTopWidth: 1,
        borderTopColor: colors.BORDER,
    },
    tabButton: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    }
});