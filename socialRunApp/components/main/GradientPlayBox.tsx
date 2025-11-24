import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "@/providers/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { UserState } from "@/hooks/useRunning";
import { StopwatchTimerMethods } from "react-native-animated-stopwatch-timer";
import RunningRecord from "./RunningRecord";
import TimerView from "@/components/TimerView";

type Props = {
  userState: UserState;
  onPress: (userState: UserState) => void;
  timerRef: React.RefObject<StopwatchTimerMethods | null>;
  totalDistance: number;
  lastSegmentDistance: number;
  paceText: string;
  kcal: number;
};

export default function GradientPlayBox({
  userState,
  onPress,
  timerRef,
  totalDistance,
  paceText,
  kcal,
}: Props) {
  const { colors } = useTheme();

  const wrapperHeight = 120;
  const isActive = userState === "running" || userState === "paused";

  return (
    <View
      style={[{ height: isActive ? wrapperHeight * 2 : 120 }, styles.wrapper]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors.gradients.primary}
        style={styles.gradientBox}>
        {isActive && (
          <RunningRecord
            userState={userState}
            onPress={onPress}
            totalDistance={totalDistance}
            kcal={kcal}
            paceText={paceText}
          />
        )}
        <View
          style={[
            {
              alignItems: isActive ? "flex-end" : "center",
              paddingBottom: isActive ? 54 : 0,
            },
            styles.buttonContainer,
          ]}>
          {userState === "stopped" && (
            <View>
              <TouchableOpacity
                onPress={() => onPress("running")}
                style={[{ backgroundColor: colors.bg }, styles.runButton]}>
                <Ionicons
                  name={"play"}
                  color={colors.primary}
                  size={28}
                  style={{ paddingLeft: 4 }}
                />
              </TouchableOpacity>
            </View>
          )}

          <View
            style={{
              display: isActive ? "flex" : "none",
            }}>
            <TimerView timerRef={timerRef} isHidden={isActive} />
          </View>
          {!isActive && (
            <View style={{ gap: 6, justifyContent: "center" }}>
              <Text style={styles.startDesc}>Start Running</Text>
              <Text style={styles.startDescSecond}>Track your workout now</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    borderRadius: 12,
    position: "absolute",
    bottom: 16,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    overflowY: "hidden",
  },
  gradientBox: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    justifyContent: "center",
    gap: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 42,
    height: "100%",
  },
  runButton: {
    width: 65,
    height: 65,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  startDesc: {
    fontSize: 24,
    letterSpacing: -0.02,
    fontWeight: 800,
    color: "white",
  },
  startDescSecond: {
    fontSize: 18,
    letterSpacing: -0.02,
    fontWeight: 400,
    color: "white",
  },
});
