import { login } from "@/api/auth/auth.api";
import { useAuth } from "@/providers/AuthProvider";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type UserInput = {
  email: string;
  password: string;
  nickname?: string;
};

export default function Login() {
  const { handleSetAuth } = useAuth();
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleToggleMode = () => {
    setIsRegister((prev) => !prev);
  };

  const fadeMotionEmail = useRef(new Animated.Value(0)).current;
  const fadeMotionPassword = useRef(new Animated.Value(0)).current;
  const moveUpMotionEmail = useRef(new Animated.Value(40)).current;
  const moveUpMotionPassword = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeMotionEmail, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(moveUpMotionEmail, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeMotionPassword, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(moveUpMotionPassword, {
          toValue: 0,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 200);
  }, []);

  const [userInput, setUserInput] = useState<UserInput>({
    email: "",
    password: "",
    nickname: "",
  });

  const handleUserInput = (key: keyof UserInput, value: string) => {
    setUserInput((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        source={require("@/assets/images/login/loginBg.jpg")}>
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          style={styles.background}
        />
        <View style={styles.inputContainer}>
          <Animated.View
            style={{
              opacity: fadeMotionEmail,
              transform: [{ translateY: moveUpMotionEmail }],
            }}>
            <TextInput
              style={styles.input}
              placeholder="이메일을 입력해주세요"
              onChangeText={(text) => handleUserInput("email", text)}
            />
          </Animated.View>
          <Animated.View
            style={{
              opacity: fadeMotionPassword,
              transform: [{ translateY: moveUpMotionPassword }],
            }}>
            <TextInput
              style={styles.input}
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry={true}
              onChangeText={(text) => handleUserInput("password", text)}
              onSubmitEditing={async () => {
                const res = await login(userInput);
                handleSetAuth(res);
              }}
            />
          </Animated.View>
          {isRegister && (
            <Animated.View
              style={{
                opacity: fadeMotionEmail,
                transform: [{ translateY: moveUpMotionEmail }],
              }}>
              <TextInput
                style={styles.input}
                placeholder="닉네임을 입력해주세요"
                onChangeText={(text) => handleUserInput("nickname", text)}
              />
            </Animated.View>
          )}
        </View>
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
          onPress={async () => {
            const res = await login(userInput);
            handleSetAuth(res);
          }}>
          <Text style={{ color: "white" }}>
            {isRegister ? "회원가입" : "로그인"}
          </Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  inputContainer: {
    width: "50%",
    gap: 8,
  },
  input: {
    width: "100%",
    backgroundColor: "#e6e6e6",
    color: "black",
    borderRadius: 5,
  },
});
