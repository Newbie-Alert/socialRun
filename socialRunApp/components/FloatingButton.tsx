import { View, Text, Pressable } from "react-native";
import React from "react";
import useTheme from "@/providers/ThemeProvider";

export default function FloatingButton() {
  const { colors, toggleDarkMode, isDarkMode } = useTheme();

  return (
    <Pressable
      onPress={toggleDarkMode}
      style={{
        width: 55,
        height: 55,
        backgroundColor: isDarkMode ? "black" : colors.bg,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        zIndex: 3,
        bottom: 85,
        right: 35,
      }}>
      <Text style={{ color: colors.text }}>
        {isDarkMode ? "dark" : "light"}
      </Text>
    </Pressable>
  );
}
