import { useIntervalLocation } from "@/providers/LocationProvider";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import useRunningDistance from "./useDistance";
import useStopwatch from "./useStopwatch";
import { calcCalories } from "../utils/calcCalrories";
import { calcPace } from "../utils/calcPace";

export type UserState = "running" | "paused" | "stopped";

export type TotalRecord = {
  totalDistance: number;
  pace: string;
  calories: number;
  timeRecord: number;
  lineCoords: LatLng[];
};

export default function useRunning() {
  const [userState, setUserState] = useState<UserState>("stopped");
  const { interVallocation } = useIntervalLocation();
  const [lineCoords, setLineCoords] = useState<LatLng[]>([]);

  const [calories, setCalories] = useState(0);
  const [pace, setPace] = useState<string>("0");

  // 총 거리
  const { totalDistance, lastSegmentDistance, setTotal } = useRunningDistance(
    userState,
    {
      latitude: interVallocation?.coords.latitude || 0,
      longitude: interVallocation?.coords.longitude || 0,
    }
  );

  // 타이머 관련
  const { timerRef, record, realTime } = useStopwatch({
    userState,
    totalDistance,
  });

  // 러닝 후 종합적인 데이터
  const [totalRecord, setTotalRecord] = useState<TotalRecord | null>(null);

  const handleUserState = (userState: UserState) => {
    setUserState(userState);
  };

  // 실시간 업데이트
  useEffect(() => {
    if (userState !== "running") return;

    const kcal = calcCalories(realTime, totalDistance);
    setCalories(kcal);
    const { paceText } = calcPace(realTime, totalDistance);
    setPace(paceText);
  }, [realTime, totalDistance, userState]);

  // polyline 업데이트
  useEffect(() => {
    if (interVallocation && userState === "running") {
      setLineCoords((prev) => {
        const { latitude, longitude } = interVallocation.coords;
        const newCoords: LatLng = {
          latitude,
          longitude,
        };
        return [...prev, newCoords];
      });
    }
  }, [interVallocation, userState]);

  useEffect(() => {
    if (userState !== "stopped") return;

    const summary = {
      totalDistance,
      timeRecord: timerRef.current?.getSnapshot() || 0,
      pace,
      calories,
      lineCoords,
    };

    setTotalRecord(summary);

    setTimeout(() => {
      timerRef.current?.reset();
      setPace("--:--");
      setCalories(0);
      setTotal(0);
      setLineCoords([]);
    }, 0);
  }, [userState]);

  return {
    userState,
    handleUserState,
    lineCoords,
    lastSegmentDistance,
    totalDistance,
    timerRef,
    record,
    kcal: calories,
    paceText: pace,
    totalRecord,
  };
}
