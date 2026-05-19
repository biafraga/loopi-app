import {
  DMSans_300Light,
  DMSans_400Regular,
  DMSans_700Bold
} from "@expo-google-fonts/dm-sans";
import {
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black
} from "@expo-google-fonts/nunito";
import {
  Unbounded_400Regular,
  Unbounded_700Bold,
  Unbounded_900Black
} from "@expo-google-fonts/unbounded";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

// O app vai baixar tudo isso na hora que abrir
  const [fontsLoaded] = useFonts({
    DMSans_300Light,
    DMSans_400Regular,
    DMSans_700Bold,
    Unbounded_400Regular,
    Unbounded_700Bold,
    Unbounded_900Black,
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  // Se as fontes ainda não carregaram, não mostra nada pra não dar erro
  if (!fontsLoaded) {
    return null; 
  }

  return <Stack
        screenOptions={{
        headerShown: false, // mata a barra branca de todas as telas
      }}
   />;
}
