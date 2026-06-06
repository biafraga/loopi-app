import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import colors from "../theme/colors";
import EmptyStateScreen from "./EmptyStateScreen";

export default function HomeScreen({ userName = "Beatriz", navigation }) {

    const [hasRoutes, setHasRoutes] = useState(true);
    const [tripsCount, setTripsCount] = useState(0); 
    const isColdStart = tripsCount === 0;

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Bom dia";
        if (hour < 18) return "Boa tarde";
        return "Boa noite";
    };

    // Controla o modal de confirmação
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

    const [nextLoop, setNextLoop] = useState({
        time: isColdStart ? "--:--" : "05:18",
        origin: "Barra de Maricá",
        destination: "Centro, RJ"
    });

    const metrics = { timeSaved: isColdStart ? "--" : "1h23m", totalTrips: tripsCount };
    const myLoops = [
        {
            id: "1", 
            title: "Meus loops", 
            subtitle: isColdStart ? "Nenhuma viagem registrada" : `${tripsCount} viagens registradas`
        }
    ];

    if (!hasRoutes) {
        return <EmptyStateScreen navigation={navigation} />;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greetingText}>{getGreeting()}</Text>
                    <Text style={styles.nameText}>{userName}</Text>
                </View>
                <TouchableOpacity style={styles.notificationBtn}>
                    <Feather name="bell" size={20} color={colors.TEXT_COLOR} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                
                {/* HERO CARD (Astro Principal) */}
                {nextLoop ? (
                    <View style={styles.heroCard}>
                        <View style={styles.heroHeader}>
                            <Feather name="clock" size={14} color={colors.PRIMARY} />
                            <Text style={styles.heroTag}>PRÓXIMO LOOP</Text>
                        </View>
                        
                        <Text style={styles.heroSubtitle}>
                            {isColdStart ? "Aguardando 1ª viagem" : "Saída recomendada"}
                        </Text>
                    
                        <Text style={styles.heroTime}>
                            {isColdStart ? "--:--" : nextLoop.time}
                        </Text>

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

                        <View style={{ width: "65%", alignSelf: "center", marginBottom: 8 }}>
                            {/* O BOTÃO VERDE AGORA ABRE A CONFIRMAÇÃO */}
                            <LoopiButton 
                                textButton="INICIAR LOOP" 
                                icon="navigation"
                                size="small"
                                onPress={() => setBottomSheetVisible(true)} 
                            />
                        </View>
                    </View>
                ) : (
                    <View style={[styles.heroCard, { alignItems: 'center', paddingVertical: 40 }]}>
                        <Text style={styles.heroSubtitle}>Nenhuma viagem programada</Text>
                        <Text style={styles.orText}>Crie um novo trajeto para o Loopi te ajudar</Text>
                    </View>
                )}

                {/* MÉTRICAS RÁPIDAS */}
                <View style={styles.metricsRow}>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>TEMPO MÉDIO</Text>
                        <Text style={styles.metricValue}>
                            {isColdStart ? "--" : metrics.timeSaved}
                        </Text>
                        {isColdStart && <Text style={styles.helperText}>Aprendendo seu ritmo...</Text>}
                    </View>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>VIAGENS</Text>
                        <Text style={styles.SecondMetricValue}>{metrics.totalTrips}</Text>
                    </View>
                </View>

                {/* MEUS LOOPS */}
                {myLoops.map(loop => (
                    <TouchableOpacity key={loop.id} style={styles.loopCard}>
                        <View style={styles.loopIconContainer}>
                            <Feather name="clock" size={20} color={colors.PRIMARY} />
                        </View>
                        <View>
                            <Text style={styles.loopTitle}>{loop.title}</Text>
                            <Text style={styles.loopSubtitle}>{loop.subtitle}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </ScrollView>

            {/* O FAB AGORA É EXCLUSIVO PARA CRIAR ALGO NOVO */}
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("create_loop")}>
                <Feather name="plus" size={28} color={colors.DARK_PRIMARY} />
            </TouchableOpacity>

            {/* MODAL DE CONFIRMAÇÃO (BOTTOM SHEET) */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isBottomSheetVisible}
                onRequestClose={() => setBottomSheetVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    activeOpacity={1} 
                    onPressOut={() => setBottomSheetVisible(false)}
                >
                    <TouchableWithoutFeedback>
                        <View style={styles.bottomSheet}>
                            <Text style={styles.sheetPreTitle}>CONFIRMAÇÃO</Text>
                            <Text style={styles.sheetTitle}>Iniciar este trajeto?</Text>

                            <View style={styles.sheetCard}>
                                <View style={styles.sheetCardHeader}>
                                    <Text style={styles.sheetCardRoute}>{nextLoop.origin}</Text>
                                    <Feather name="arrow-right" size={16} color={colors.PRIMARY} style={{ marginHorizontal: 8 }} />
                                    <Text style={styles.sheetCardRoute}>{nextLoop.destination}</Text>
                                </View>
                                <Text style={styles.sheetCardDetails}>
                                    {isColdStart 
                                        ? "Primeira viagem. Pressione iniciar para o Loopi começar a aprender seu ritmo!" 
                                        : "Média: 2h10m  ·  Chegada prevista: 7h22m"}
                                </Text>
                            </View>

                            <View style={{ marginBottom: 16 }}>
                                <LoopiButton 
                                    textButton="INICIAR AGORA" 
                                    variant="secondary"
                                    icon="navigation"
                                    onPress={() => {
                                        setBottomSheetVisible(false);
                                        navigation.navigate("loop_started");
                                    }} 
                                />
                            </View>

                            {/* REMOVIDO: O link de "Alterar trajeto" */}

                            <View style={{ marginTop: 8 }}>
                                <LoopiButton 
                                    textButton="Cancelar" 
                                    variant="outline"
                                    onPress={() => setBottomSheetVisible(false)} 
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.DARK_PRIMARY,
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
        color: colors.FADED_TEXT_COLOR,
        fontSize: 16, 
        fontFamily: "DMSans_400Regular",
        marginBottom: 4, 
    },
    nameText: {
        color: colors.TEXT_COLOR,
        fontSize: 20, 
        fontFamily: "Unbounded_900Black",
    },
    notificationBtn: {
        width: 44, 
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.CARD, 
        borderWidth: 1,
        borderColor: colors.BORDER,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
    },
    heroCard: {
        backgroundColor: colors.CARD,
        borderRadius: 24,
        padding: 24, 
        marginBottom: 24,
        borderWidth: 1,
        borderColor: colors.BORDER,
    },
    heroHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    heroTag: {
        color: colors.PRIMARY,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        marginLeft: 8,
        letterSpacing: 1,
    },
    heroSubtitle: {
        color: colors.TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        marginBottom: 8, 
    },
    heroTime: {
        color: "#e2e2e2",
        fontSize: 55,
        fontFamily: "Unbounded_900Black",
        marginBottom: 16, 
        alignSelf: 'flex-start',
        textShadowColor: colors.SECONDARY,
        textShadowOffset: { width: 0, height: 4 }, 
        textShadowRadius: 12, 
    },
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
        backgroundColor: colors.PRIMARY,
    },
    dotPurple: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.SECONDARY,
    },
    dashedLine: {
        flex: 1,
        marginHorizontal: 12,
        height: 1,
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        borderStyle: "dashed",
    },
    routeTextRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    routeText: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 13,
        fontFamily: "DMSans_700Bold",
    },
    orText: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
        textAlign: "center",
    },
    metricsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    metricCard: {
        width: "48%",
        backgroundColor: colors.CARD,
        borderRadius: 16,
        padding: 20, 
        alignItems: "flex-start",
    },
    metricLabel: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 12, 
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 12,
    },
    metricValue: {
        color: colors.PRIMARY,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
    },
    SecondMetricValue:{
        color: colors.TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
    },
    helperText: {
        color: colors.PRIMARY, 
        fontSize: 12, 
        fontFamily: "DMSans_400Regular", 
        marginTop: 4 
    },
    loopCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.CARD,
        borderRadius: 16,
        padding: 16,
        marginBottom: 100, 
    },
    loopIconContainer: {
        width: 48, 
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.DARK_PRIMARY,
        borderWidth: 1,
        borderColor: colors.BORDER,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    loopTitle: {
        color: colors.TEXT_COLOR,
        fontSize: 18,
        fontFamily: "DMSans_700Bold",
        marginBottom: 4,
    },
    loopSubtitle: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
    },
    fab: {
        position: "absolute",
        bottom: 100, 
        right: 30,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.PRIMARY,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5, 
        shadowColor: colors.PRIMARY, 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "flex-end",
    },
    bottomSheet: {
        backgroundColor: colors.DARK_PRIMARY,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 30,
        paddingBottom: 40,
        borderWidth: 1,
        borderColor: colors.BORDER,
        borderBottomWidth: 0,
    },
    sheetPreTitle: {
        color: colors.PRIMARY,
        fontSize: 16,
        fontFamily: "DMSans_400Regular",
        letterSpacing: 1,
        marginBottom: 8,
    },
    sheetTitle: {
        color: colors.TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
        marginBottom: 24,
    },
    sheetCard: {
        backgroundColor: "rgba(200, 241, 53, 0.05)",
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },
    sheetCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    sheetCardRoute: {
        color: colors.PRIMARY,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    },
    sheetCardDetails: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        lineHeight: 18,
    }
});