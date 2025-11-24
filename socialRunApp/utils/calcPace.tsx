// calcPace.ts
export function calcPace(realTime: number, totalDistance: number) {
  // 1) ms → seconds
  const runningTimeSec = Math.floor(realTime / 1000);

  // 2) km 단위 거리
  const km = totalDistance;

  // 3) pace(초 단위)
  if (km <= 0 || runningTimeSec <= 0) {
    return {
      paceSec: 0,
      paceText: "--'--",
    };
  }

  const paceSec = runningTimeSec / km;

  // 4) 분·초 변환
  const min = Math.floor(paceSec / 60);
  const sec = Math.floor(paceSec % 60);

  const paceText = `${min}' ${sec < 10 ? `0${sec}` : sec}"`;

  return {
    paceSec,
    paceText,
  };
}
