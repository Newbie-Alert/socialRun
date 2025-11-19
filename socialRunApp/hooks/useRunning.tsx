import { useIntervalLocation } from "@/providers/LocationProvider";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import useRunningDistance from "./useDistance";
import useStopwatch from "./useStopwatch";

export type UserState = "running" | "paused" | "stopped";

export default function useRunning() {
  const [userState, setUserState] = useState<UserState>("stopped");
  const { interVallocation } = useIntervalLocation();
  const [lineCoords, setLineCoords] = useState<LatLng[]>([]);

  const handleUserState = (userState: UserState) => {
    setUserState(userState);
  };

  // 타이머 관련
  const { timerRef, record } = useStopwatch({ userState });

  // 총 거리
  const { totalDistance, lastSegmentDistance } = useRunningDistance({
    latitude: interVallocation?.coords.latitude || 0,
    longitude: interVallocation?.coords.longitude || 0,
  });

  useEffect(() => {
    switch (userState) {
      case "running":
        if (interVallocation) {
          const { longitude, latitude } = interVallocation.coords;
          setLineCoords((prev) => [...prev, { longitude, latitude }]);
        }
        break;
      case "paused":
        return;
      case "stopped":
      // 현재까지의 기록들 다 저장하는 훅에 set
    }
  }, [interVallocation, userState]);

  return {
    userState,
    handleUserState,
    lineCoords,
    lastSegmentDistance,
    totalDistance,
    timerRef,
    record,
  };
}
