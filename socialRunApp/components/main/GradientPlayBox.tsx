import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "@/providers/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { UserState } from "@/hooks/useRunning";
import Timer from "@/components/Timer";
import { StopwatchTimerMethods } from "react-native-animated-stopwatch-timer";

type Props = {
  userState: UserState;
  onPress: (userState: UserState) => void;
  timerRef: React.RefObject<StopwatchTimerMethods | null>;
  totalDistance: number;
  lastSegmentDistance: number;
};

export default function GradientPlayBox({
  userState,
  onPress,
  timerRef,
  totalDistance,
}: Props) {
  const { colors } = useTheme();

  const wrapperHeight = 120;
  const isRunning = userState === "running";

  return (
    <View
      style={{
        width: "90%",
        borderRadius: 12,
        height: isRunning ? wrapperHeight * 2 : 120,
        position: "absolute",
        bottom: 16,
        left: "50%",
        transform: [{ translateX: "-50%" }],
        overflowY: "hidden",
      }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors.gradients.primary}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 12,
          justifyContent: "center",
        }}>
        {isRunning && (
          <View
            style={{
              position: "fixed",
              top: 12,
              left: 15,
              flexDirection: "row",
              width: "90%",
              justifyContent: "space-between",
            }}>
            <View>
              <Text>{totalDistance}</Text>
            </View>
            <View>
              <Text>칼로리</Text>
            </View>
            <View>
              <Text>페이스</Text>
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: isRunning ? "flex-end" : "center",
            paddingHorizontal: 24,
            gap: 42,
            height: "100%",
            paddingBottom: isRunning ? 39 : 0,
          }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                userState === "running"
                  ? onPress("paused")
                  : onPress("running");
              }}
              style={{
                width: 65,
                height: 65,
                borderRadius: 40,
                backgroundColor: colors.bg,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Ionicons
                name={userState === "running" ? "pause" : "play"}
                color={colors.primary}
                size={28}
                style={{ paddingLeft: userState === "running" ? 0 : 4 }}
              />
            </TouchableOpacity>
          </View>
          <Timer timerRef={timerRef} />

          {/* {userState === "running" ? (
            <Timer timerRef={timerRef} />
          ) : (
            <View style={{ gap: 6, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 24,
                  letterSpacing: -0.02,
                  fontWeight: 800,
                  color: "white",
                }}>
                Start Running
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  letterSpacing: -0.02,
                  fontWeight: 400,
                  color: "white",
                }}>
                Track your workout now
              </Text>
            </View>
          )} */}
        </View>
      </LinearGradient>
    </View>
  );
}
