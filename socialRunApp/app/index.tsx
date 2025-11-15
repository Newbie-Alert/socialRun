import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  
  const {isLoaded, auth} = useAuth();
  
  useEffect(() => {
    if (!isLoaded) return;

    if (!auth.token) {
      router.replace('/(auth)/login');
      return;
    } else {
      router.replace('/(tabs)')
    }

  },[isLoaded, auth.token])
  
  return null
}
