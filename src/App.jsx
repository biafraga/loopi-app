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

import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from './app/context/AuthContext';
import Routes from './app/routes';

export default function App() {
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

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </SafeAreaProvider>
  );
}