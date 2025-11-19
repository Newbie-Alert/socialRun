import React from "react";
import StopwatchTimer, {
  StopwatchTimerMethods,
} from "react-native-animated-stopwatch-timer";

type Props = {
  timerRef: React.RefObject<StopwatchTimerMethods | null>;
};

export default function useTimer({ timerRef }: Props) {
  return (
    <StopwatchTimer
      ref={timerRef}
      textCharStyle={{
        textAlign: "center",
        color: "white",
        fontWeight: 800,
        fontSize: 42,
      }}
      leadingZeros={1}
      trailingZeros={2}
    />
  );
}
