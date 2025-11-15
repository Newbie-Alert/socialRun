import { useAuth } from "@/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function TabsLayout() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/(auth)/login");
    }
  }, [isLoggedIn]);

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: {
          elevation: 0,
          borderColor: "transparent",
          paddingBottom: 8,
          height: 55,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "러닝",
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="walk" size={15} />;
          },
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "피드",
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="search" size={15} />;
          },
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "마이페이지",
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="person" size={15} />;
          },
        }}
      />
    </Tabs>
  );
}
