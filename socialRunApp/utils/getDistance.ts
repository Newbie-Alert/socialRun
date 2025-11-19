import { LatLng } from "react-native-maps";

export const getDistance = (p1: LatLng, p2: LatLng) => {
  const R = 6371e3; // earth radius in meters
  const toRad = (v: number) => (v * Math.PI) / 180;

  const dLat = toRad(p2.latitude - p1.latitude);
  const dLon = toRad(p2.longitude - p1.longitude);

  const lat1 = toRad(p1.latitude);
  const lat2 = toRad(p2.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // meters
};
