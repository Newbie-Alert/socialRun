import AuthProvider from "@/providers/AuthProvider";
import LocationProvider from "@/providers/LocationProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Stack } from "expo-router";
import { Pressable, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <LocationProvider>
        <ThemeProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaView>
          </SafeAreaProvider>
        </ThemeProvider>
      </LocationProvider>
    </AuthProvider>
  );
}
