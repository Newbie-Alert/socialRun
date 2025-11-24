import React from "react";
import StopwatchTimer, {
  StopwatchTimerMethods,
} from "react-native-animated-stopwatch-timer";

type Props = {
  timerRef: React.RefObject<StopwatchTimerMethods | null>;
  isHidden: boolean;
};

export default function TimerView({ timerRef, isHidden }: Props) {
  return (
    <StopwatchTimer
      containerStyle={{
        // display: isHidden ? "flex" : "none",
        opacity: isHidden ? 1 : 0,
      }}
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
