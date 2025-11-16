import { useIntervalLocation } from "@/providers/LocationProvider";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";

export default function useRealtimeLine() {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [lineCoords, setLineCoords] = useState<LatLng[]>([]);
  const { interVallocation } = useIntervalLocation();

  const handleRealtimeStart = () => {
    setIsUpdate((prev) => !prev);
  };

  useEffect(() => {
    if (!isUpdate) return;

    if (interVallocation) {
      const { longitude, latitude } = interVallocation.coords;
      setLineCoords((prev) => [...prev, { longitude, latitude }]);
    }
  }, [interVallocation]);

  return { isUpdate, handleRealtimeStart, lineCoords };
}
