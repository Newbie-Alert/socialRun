import { UserState } from "@/hooks/useRunning";
import useTheme from "@/providers/ThemeProvider";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  totalDistance: number;
  kcal: number;
  paceText: string;
  userState: UserState;
  onPress: (userState: UserState) => void;
};

export default function RunningRecord({
  totalDistance,
  kcal,
  paceText,
  userState,
  onPress,
}: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <View style={styles.moduleContainer}>
          <Text style={styles.recordTitle}>거리</Text>
          <Text>
            <Text style={styles.record}>{totalDistance} </Text>
            <Text style={{ fontSize: 16, fontStyle: "italic", color: "white" }}>
              km
            </Text>
          </Text>
        </View>
        <View style={styles.moduleContainer}>
          <Text style={styles.recordTitle}>페이스</Text>
          <Text style={styles.record}>{paceText}</Text>
        </View>
        <View style={styles.moduleContainer}>
          <Text style={styles.recordTitle}>칼로리</Text>
          <Text>
            <Text style={styles.record}>{kcal} </Text>
            <Text style={{ fontSize: 16, fontStyle: "italic", color: "white" }}>
              kcal
            </Text>
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          marginTop: 24,
          gap: 7,
        }}>
        <Pressable
          onPress={() =>
            userState === "paused" ? onPress("running") : onPress("paused")
          }
          style={{
            width: "48%",
            backgroundColor: "white",
            borderRadius: 6,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={{ textAlign: "center" }}>
            {userState === "paused" ? "Resume" : "Pause"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onPress("stopped")}
          style={{
            width: "48%",
            backgroundColor: "white",
            borderRadius: 6,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text>Stop</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "fixed",
    top: 54,
    left: 18,
    width: "90%",
    height: "30%",
  },
  moduleContainer: {
    gap: 1,
  },
  recordTitle: {
    fontStyle: "italic",
    fontWeight: 700,
    fontSize: 21,
    color: "white",
    letterSpacing: 0.01,
  },
  record: {
    fontSize: 28,
    color: "white",
    letterSpacing: -0.3,
    paddingTop: 0,
    fontWeight: 600,
  },
});
