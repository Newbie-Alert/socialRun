import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthState = { token: string; userId: string };

interface AuthContextType {
  auth: AuthState;
  handleSetAuth: (param: AuthState) => void;
  handleLogout: () => void;
  isLoggedIn: boolean;
  isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [auth, setAuth] = useState<AuthState>({
    token: "",
    userId: "",
  });
  const isLoggedIn = !!auth.token;

  const handleSetAuth = async (param: AuthState) => {
    try {
      setAuth(param);
      await AsyncStorage.multiSet([
        ["token", param.token],
        ["userId", param.userId],
      ]);
      router.replace("/(tabs)");
    } catch (e) {
      console.warn("Auth storage error:", e);
    }
  };

  const handleLogout = async () => {
    setAuth({ token: "", userId: "" });
    await AsyncStorage.multiRemove(["token", "userId"]);
  };

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      if (token && userId) {
        setAuth({ token, userId });
        router.replace("/(tabs)");
      }
      setIsLoaded(true);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoaded, auth, handleSetAuth, handleLogout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw Error("provider 안에서만 사용 가능합니당");
  return authContext;
};
