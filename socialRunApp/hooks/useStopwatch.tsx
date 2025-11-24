import { useEffect, useRef, useState } from "react";
import { StopwatchTimerMethods } from "react-native-animated-stopwatch-timer";
import { UserState } from "./useRunning";

export default function useStopwatch({
  userState,
  totalDistance,
}: {
  userState: UserState;
  totalDistance: number;
}) {
  const timerRef = useRef<StopwatchTimerMethods>(null);

  const [record, setRecord] = useState(0); // stopped 시점 기록
  const [realTime, setRealTime] = useState(0); // 실시간 시간(ms)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timer = timerRef.current;
    if (!timer) return;

    switch (userState) {
      case "running":
        timer.play();

        // 인터벌 중복 방지
        const snap = timer.getSnapshot();
        setRealTime(snap); // 실시간 업데이트

        break;

      case "paused":
        timer.pause();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        break;

      case "stopped":
        timer.pause();

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        const finalRecord = timer.getSnapshot();
        setRecord(finalRecord); // 저장
        break;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [userState, totalDistance]);

  return { timerRef, record, realTime };
}
