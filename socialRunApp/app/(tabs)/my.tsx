import { useAuth } from "@/providers/AuthProvider";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function My() {
  const { auth, handleLogout } = useAuth();

  return (
    <View>
      {auth.token && (
        <Pressable
          style={{
            borderRadius: 6,
            backgroundColor: "#388CFF",
            marginTop: 32,
            paddingVertical: 10,
            paddingHorizontal: 12,
            width: 100,
            alignItems: "center",
          }}
          onPress={handleLogout}>
          <Text style={{ color: "white" }}>로그아웃</Text>
        </Pressable>
      )}
    </View>
  );
}
