import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useMemo } from "react";
import { TotalRecord } from "@/hooks/useRunning";
import { FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { getTimeFromMilliseconds } from "@/utils/time";

type PickedValueType = "calories" | "timeRecord" | "totalDistance";

type Props = Pick<TotalRecord, PickedValueType>;

type ValueBoxReturnType =
  | { bg: string; icon: string; iconColor: string; title: string }
  | undefined;

export default function TotalRecordView(props: Props) {
  const extractStyleByKey = (value: keyof Props): ValueBoxReturnType => {
    if (!value) return;

    if (value === "calories") {
      return {
        bg: "hsl(34, 100%, 94%)",
        icon: "fire-alt",
        iconColor: "hsl(25, 96%, 53%)",
        title: "Calories",
      };
    }
    if (value === "totalDistance") {
      return {
        bg: "hsl(140, 82%, 95%)",
        icon: "route",
        iconColor: "hsl(142, 71%, 45%)",
        title: "Km",
      };
    }
    if (value === "timeRecord") {
      return {
        bg: "hsl(214, 100%, 95%)",
        icon: "clock",
        iconColor: "hsl(217, 90%, 60%)",
        title: "Time",
      };
    }
  };

  return (
    <View style={styles.container}>
      {Object.entries(props).map(([key, value]) => {
        const paramKey = key as PickedValueType;

        return (
          <View
            key={key}
            style={[
              styles.valueBox,
              { backgroundColor: extractStyleByKey(paramKey)?.bg },
            ]}>
            <View>
              <FontAwesome5
                name={extractStyleByKey(paramKey)?.icon}
                size={24}
                color={extractStyleByKey(paramKey)?.iconColor}
              />
            </View>
            <Text style={styles.valueText}>
              {paramKey === "timeRecord"
                ? getTimeFromMilliseconds(value)
                : value}
            </Text>
            <Text style={styles.titleText}>
              {extractStyleByKey(paramKey)?.title}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  valueBox: {
    flex: 1,
    gap: 4,
    borderRadius: 6,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontWeight: 700,
    fontSize: 22,
  },
  titleText: {
    fontWeight: 600,
    fontSize: 16,
    color: "#a4a4a4",
  },
});
