import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider from "@/providers/AuthProvider";
import LocationProvider from "@/providers/LocationProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Stack } from "expo-router";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RecordProvider from "@/providers/RecordProvider";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <LocationProvider>
          <RecordProvider>
            <ThemeProvider>
              <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  <Stack screenOptions={{ headerShown: false }} />
                </SafeAreaView>
              </SafeAreaProvider>
            </ThemeProvider>
          </RecordProvider>
        </LocationProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
