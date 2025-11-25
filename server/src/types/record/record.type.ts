export type LatLng = {
  latitude: number;
  longitude: number;
};

export type TotalRecord = {
  totalDistance: number;
  pace: string;
  calories: number;
  timeRecord: number;
  lineCoords: LatLng[];
};
