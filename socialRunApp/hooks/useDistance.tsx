import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LatLng } from "react-native-maps";
import { getDistance } from "@/utils/getDistance";
import { UserState } from "./useRunning";

export default function useRunningDistance(
  userState: UserState,
  latlng?: LatLng
) {
  const lastCoord = useRef<LatLng | null>(null);
  const [total, setTotal] = useState(0);
  const [segment, setSegment] = useState(0); // 이번 좌표 업데이트에서 증가한 거리

  useEffect(() => {
    if (userState === "stopped") return;
    if (!latlng) return;

    // 0,0 좌표는 무시
    if (latlng.latitude === 0 && latlng.longitude === 0) return;

    if (!lastCoord.current) {
      // 첫 입력: 기준점만 저장
      lastCoord.current = latlng;
      return;
    }

    // 두 번째 이후부터 거리 계산
    const diff = getDistance(lastCoord.current, latlng);

    if (diff > 0.5) {
      // GPS 튐 방지 (필요하면 조건 조정)
      setSegment(diff);
      setTotal((prev) => prev + diff);
      lastCoord.current = latlng;
    }
  }, [latlng, userState]);

  return {
    setTotal,
    totalDistance: Number((total / 1000).toFixed(2)), // km
    lastSegmentDistance: segment, // 이번 업데이트에서 더해진 m
  };
}
