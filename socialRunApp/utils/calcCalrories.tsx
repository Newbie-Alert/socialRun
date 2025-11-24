// calcCalories.ts
export function calcCalories(runningTime: number, totalDistance: number) {
  if (runningTime < 1000 || totalDistance === 0) return 0;

  const hours = runningTime / 1000 / 3600;
  if (hours === 0) return 0;

  const speed = totalDistance / hours;

  let MET = 0;
  if (speed < 4) MET = 3.3;
  else if (speed < 6) MET = 5.0;
  else if (speed < 8) MET = 7.0;
  else if (speed < 10) MET = 9.8;
  else if (speed < 12) MET = 11.8;
  else if (speed < 14) MET = 13.5;
  else MET = 15.0;

  const weight = 70;

  return Number((MET * weight * hours).toFixed(2));
}
