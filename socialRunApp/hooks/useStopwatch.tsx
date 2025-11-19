import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { UserState } from "./useRunning";
import { StopwatchTimerMethods } from "react-native-animated-stopwatch-timer";

type Props = {
  userState: UserState;
};

export default function useStopwatch({ userState }: Props) {
  const timerRef = useRef<StopwatchTimerMethods>(null);
  const [record, setRecord] = useState<number>(0);
  const [realTime, setRealTime] = useState<Number>(0);

  useEffect(() => {
    if (!timerRef.current) {
      console.log("no timer");
      return;
    }

    switch (userState) {
      case "running":
        timerRef.current.play();

        break;
      case "paused":
        const pausedRecord = timerRef.current.getSnapshot();
        setRecord(pausedRecord);
        timerRef.current.pause();
      // break;
      case "stopped":
        const record = timerRef.current.getSnapshot();
        setRecord(record);
    }
  }, [userState]);

  return { timerRef, record };
}
