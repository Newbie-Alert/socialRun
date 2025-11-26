import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider from "@/providers/AuthProvider";
import LocationProvider from "@/providers/LocationProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Stack } from "expo-router";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RecordProvider from "@/providers/RecordProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
