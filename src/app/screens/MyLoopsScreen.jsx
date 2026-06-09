import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme/colors";

export default function MyLoopsScreen({ navigation }) {
    // MOCK DE DADOS
    const [savedLoops, setSavedLoops] = useState([
        { 
            id: "1", 
            origin: "Barra de Maricá", 
            destination: "Centro RJ", 
            arrivalTime: "07:40", 
            days: "Terças e Quintas" 
        },
        { 
            id: "2", 
            origin: "Casa", 
            destination: "Faculdade", 
            arrivalTime: "18:30", 
            days: "Segunda a Sexta" 
        }
    ]);

    // Estados do Modal de Exclusão
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [loopToDelete, setLoopToDelete] = useState(null);

    const MAX_LOOPS = 3;
    const isLimitReached = savedLoops.length >= MAX_LOOPS;

    // Funções do Modal
    const handleOpenDeleteModal = (loop) => {
        setLoopToDelete(loop);
        setDeleteModalVisible(true);
    };

    const handleConfirmDelete = () => {
        // Filtra a lista, removendo o loop que tem o ID selecionado
        setSavedLoops(savedLoops.filter(loop => loop.id !== loopToDelete.id));
        setDeleteModalVisible(false);
        setLoopToDelete(null);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color={colors.TEXT_COLOR} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.preTitle}>GESTÃO</Text>
                    <Text style={styles.titleText}>Meus Trajetos</Text>
                </View>
            </View>

            <ScrollView 
                style={styles.content} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* HEADER DA LISTA E CONTADOR */}
                <View style={styles.listHeader}>
                    <Text style={styles.listSubtitle}>Trajetos salvos</Text>
                    <Text style={styles.countText}>
                        {savedLoops.length} de {MAX_LOOPS}
                    </Text>
                </View>

                {/* ESTADO VAZIO */}
                {savedLoops.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Feather name="map-pin" size={48} color={colors.BORDER} style={{ marginBottom: 16 }} />
                        <Text style={styles.emptyTitle}>Nenhum trajeto ainda</Text>
                        <Text style={styles.emptyText}>Adicione seu primeiro trajeto para o Loopi começar a aprender sua rotina.</Text>
                    </View>
                ) : (
                    /* LISTA DE LOOPS */
                    savedLoops.map((loop) => (
                        <View key={loop.id} style={styles.loopCard}>
                            
                            <View style={styles.cardHeader}>
                                <View style={styles.arrivalBadge}>
                                    <Feather name="clock" size={14} color={colors.DARK_PRIMARY} style={{ marginRight: 6 }} />
                                    <Text style={styles.arrivalText}>Chegada às {loop.arrivalTime}</Text>
                                </View>
                                
                                {/* BOTÃO DE LIXEIRA */}
                                <TouchableOpacity 
                                    style={styles.deleteButton}
                                    onPress={() => handleOpenDeleteModal(loop)}
                                >
                                    <Feather name="trash-2" size={20} color={colors.DANGER} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.routeContainer}>
                                <Text style={styles.locationText}>{loop.origin}</Text>
                                <Feather name="arrow-right" size={16} color={colors.FADED_TEXT_COLOR} style={{ marginHorizontal: 8 }} />
                                <Text style={styles.locationText}>{loop.destination}</Text>
                            </View>

                            <View style={styles.cardFooter}>
                                <Feather name="calendar" size={14} color={colors.FADED_TEXT_COLOR} style={{ marginRight: 6 }} />
                                <Text style={styles.daysText}>{loop.days}</Text>
                            </View>

                        </View>
                    ))
                )}

                {/* REGRA DE NEGÓCIO: BLOQUEIO OU NOVO TRAJETO */}
                {isLimitReached ? (
                    <View style={styles.limitWarning}>
                        <Feather name="info" size={20} color={colors.SECONDARY} style={{ marginRight: 12 }} />
                        <Text style={styles.limitText}>Você atingiu o limite de {MAX_LOOPS} trajetos. Exclua um para criar novos.</Text>
                    </View>
                ) : (
                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={() => navigation.navigate("create_loop")}
                    >
                        <Feather name="plus" size={20} color={colors.PRIMARY} style={{ marginRight: 8 }} />
                        <Text style={styles.addButtonText}>Adicionar Trajeto</Text>
                    </TouchableOpacity>
                )}

            </ScrollView>

            {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isDeleteModalVisible}
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        
                        <View style={styles.modalIconContainer}>
                            <Feather name="alert-triangle" size={32} color={colors.DANGER} />
                        </View>

                        <Text style={styles.modalTitle}>Excluir trajeto?</Text>
                        <Text style={styles.modalSubtitle}>
                            Tem certeza que deseja excluir o trajeto de <Text style={{ color: colors.TEXT_COLOR, fontFamily: "DMSans_700Bold" }}>{loopToDelete?.origin}</Text> para <Text style={{ color: colors.TEXT_COLOR, fontFamily: "DMSans_700Bold" }}>{loopToDelete?.destination}</Text>? Essa ação não pode ser desfeita.
                        </Text>

                        <View style={styles.modalButtonsRow}>
                            <TouchableOpacity 
                                style={styles.modalCancelBtn}
                                onPress={() => setDeleteModalVisible(false)}
                            >
                                <Text style={styles.modalCancelBtnText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.modalDeleteBtn}
                                onPress={handleConfirmDelete}
                            >
                                <Text style={styles.modalDeleteBtnText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
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
        alignItems: "center",
        paddingHorizontal: 30,
        paddingTop: 30,
        paddingBottom: 20,
    },

    backButton: {
        marginRight: 16,
    },

    preTitle: {
        color: colors.PRIMARY,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
        letterSpacing: 1,
        marginBottom: 2,
        textTransform: "uppercase",
    },

    titleText: {
        color: colors.TEXT_COLOR,
        fontSize: 28,
        fontFamily: "Nunito_900Black",
    },

    content: {
        flex: 1,
        paddingHorizontal: 30,
    },

    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },

    listSubtitle: {
        color: colors.TEXT_COLOR,
        fontSize: 18,
        fontFamily: "DMSans_700Bold",
    },

    countText: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_700Bold",
    },

    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
        backgroundColor: colors.CARD,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.BORDER,
        borderStyle: "dashed",
        marginBottom: 24,
    },

    emptyTitle: {
        color: colors.TEXT_COLOR,
        fontSize: 18,
        fontFamily: "DMSans_700Bold",
        marginBottom: 8,
    },

    emptyText: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        textAlign: "center",
        paddingHorizontal: 40,
    },

    loopCard: {
        backgroundColor: colors.CARD,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.BORDER,
        padding: 20,
        marginBottom: 16,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },

    arrivalBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.PRIMARY,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },

    arrivalText: {
        color: colors.DARK_PRIMARY,
        fontSize: 12,
        fontFamily: "DMSans_700Bold",
    },

    deleteButton: {
        padding: 4,
    },

    routeContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 16,
    },

    locationText: {
        color: colors.TEXT_COLOR,
        fontSize: 16,
        fontFamily: "Nunito_900Black",
    },

    cardFooter: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: colors.BORDER,
        paddingTop: 16,
    },

    daysText: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
    },

    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        borderRadius: 24,
        paddingVertical: 16,
        marginTop: 8,
    },

    addButtonText: {
        color: colors.PRIMARY,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    },

    limitWarning: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(235, 87, 87, 0.1)",
        borderWidth: 1,
        borderColor: colors.SECONDARY,
        borderRadius: 16,
        padding: 16,
        marginTop: 8,
    },

    limitText: {
        flex: 1,
        color: colors.TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        lineHeight: 20,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    
    modalCard: {
        backgroundColor: colors.DARK_PRIMARY,
        borderRadius: 24,
        padding: 24,
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.BORDER,
    },

    modalIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "rgba(235, 87, 87, 0.1)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },

    modalTitle: {
        color: colors.TEXT_COLOR,
        fontSize: 22,
        fontFamily: "Nunito_900Black",
        marginBottom: 8,
    },

    modalSubtitle: {
        color: colors.FADED_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "DMSans_400Regular",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 32,
    },

    modalButtonsRow: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },

    modalCancelBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.BORDER,
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: "center",
        marginRight: 8,
    },

    modalCancelBtnText: {
        color: colors.TEXT_COLOR,
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    },

    modalDeleteBtn: {
        flex: 1,
        backgroundColor: colors.DANGER,
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: "center",
        marginLeft: 8,
    },

    modalDeleteBtnText: {
        color: "#FFF",
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
    },
});