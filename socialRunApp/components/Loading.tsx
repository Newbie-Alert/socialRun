import { View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

export default function Loading() {
  const dotRef = useSharedValue(0);

  const getDotStyle = (delay: number) =>
    useAnimatedStyle(() => {
      // progress: 0 → 1 → 0 왕복
      const value = Math.sin((dotRef.value + delay) * Math.PI * 0.3);

      return {
        transform: [{ translateY: value * -8 }], // 위로 8px 튀기기
      };
    });

  useEffect(() => {
    dotRef.value = withRepeat(
      withTiming(15, {
        duration: 4000,
        easing: Easing.ease,
      }),
      -1
    );
  }, []);

  const dot1 = getDotStyle(0);
  const dot2 = getDotStyle(0.66);
  const dot3 = getDotStyle(1.02);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#21212180",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
      }}>
      <Animated.View
        style={{
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: [{ translateY: "-50%" }, { translateX: "-50%" }],
          zIndex: 2,
        }}>
        <Animated.View style={dot1}>
          <Ionicons name="at-circle" size={16} color={"white"} />
        </Animated.View>
        <Animated.View style={dot2}>
          <Ionicons name="at-circle" size={16} color={"white"} />
        </Animated.View>
        <Animated.View style={dot3}>
          <Ionicons name="at-circle" size={16} color={"white"} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}
