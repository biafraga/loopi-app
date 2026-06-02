// app/components/LoopiMascot.jsx - criando com Claude IA
// Uso:
//   <LoopiMascot state="normal"     size={100} />
//   <LoopiMascot state="alerta"     size={80}  />
//   <LoopiMascot state="chegou"     size={120} />
//   <LoopiMascot state="confuso"    size={100} />
//   <LoopiMascot state="construcao" size={100} />

import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import Svg, {
  Circle,
  Ellipse,
  G,
  Path,
  Rect,
  Text as SvgText,
} from "react-native-svg";

const PRIMARY   = "#C8F135";
const SECONDARY = "#6366F1";
const CARD      = "#1C1F38";
const DARK      = "#2A1F5E";
const WHITE     = "#FFFFFF";
const AMBER     = "#F59E0B";
const AMBER_DK  = "#D97706";
const AMBER_XDK = "#92400E";
const GRAY      = "#888888";
const GRAY_LT   = "#AAAAAA";

const AnimatedG       = Animated.createAnimatedComponent(G);
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const AnimatedPath    = Animated.createAnimatedComponent(Path);

export default function LoopiMascot({ state = "normal", size = 100 }) {
  const floatAnim  = useRef(new Animated.Value(0)).current;
  const blinkAnim  = useRef(new Animated.Value(6)).current;
  const shakeAnim  = useRef(new Animated.Value(0)).current;
  const badgeAnim  = useRef(new Animated.Value(1)).current;
  const starAnim   = useRef(new Animated.Value(1)).current;
  const ringAnim   = useRef(new Animated.Value(0)).current;
  const qmarkAnim  = useRef(new Animated.Value(0)).current;
  const hammerAnim = useRef(new Animated.Value(0)).current;
  const sparkAnim  = useRef(new Animated.Value(1)).current;

  useEffect(() => {

    // Float — todos os estados
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -5,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Piscar olhos — normal e chegou
    if (state === "normal" || state === "chegou") {
      Animated.loop(
        Animated.sequence([
          Animated.delay(3000),
          Animated.timing(blinkAnim, {
            toValue: 0.5,
            duration: 70,
            useNativeDriver: false,
          }),
          Animated.timing(blinkAnim, {
            toValue: 6,
            duration: 70,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }

    // Shake — alerta e confuso
    if (state === "alerta" || state === "confuso") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnim, { toValue: 3,  duration: 75, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: -3, duration: 75, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 2,  duration: 75, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: -2, duration: 75, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 0,  duration: 75, useNativeDriver: true }),
          Animated.delay(state === "confuso" ? 1800 : 2200),
        ])
      ).start();
    }

    // Badge pulse — alerta
    if (state === "alerta") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(badgeAnim, {
            toValue: 1.2,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(badgeAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    // Estrelas — chegou
    if (state === "chegou") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(starAnim, {
            toValue: 1.25,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(starAnim, {
            toValue: 0.75,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    // Anel girando — normal
    if (state === "normal") {
      Animated.loop(
        Animated.timing(ringAnim, {
          toValue: 360,
          duration: 10000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }

    // Interrogação oscilando — confuso
    if (state === "confuso") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(qmarkAnim, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(qmarkAnim, {
            toValue: -1,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    // Martelo + faíscas — construção
    if (state === "construcao") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(hammerAnim, {
            toValue: 1,
            duration: 450,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(hammerAnim, {
            toValue: 0,
            duration: 450,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkAnim, {
            toValue: 1.4,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(sparkAnim, {
            toValue: 0.6,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

  }, [state]);

  const ringRotate = ringAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const qmarkRotate = qmarkAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-18deg", "18deg"],
  });

  const hammerRotate = hammerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-35deg", "18deg"],
  });

  const translateX =
    state === "alerta" || state === "confuso"
      ? shakeAnim
      : new Animated.Value(0);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        transform: [
          { translateY: floatAnim },
          { translateX },
        ],
      }}
    >
      <Svg width={size} height={size} viewBox="0 0 100 100">

        {/* ══════════════════════════════════
            NORMAL
        ══════════════════════════════════ */}
        {state === "normal" && (
          <>
            <AnimatedG
              style={{
                transform: [
                  { translateX: 50 },
                  { translateY: 52 },
                  { rotate: ringRotate },
                  { translateX: -50 },
                  { translateY: -52 },
                ],
              }}
            >
              <Circle
                cx="50" cy="52" r="28"
                stroke={PRIMARY} strokeOpacity={0.25}
                strokeWidth={1.5} strokeDasharray="5,3"
                fill="none"
              />
            </AnimatedG>
            <Circle cx="50" cy="52" r="36" fill={CARD} stroke={PRIMARY} strokeWidth={2.5} />
            <AnimatedEllipse cx="40" cy="48" rx={5} ry={blinkAnim} fill={PRIMARY} />
            <Circle cx="41.5" cy="47" r="2" fill={DARK} />
            <Circle cx="43" cy="45.5" r="1" fill={WHITE} fillOpacity={0.6} />
            <AnimatedEllipse cx="60" cy="48" rx={5} ry={blinkAnim} fill={PRIMARY} />
            <Circle cx="61.5" cy="47" r="2" fill={DARK} />
            <Circle cx="63" cy="45.5" r="1" fill={WHITE} fillOpacity={0.6} />
            <Path d="M40 60 Q50 68 60 60" stroke={PRIMARY} strokeWidth={2} strokeLinecap="round" fill="none" />
            <Circle cx="50" cy="16" r="5" fill={PRIMARY} />
            <Circle cx="50" cy="88" r="5" fill={SECONDARY} />
          </>
        )}

        {/* ══════════════════════════════════
            ALERTA
        ══════════════════════════════════ */}
        {state === "alerta" && (
          <>
            <Circle cx="50" cy="52" r="36" fill={CARD} stroke={PRIMARY} strokeWidth={2.5} />
            <Ellipse cx="40" cy="48" rx={5} ry={6} fill={PRIMARY} />
            <Circle cx="41.5" cy="47" r="2" fill={DARK} />
            <Circle cx="43" cy="45.5" r="1" fill={WHITE} fillOpacity={0.6} />
            <Ellipse cx="60" cy="48" rx={5} ry={6} fill={PRIMARY} />
            <Circle cx="61.5" cy="47" r="2" fill={DARK} />
            <Circle cx="63" cy="45.5" r="1" fill={WHITE} fillOpacity={0.6} />
            <Ellipse cx="50" cy="62" rx={6} ry={4} fill={PRIMARY} fillOpacity={0.85} />
            <Path d="M72 28 Q80 36 72 44" stroke={PRIMARY} strokeWidth={1.5} strokeLinecap="round" fill="none" strokeOpacity={0.5} />
            <Path d="M76 24 Q88 36 76 48" stroke={PRIMARY} strokeWidth={1.5} strokeLinecap="round" fill="none" strokeOpacity={0.25} />
            <Circle cx="50" cy="16" r="5" fill={PRIMARY} />
            <Circle cx="50" cy="88" r="5" fill={SECONDARY} />
            <AnimatedG
              style={{
                transform: [
                  { translateX: 72 },
                  { translateY: 20 },
                  { scale: badgeAnim },
                  { translateX: -72 },
                  { translateY: -20 },
                ],
              }}
            >
              <Circle cx="72" cy="20" r="9" fill={PRIMARY} />
              <SvgText x="72" y="24.5" textAnchor="middle" fontSize={12} fontWeight="900" fill={DARK}>!</SvgText>
            </AnimatedG>
          </>
        )}

        {/* ══════════════════════════════════
            CHEGOU
        ══════════════════════════════════ */}
        {state === "chegou" && (
          <>
            <AnimatedG
              style={{
                transform: [
                  { translateX: 20 }, { translateY: 20 },
                  { scale: starAnim },
                  { translateX: -20 }, { translateY: -20 },
                ],
              }}
            >
              <Path d="M20 20 L22 14 L24 20 L30 22 L24 24 L22 30 L20 24 L14 22 Z" fill={PRIMARY} />
            </AnimatedG>
            <AnimatedG
              style={{
                transform: [
                  { translateX: 77 }, { translateY: 18 },
                  { scale: starAnim },
                  { translateX: -77 }, { translateY: -18 },
                ],
              }}
            >
              <Path d="M77 18 L78.5 13 L80 18 L85 19.5 L80 21 L78.5 26 L77 21 L72 19.5 Z" fill={PRIMARY} fillOpacity={0.7} />
            </AnimatedG>
            <Circle cx="50" cy="52" r="36" fill={CARD} stroke={SECONDARY} strokeWidth={2.5} />
            <AnimatedPath
              d="M35 47 Q40 41 45 47"
              stroke={PRIMARY} strokeWidth={2.5} strokeLinecap="round" fill="none"
              strokeOpacity={blinkAnim.interpolate({ inputRange: [0.5, 6], outputRange: [0, 1] })}
            />
            <AnimatedPath
              d="M55 47 Q60 41 65 47"
              stroke={PRIMARY} strokeWidth={2.5} strokeLinecap="round" fill="none"
              strokeOpacity={blinkAnim.interpolate({ inputRange: [0.5, 6], outputRange: [0, 1] })}
            />
            <Path d="M37 60 Q50 73 63 60" stroke={PRIMARY} strokeWidth={2.5} strokeLinecap="round" fill="none" />
            <Ellipse cx="36" cy="58" rx={5} ry={3} fill={SECONDARY} fillOpacity={0.3} />
            <Ellipse cx="64" cy="58" rx={5} ry={3} fill={SECONDARY} fillOpacity={0.3} />
            <Circle cx="50" cy="16" r="7" fill={SECONDARY} />
            <Path d="M46 16 L49 19 L55 13" stroke={WHITE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </>
        )}

        {/* ══════════════════════════════════
            CONFUSO
        ══════════════════════════════════ */}
        {state === "confuso" && (
          <>
            <Circle cx="50" cy="52" r="36" fill={CARD} stroke={PRIMARY} strokeWidth={2.5} />
            {/* Olho esquerdo espiral */}
            <Circle cx="38" cy="46" r="12" fill={PRIMARY} />
            <Circle cx="38" cy="46" r="8"  fill={CARD} />
            <Circle cx="38" cy="46" r="4.5" fill={PRIMARY} />
            <Circle cx="38" cy="46" r="1.8" fill={DARK} />
            <Circle cx="41" cy="43" r="1.5" fill={WHITE} fillOpacity={0.55} />
            {/* Olho direito espiral */}
            <Circle cx="62" cy="46" r="12" fill={PRIMARY} />
            <Circle cx="62" cy="46" r="8"  fill={CARD} />
            <Circle cx="62" cy="46" r="4.5" fill={PRIMARY} />
            <Circle cx="62" cy="46" r="1.8" fill={DARK} />
            <Circle cx="65" cy="43" r="1.5" fill={WHITE} fillOpacity={0.55} />
            {/* Boca torta zigue-zague */}
            <Path d="M37 65 Q44 73 50 65 Q56 57 63 65" stroke={PRIMARY} strokeWidth={3} strokeLinecap="round" fill="none" />
            {/* Interrogação oscilando */}
            <AnimatedG
              style={{
                transform: [
                  { translateX: 74 }, { translateY: 18 },
                  { rotate: qmarkRotate },
                  { translateX: -74 }, { translateY: -18 },
                ],
              }}
            >
              <Circle cx="74" cy="18" r="12" fill={PRIMARY} />
              <SvgText x="74" y="23" textAnchor="middle" fontSize={14} fontWeight="900" fill={DARK}>?</SvgText>
            </AnimatedG>
            <Circle cx="50" cy="16" r="5" fill={PRIMARY} />
            <Circle cx="50" cy="88" r="5" fill={SECONDARY} />
          </>
        )}

        {/* ══════════════════════════════════
            CONSTRUÇÃO
        ══════════════════════════════════ */}
        {state === "construcao" && (
          <>
            <Circle cx="50" cy="56" r="36" fill={CARD} stroke={PRIMARY} strokeWidth={2.5} />

            {/* Capacete — calota principal */}
            <Path d="M14 42 Q16 14 50 10 Q84 14 86 42 Z" fill={AMBER} />
            {/* Realce claro no topo */}
            <Path d="M18 42 Q20 18 50 15 Q80 18 82 42 Z" fill="#FBBF24" />
            {/* Nervura central */}
            <Path d="M50 11 Q51 26 51 42" stroke={AMBER_DK} strokeWidth={1.5} fill="none" />
            {/* Ventilações */}
            <Rect x="44"   y="18" width="3.5" height="10" rx="1.5" fill={AMBER_DK} />
            <Rect x="48.5" y="16" width="3.5" height="12" rx="1.5" fill={AMBER_DK} />
            <Rect x="53"   y="18" width="3.5" height="10" rx="1.5" fill={AMBER_DK} />
            {/* Fita de ajuste */}
            <Rect x="14" y="38" width="72" height="5" rx="2" fill={AMBER_XDK} />
            {/* Aba frontal */}
            <Path d="M8 42 Q16 50 50 52 Q84 50 92 42 L86 42 Q80 48 50 49 Q20 48 14 42 Z" fill={AMBER_DK} />

            {/* Olhos determinados */}
            <Path d="M32 62 Q40 57 48 62" stroke={PRIMARY} strokeWidth={2.5} strokeLinecap="round" fill="none" />
            <Path d="M52 62 Q60 57 68 62" stroke={PRIMARY} strokeWidth={2.5} strokeLinecap="round" fill="none" />
            {/* Boca concentrada */}
            <Path d="M38 74 L62 74" stroke={PRIMARY} strokeWidth={3} strokeLinecap="round" />

            {/* Martelo animado */}
            <AnimatedG
              style={{
                transform: [
                  { translateX: 68 }, { translateY: 62 },
                  { rotate: hammerRotate },
                  { translateX: -68 }, { translateY: -62 },
                ],
              }}
            >
              {/* Cabo */}
              <Rect x="65" y="62" width="5" height="28" rx="2.5" fill={AMBER_XDK} />
              {/* Cabeça */}
              <Rect x="55" y="50" width="20" height="13" rx="3" fill={GRAY} />
              {/* Face metálica */}
              <Rect x="55" y="50" width="7" height="13" rx="2.5" fill={GRAY_LT} />
            </AnimatedG>

            {/* Faíscas animadas */}
            <AnimatedG
              style={{
                transform: [
                  { translateX: 28 }, { translateY: 18 },
                  { scale: sparkAnim },
                  { translateX: -28 }, { translateY: -18 },
                ],
              }}
            >
              <Path d="M28 18 L30 12 L32 18 L38 20 L32 22 L30 28 L28 22 L22 20 Z" fill={PRIMARY} />
            </AnimatedG>
            <AnimatedG
              style={{
                transform: [
                  { translateX: 78 }, { translateY: 14 },
                  { scale: sparkAnim },
                  { translateX: -78 }, { translateY: -14 },
                ],
              }}
            >
              <Path d="M78 14 L79.5 9 L81 14 L86 15.5 L81 17 L79.5 22 L78 17 L73 15.5 Z" fill={AMBER} fillOpacity={0.9} />
            </AnimatedG>

            <Circle cx="50" cy="92" r="5" fill={SECONDARY} />
          </>
        )}

      </Svg>
    </Animated.View>
  );
}