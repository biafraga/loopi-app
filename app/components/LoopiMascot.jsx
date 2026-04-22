// app/components/LoopiMascot.jsx
// Uso:
//   <LoopiMascot state="normal" size={100} />
//   <LoopiMascot state="alerta" size={80} />
//   <LoopiMascot state="chegou" size={120} />

import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import Svg, {
  Circle,
  Ellipse,
  G,
  Path,
  Text as SvgText,
} from "react-native-svg";

const PRIMARY   = "#C8F135";
const SECONDARY = "#6366F1";
const CARD      = "#1C1F38";
const DARK      = "#2A1F5E";
const WHITE     = "#FFFFFF";

// Versões animáveis dos elementos SVG
const AnimatedG       = Animated.createAnimatedComponent(G);
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const AnimatedPath    = Animated.createAnimatedComponent(Path);

export default function LoopiMascot({ state = "normal", size = 100 }) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(6)).current; // ry: 6=aberto, 0.5=fechado
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const badgeAnim = useRef(new Animated.Value(1)).current;
  const starAnim  = useRef(new Animated.Value(1)).current;
  const ringAnim  = useRef(new Animated.Value(0)).current;

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
            useNativeDriver: false, // ry não suporta nativeDriver
          }),
          Animated.timing(blinkAnim, {
            toValue: 6,
            duration: 70,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }

    // Shake — alerta
    if (state === "alerta") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnim, { toValue: 3,  duration: 70, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: -3, duration: 70, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 2,  duration: 70, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: -2, duration: 70, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 0,  duration: 70, useNativeDriver: true }),
          Animated.delay(2200),
        ])
      ).start();

      // Badge pulse — alerta
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

  }, [state]);

  const ringRotate = ringAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const translateX = state === "alerta" ? shakeAnim : new Animated.Value(0);

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
            {/* Anel tracejado girando */}
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

            {/* Corpo */}
            <Circle cx="50" cy="52" r="36" fill={CARD} stroke={PRIMARY} strokeWidth={2.5} />

            {/* Olho esquerdo — ry animado para piscar */}
            <AnimatedEllipse cx="40" cy="48" rx={5} ry={blinkAnim} fill={PRIMARY} />
            <Circle cx="41.5" cy="47" r="2" fill={DARK} />
            <Circle cx="43" cy="45.5" r="1" fill={WHITE} fillOpacity={0.6} />

            {/* Olho direito */}
            <AnimatedEllipse cx="60" cy="48" rx={5} ry={blinkAnim} fill={PRIMARY} />
            <Circle cx="61.5" cy="47" r="2" fill={DARK} />
            <Circle cx="63" cy="45.5" r="1" fill={WHITE} fillOpacity={0.6} />

            {/* Sorriso */}
            <Path d="M40 60 Q50 68 60 60" stroke={PRIMARY} strokeWidth={2} strokeLinecap="round" fill="none" />

            {/* Pontos de rota */}
            <Circle cx="50" cy="16" r="5" fill={PRIMARY} />
            <Circle cx="50" cy="88" r="5" fill={SECONDARY} />
          </>
        )}

        {/* ══════════════════════════════════
            ALERTA
        ══════════════════════════════════ */}
        {state === "alerta" && (
          <>
            {/* Corpo */}
            <Circle cx="50" cy="52" r="36" fill={CARD} stroke={PRIMARY} strokeWidth={2.5} />

            {/* Olhos abertos fixos */}
            <Ellipse cx="40" cy="48" rx={5} ry={6} fill={PRIMARY} />
            <Circle cx="41.5" cy="47" r="2" fill={DARK} />
            <Circle cx="43" cy="45.5" r="1" fill={WHITE} fillOpacity={0.6} />

            <Ellipse cx="60" cy="48" rx={5} ry={6} fill={PRIMARY} />
            <Circle cx="61.5" cy="47" r="2" fill={DARK} />
            <Circle cx="63" cy="45.5" r="1" fill={WHITE} fillOpacity={0.6} />

            {/* Boca aberta */}
            <Ellipse cx="50" cy="62" rx={6} ry={4} fill={PRIMARY} fillOpacity={0.85} />

            {/* Ondas de notificação */}
            <Path d="M72 28 Q80 36 72 44" stroke={PRIMARY} strokeWidth={1.5} strokeLinecap="round" fill="none" strokeOpacity={0.5} />
            <Path d="M76 24 Q88 36 76 48" stroke={PRIMARY} strokeWidth={1.5} strokeLinecap="round" fill="none" strokeOpacity={0.25} />

            {/* Pontos de rota */}
            <Circle cx="50" cy="16" r="5" fill={PRIMARY} />
            <Circle cx="50" cy="88" r="5" fill={SECONDARY} />

            {/* Badge pulsante */}
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
            {/* Estrela esquerda */}
            <AnimatedG
              style={{
                transform: [
                  { translateX: 20 },
                  { translateY: 20 },
                  { scale: starAnim },
                  { translateX: -20 },
                  { translateY: -20 },
                ],
              }}
            >
              <Path d="M20 20 L22 14 L24 20 L30 22 L24 24 L22 30 L20 24 L14 22 Z" fill={PRIMARY} />
            </AnimatedG>

            {/* Estrela direita */}
            <AnimatedG
              style={{
                transform: [
                  { translateX: 77 },
                  { translateY: 18 },
                  { scale: starAnim },
                  { translateX: -77 },
                  { translateY: -18 },
                ],
              }}
            >
              <Path d="M77 18 L78.5 13 L80 18 L85 19.5 L80 21 L78.5 26 L77 21 L72 19.5 Z" fill={PRIMARY} fillOpacity={0.7} />
            </AnimatedG>

            {/* Corpo com borda indigo */}
            <Circle cx="50" cy="52" r="36" fill={CARD} stroke={SECONDARY} strokeWidth={2.5} />

            {/* Olhos felizes (^ ^) com piscar via strokeOpacity */}
            <AnimatedPath
              d="M35 47 Q40 41 45 47"
              stroke={PRIMARY}
              strokeWidth={2.5}
              strokeLinecap="round"
              fill="none"
              strokeOpacity={blinkAnim.interpolate({
                inputRange: [0.5, 6],
                outputRange: [0, 1],
              })}
            />
            <AnimatedPath
              d="M55 47 Q60 41 65 47"
              stroke={PRIMARY}
              strokeWidth={2.5}
              strokeLinecap="round"
              fill="none"
              strokeOpacity={blinkAnim.interpolate({
                inputRange: [0.5, 6],
                outputRange: [0, 1],
              })}
            />

            {/* Sorriso */}
            <Path d="M37 60 Q50 73 63 60" stroke={PRIMARY} strokeWidth={2.5} strokeLinecap="round" fill="none" />

            {/* Bochechas */}
            <Ellipse cx="36" cy="58" rx={5} ry={3} fill={SECONDARY} fillOpacity={0.3} />
            <Ellipse cx="64" cy="58" rx={5} ry={3} fill={SECONDARY} fillOpacity={0.3} />

            {/* Checkmark */}
            <Circle cx="50" cy="16" r="7" fill={SECONDARY} />
            <Path d="M46 16 L49 19 L55 13" stroke={WHITE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </>
        )}

      </Svg>
    </Animated.View>
  );
}