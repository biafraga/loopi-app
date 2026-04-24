import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../components/Menu";

const DARK_PRIMARY = "#0D0F1A";
const CARD = "#141629";
const BORDER = "#1C1F38";
const PRIMARY = "#C8F135";
const SECONDARY = "#6366F1";
const TEXT_COLOR = "#F4F4FF";
const FADED_TEXT_COLOR = "#ACACAC";

export default function HomeScreen({ userName = "Beatriz" }) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Bom dia";
        if (hour < 18) return "Boa tarde";
        return "Boa noite";
    };

    const [nextLoop, setNextLoop] = useState({
        time: "05:18",
        origin: "Barra de Maricá",
        destination: "Centro, RJ"
    });

    const metrics = { timeSaved: "1h23m", totalTrips: 16 };
    const myLoops = [
        { id: "1", title: "Meus loops", subtitle: "1 trajeto cadastrado" }
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* HEADER INTELIGENTE */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greetingText}>{getGreeting()}</Text>
                    <Text style={styles.nameText}>{userName}</Text>
                </View>
                <TouchableOpacity style={styles.notificationBtn}>
                    <Feather name="bell" size={20} color={TEXT_COLOR} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                
                {/* HERO CARD */}
                {nextLoop ? (
                    <View style={styles.heroCard}>
                        {/* Cabeçalho */}
                        <View style={styles.heroHeader}>
                            <Feather name="clock" size={14} color={PRIMARY} />
                            <Text style={styles.heroTag}>PRÓXIMO LOOP</Text>
                        </View>
                        
                        <Text style={styles.heroSubtitle}>Saída recomendada</Text>
                        
                        {/* Horário Gigante na Esquerda */}
                        <Text style={styles.heroTime}>{nextLoop.time}</Text>

                        {/* Rota Tracejada */}
                        <View style={styles.routeSection}>
                            <View style={styles.routeDotsRow}>
                                <View style={styles.dotGreen} />
                                <View style={styles.dashedLine} />
                                <View style={styles.dotPurple} />
                            </View>
                            <View style={styles.routeTextRow}>
                                <Text style={styles.routeText}>{nextLoop.origin}</Text>
                                <Text style={styles.routeText}>{nextLoop.destination}</Text>
                            </View>
                        </View>

                        {/* Botão Centralizado e arredondado */}
                        <TouchableOpacity style={styles.primaryButton}>
                            <Feather name="navigation" size={16} color={DARK_PRIMARY} style={{ marginRight: 8 }} />
                            <Text style={styles.primaryButtonText}>INICIAR LOOP</Text>
                        </TouchableOpacity>

                        {/* Texto ou criar novo */}
                        <Text style={styles.orText}>ou criar novo loop</Text>
                    </View>
                ) : (
                    <View style={[styles.heroCard, { alignItems: 'center', paddingVertical: 40 }]}>
                        <Text style={styles.heroSubtitle}>Nenhuma viagem programada</Text>
                        <Text style={styles.orText}>Crie um novo trajeto para o Loopi te ajudar</Text>
                    </View>
                )}

                {/* MÉTRICAS RÁPIDAS (Voltaram!) */}
                <View style={styles.metricsRow}>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>TEMPO MÉDIO</Text>
                        <Text style={styles.metricValue}>{metrics.timeSaved}</Text>
                    </View>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>Viagens</Text>
                        <Text style={styles.metricValue}>{metrics.totalTrips}</Text>
                    </View>
                </View>

                {/* MEUS LOOPS (Voltaram!) */}
                {myLoops.map(loop => (
                    <TouchableOpacity key={loop.id} style={styles.loopCard}>
                        <View style={styles.loopIconContainer}>
                            <Feather name="clock" size={20} color={PRIMARY} />
                        </View>
                        <View>
                            <Text style={styles.loopTitle}>{loop.title}</Text>
                            <Text style={styles.loopSubtitle}>{loop.subtitle}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </ScrollView>

            {/* FAB */}
            <TouchableOpacity style={styles.fab} onPress={() => console.log("Ir para Nova Origem")}>
                <Feather name="plus" size={28} color={DARK_PRIMARY} />
            </TouchableOpacity>

            <Menu activeTab="home" />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: DARK_PRIMARY,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingTop: 30, 
        paddingBottom: 24,
    },
    greetingText: {
        color: FADED_TEXT_COLOR,
        fontSize: 16, 
        fontFamily: "DMSans_400Regular",
        marginBottom: 4, 
    },
    nameText: {
        color: TEXT_COLOR,
        fontSize: 20, 
        fontFamily: "Unbounded_900Black",
    },
    notificationBtn: {
        width: 44, 
        height: 44,
        borderRadius: 22,
        backgroundColor: CARD, 
        borderWidth: 1,
        borderColor: BORDER,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
    },
    // --- Hero Card ---
    heroCard: {
        backgroundColor: CARD,
        borderRadius: 24,
        padding: 24, 
        marginBottom: 24,
        borderWidth: 1,
        borderColor: BORDER,
    },
    heroHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    heroTag: {
        color: PRIMARY,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        marginLeft: 8,
        letterSpacing: 1,
    },
    heroSubtitle: {
        color: TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        marginBottom: 8, 
    },
    heroTime: {
        color: TEXT_COLOR,
        fontSize: 55,
        fontFamily: "Unbounded_900Black",
        marginBottom: 16, 
        alignSelf: 'flex-start', // Fica colado na esquerda!
        textShadowColor: 'rgba(255, 255, 255, 0.2)', 
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    // --- Rota Tracejada ---
    routeSection: {
        marginBottom: 24,
    },
    routeDotsRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        paddingHorizontal: 4, 
    },
    dotGreen: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: PRIMARY,
    },
    dotPurple: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: SECONDARY,
    },
    dashedLine: {
        flex: 1,
        marginHorizontal: 12,
        height: 1,
        borderWidth: 1,
        borderColor: PRIMARY,
        borderStyle: "dashed",
    },
    routeTextRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    routeText: {
        color: FADED_TEXT_COLOR,
        fontSize: 13,
        fontFamily: "DMSans_700Bold",
    },
    // --- Botão e Texto ---
    primaryButton: {
        backgroundColor: PRIMARY,
        borderRadius: 24, // Bem arredondado como no seu design
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // Centraliza o texto e ícone no botão
        alignSelf: "center", // Centraliza o botão no card
        width: "85%", // Não ocupa tudo, dá as margens laterais
        paddingVertical: 14,
        marginBottom: 16,
    },
    primaryButtonText: {
        color: DARK_PRIMARY,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    },
    orText: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
        textAlign: "center", // Centralizado abaixo do botão
    },
    // --- Metrics (Metade inferior recuperada!) ---
    metricsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    metricCard: {
        width: "48%",
        backgroundColor: CARD,
        borderRadius: 16,
        padding: 20, 
        alignItems: "flex-start",
    },
    metricLabel: {
        color: FADED_TEXT_COLOR,
        fontSize: 12, 
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 12,
    },
    metricValue: {
        color: PRIMARY,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
    },
    // --- List ---
    loopCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: CARD,
        borderRadius: 16,
        padding: 16,
        marginBottom: 100, // Espaço para o FAB não cobrir
    },
    loopIconContainer: {
        width: 48, 
        height: 48,
        borderRadius: 12,
        backgroundColor: DARK_PRIMARY,
        borderWidth: 1,
        borderColor: BORDER,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    loopTitle: {
        color: TEXT_COLOR,
        fontSize: 18,
        fontFamily: "DMSans_700Bold",
        marginBottom: 4,
    },
    loopSubtitle: {
        color: FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
    },
    // --- FAB ---
    fab: {
        position: "absolute",
        bottom: 100, 
        right: 30,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: PRIMARY,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5, 
        shadowColor: PRIMARY, 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    }
});