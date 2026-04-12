import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
        screenOptions={{
        headerShown: false, // mata a barra branca de todas as telas
      }}
   />;
}
