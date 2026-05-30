import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoopiButton from "../components/LoopiButton";
import LoopiMascot from "../components/LoopiMascot";
import colors from "../theme/colors";

const { width } = Dimensions.get("window"); 

export default function OnboardingScreen({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / width);
    
    if (activeIndex !== currentIndex) {
      setActiveIndex(currentIndex);
    }
  };

  const handleNext = () => {
    if (activeIndex === 2) {
      navigation.navigate("register");
    } else {
      const nextIndex = activeIndex + 1;
      scrollViewRef.current?.scrollTo({ x: width * nextIndex, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* 1. BOLINHAS */}
      <View style={styles.progressWrapper}>
        {[0, 1, 2].map((index) => (
          <View 
            key={index} 
            style={[
              styles.progressDot, 
              index === activeIndex && styles.progressDotActive
            ]} 
          />
        ))}
      </View>

      {/* CARROSSEL PRINCIPAL */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        
        {/* SLIDE 1 */}
        <View style={[styles.slideContainer, { width }]}>
          <View style={styles.mascotContainer}>
            <LoopiMascot state="normal" size={180} />
          </View>
          <Text style={styles.title}>
            O app que{"\n"}
            <Text style={styles.highlight}>aprende</Text> com você
          </Text>
          <Text style={styles.description}>
            Quanto mais você usa, mais inteligente ele fica. Sem dados genéricos, só o seu histórico real.
          </Text>
        </View>

        {/* SLIDE 2 (COMO FUNCIONA) */}
        <View style={[styles.slideContainerTop, { width }]}>
          <Text style={styles.overline}>COMO FUNCIONA</Text>
          <Text style={styles.titleLeft}>3 passos simples</Text>
          <View style={styles.cardsContainer}>
            {[
              { id: "1", title: "Cadastre seu trajeto", desc: "Origem, destino e hora que precisa chegar" },
              { id: "2", title: "Use todo dia", desc: "O app registra sua saída e chegada automaticamente" },
              { id: "3", title: "Receba sua hora certa", desc: "Notificação personalizada baseada no seu histórico" }
            ].map((s) => (
              <View key={s.id} style={styles.card}>
                <View style={styles.numberBadge}><Text style={styles.numberText}>{s.id}</Text></View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{s.title}</Text>
                  <Text style={styles.cardDescription}>{s.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* SLIDE 3 (PERMISSÕES) */}
        <View style={{ width, flex: 1 }}>
          <ScrollView 
            contentContainerStyle={styles.slideContainerTopScroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.mascotContainerCenter}>
              <LoopiMascot state="alerta" size={160} />
            </View>
            <Text style={styles.titleCenter}>Preciso de duas permissões</Text>
            <Text style={styles.descriptionCenter}>
              Para funcionar, o Loopi precisa da sua localização e permissão para enviar notificações.
            </Text>
            <View style={styles.cardsContainer}>
              <View style={styles.permissionCard}>
                <Feather name="map-pin" size={24} color={colors.PRIMARY} style={styles.icon} />
                <Text style={styles.permissionText}>
                  <Text style={styles.permissionTitle}>Localização</Text> — detectar saída e chegada
                </Text>
              </View>
              <View style={styles.permissionCard}>
                <Feather name="bell" size={24} color={colors.PRIMARY} style={styles.icon} />
                <Text style={styles.permissionText}>
                  <Text style={styles.permissionTitle}>Notificações</Text> — avisar hora de sair
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>

      </ScrollView>

      {/* BOTÃO DO RODAPÉ */}
      <View style={styles.buttonContainer}>
        <LoopiButton 
          textButton={activeIndex === 2 ? "Permitir e começar" : "Próximo"} 
          onPress={handleNext} 
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DARK_PRIMARY,
  },
  
  progressWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 40, 
    marginBottom: 20, 
  },

  progressDot: {
    height: 10,
    width: 20,
    backgroundColor: colors.BORDER,
    borderRadius: 5,
  },

  progressDotActive: {
    width: 40,
    backgroundColor: colors.PRIMARY,
  },

  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingBottom: 40,
  },

  slideContainerTop: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20, 
    paddingBottom: 40,
  },

  slideContainerTopScroll: {
    flexGrow: 1, 
    paddingHorizontal: 30,
    paddingTop: 20, 
    paddingBottom: 40,
  },

  mascotContainer: {
    marginBottom: 30,
  },

  mascotContainerCenter: {
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    color: colors.TEXT_COLOR,
    fontSize: 32,
    fontFamily: "Nunito_900Black",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 40,
  },

  titleCenter: {
    color: colors.TEXT_COLOR,
    fontSize: 26,
    fontFamily: "Nunito_900Black",
    textAlign: "center",
    marginBottom: 16,
  },

  titleLeft: {
    color: colors.TEXT_COLOR,
    fontSize: 28,
    fontFamily: "Nunito_900Black",
    marginBottom: 32,
  },

  highlight: {
    color: colors.PRIMARY,
  },

  description: {
    color: colors.FADED_TEXT_COLOR,
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    textAlign: "center",
    lineHeight: 24,
  },

  descriptionCenter: {
    color: colors.FADED_TEXT_COLOR,
    fontSize: 15,
    fontFamily: "DMSans_400Regular",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },

  overline: {
    color: colors.PRIMARY,
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },

  cardsContainer: {
    width: "100%",
    gap: 16,
  },

  card: {
    flexDirection: "row",
    backgroundColor: colors.CARD,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },

  numberBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  numberText: {
    color: colors.PRIMARY,
    fontSize: 18,
    fontFamily: "Nunito_900Black",
  },

  cardTextContainer: {
    flex: 1,
  },

  cardTitle: {
    color: colors.TEXT_COLOR,
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    marginBottom: 4,
  },

  cardDescription: {
    color: colors.FADED_TEXT_COLOR,
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    lineHeight: 20,
  },

  permissionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.CARD,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.BORDER,
  },

  icon: {
    marginRight: 16,
  },

  permissionText: {
    flex: 1,
    color: colors.FADED_TEXT_COLOR,
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    lineHeight: 20,
  },

  permissionTitle: {
    color: colors.TEXT_COLOR,
    fontFamily: "DMSans_700Bold",
  },

  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    paddingTop: 10,
  },
});