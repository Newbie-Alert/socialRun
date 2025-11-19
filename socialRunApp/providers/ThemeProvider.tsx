import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// AsyncStorage is React Native’s simple, promise-based API for persisting small bits of data on a user’s device. Think of it as the mobile-app equivalent of the browser’s localStorage, but asynchronous and cross-platform.

export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
  bg: "#F6F6FF", // 전체 배경: 살짝 보라빛 섞인 크림 → 화면 밀도 완화
  surface: "#FFFFFF", // 카드/섹션 배경
  text: "#1E1E2E", // 기본 텍스트 (짙은 네이비톤)
  textMuted: "#8A8FA6", // 보조 텍스트 (연보라+그레이)
  border: "#E6E6F0", // 카드·박스 경계선
  primary: "#6A5AF9", // 상단 그라데이션 계열 보라 (주·메인 버튼)
  success: "#10B981", // 녹색 — 운동 기록 긍정
  warning: "#F59E0B", // 주황 — PR·Trail 태그
  danger: "#EF4444", // 빨강 — 칼로리나 위험 이벤트
  shadow: "#000000",

  gradients: {
    // 상단 “Hey, Sarah!” 배경 바로 이 느낌
    background: ["#7663F6", "#A47CF6"], // 보라→라일락 그라데이션
    surface: ["#FFFFFF", "#F8F9FF"],
    primary: ["#6A5AF9", "#4A3CF1"], // 버튼·러닝 CTA 용
    success: ["#10B981", "#059669"],
    warning: ["#F59E0B", "#D97706"],
    danger: ["#EF4444", "#DC2626"],
    muted: ["#CBD5E1", "#94A3B8"], // 항목 사이 “연한 회색”
    empty: ["#F3F4F6", "#E5E7EB"],
  },

  backgrounds: {
    input: "#FFFFFF",
    editInput: "#FFFFFF",
  },

  statusBarStyle: "dark-content" as const,
};

const darkColors: ColorScheme = {
  bg: "#0E0E14", // 아주 짙은 남보라색 계열
  surface: "#1A1A24", // 카드 배경 (어두운 네이비 보라)
  text: "#F1F1FF", // 기본 텍스트 (밝은 바이올렛 화이트)
  textMuted: "#9CA3C9", // 보조 텍스트
  border: "#2A2A39", // 카드 구분선

  primary: "#8C78FF", // 라이트 모드 주색 대비 조금 밝게 튀게
  success: "#34D399",
  warning: "#FBBF24",
  danger: "#F87171",
  shadow: "#000000",

  gradients: {
    background: ["#1A1632", "#2D236B"], // 보라→네이비 계열
    surface: ["#1A1A24", "#2A2A39"],
    primary: ["#8C78FF", "#5C47E0"],
    success: ["#10B981", "#059669"],
    warning: ["#F59E0B", "#D97706"],
    danger: ["#EF4444", "#DC2626"],
    muted: ["#374151", "#4B5563"],
    empty: ["#1E1E2A", "#252533"],
  },

  backgrounds: {
    input: "#1E1E2A",
    editInput: "#0F0F1A",
  },

  statusBarStyle: "light-content" as const,
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default useTheme;
