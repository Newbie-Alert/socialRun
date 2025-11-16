import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const callAxios = axios.create({
  baseURL: "http://61.73.36.103:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

callAxios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
