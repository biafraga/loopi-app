import { Feather } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../components/Menu";

const DARK_PRIMARY = "#0D0F1A";
const CARD = "#141629";
const BORDER = "#1C1F38";
const PRIMARY = "#C8F135";
const DANGER = "#FF5252";
const TEXT_COLOR = "#F4F4FF";
const FADED_TEXT_COLOR = "#ACACAC";

export default function ProfileScreen() {
    // MOCK DE DADOS DO USUÁRIO
    const user = {
        name: "Beatriz Fraga",
        email: "bia@email.com",
        initial: "B",
        loopsCount: 1
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            
            {/* CABEÇALHO */}
            <View style={styles.header}>
                <Text style={styles.preTitle}>CONTA</Text>
                <Text style={styles.titleText}>Perfil</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                
                {/* ÁREA DO USUÁRIO */}
                <View style={styles.userInfoSection}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{user.initial}</Text>
                    </View>
                    
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                    </View>
                    
                    <TouchableOpacity>
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                </View>

                {/* CARD "MEUS LOOPS" */}
                <View style={styles.loopsCard}>
                    <View style={styles.loopsCardLeft}>
                        <Feather name="smile" size={24} color={PRIMARY} />
                        <View style={styles.loopsCardText}>
                            <Text style={styles.loopsCardTitle}>Meus loops</Text>
                            <Text style={styles.loopsCardSubtitle}>{user.loopsCount} trajeto cadastrado</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.newLoopText}>+ Novo</Text>
                    </TouchableOpacity>
                </View>

                {/* LISTA DE OPÇÕES (MENU) */}
                <View style={styles.optionsList}>
                    
                    <TouchableOpacity style={styles.optionItem}>
                        <Feather name="bell" size={20} color={FADED_TEXT_COLOR} style={styles.optionIcon} />
                        <Text style={styles.optionText}>Notificações</Text>
                        <Feather name="chevron-right" size={20} color={FADED_TEXT_COLOR} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionItem}>
                        <Feather name="shield" size={20} color={FADED_TEXT_COLOR} style={styles.optionIcon} />
                        <Text style={styles.optionText}>Privacidade</Text>
                        <Feather name="chevron-right" size={20} color={FADED_TEXT_COLOR} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionItem}>
                        <Feather name="help-circle" size={20} color={FADED_TEXT_COLOR} style={styles.optionIcon} />
                        <Text style={styles.optionText}>Ajuda</Text>
                        <Feather name="chevron-right" size={20} color={FADED_TEXT_COLOR} />
                    </TouchableOpacity>

                    {/* BOTÃO DE SAIR (Com cor de Danger) */}
                    <TouchableOpacity style={[styles.optionItem, { borderBottomWidth: 0 }]}>
                        <Feather name="log-out" size={20} color={DANGER} style={styles.optionIcon} />
                        <Text style={[styles.optionText, { color: DANGER }]}>Sair</Text>
                    </TouchableOpacity>
                    
                </View>

                <View style={{ height: 100 }} /> 
            </ScrollView>

            <Menu activeTab="profile" />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: DARK_PRIMARY,
    },

    header: {
        paddingHorizontal: 30,
        paddingTop: 30,
        paddingBottom: 20,
    },

    preTitle: {
        color: PRIMARY,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 4,
        textTransform: "uppercase",
    },

    titleText: {
        color: TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
    },

    content: {
        flex: 1,
        paddingHorizontal: 30,
    },

    userInfoSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 32,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
        paddingBottom: 24,
    },

    avatarContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: PRIMARY,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },

    avatarText: {
        color: DARK_PRIMARY,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
    },

    userDetails: {
        flex: 1,
    },

    userName: {
        color: TEXT_COLOR,
        fontSize: 18,
        fontFamily: "DMSans_700Bold",
        marginBottom: 4,
    },

    userEmail: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
    },

    editButtonText: {
        color: PRIMARY,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
    },

    loopsCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(200, 241, 53, 0.05)",
        borderWidth: 1,
        borderColor: PRIMARY,
        borderRadius: 16,
        padding: 20,
        marginBottom: 32,
    },

    loopsCardLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    loopsCardText: {
        marginLeft: 12,
    },

    loopsCardTitle: {
        color: PRIMARY,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
        marginBottom: 4,
    },

    loopsCardSubtitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 12,
        fontFamily: "DMSans_400Regular",
    },

    newLoopText: {
        color: PRIMARY,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    },

    optionsList: {
        backgroundColor: CARD,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: BORDER,
        paddingHorizontal: 20,
    },

    optionItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },

    optionIcon: {
        marginRight: 16,
    },

    optionText: {
        flex: 1,
        color: TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
    }
});