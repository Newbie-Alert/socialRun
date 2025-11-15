import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerShown: false,
      }}>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "login",
        }}
      />
    </Stack>
  );
}
