import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default function useUserLocation() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.getForegroundPermissionsAsync();

      if (status !== "granted") {
        const request = await Location.requestForegroundPermissionsAsync();
        if (request.status !== "granted") {
          setErrorMessage("위치정보 제공 동의가 필요합니다.");
          setIsLoading(false);
          return;
        }
      }

      let location = await Location.getCurrentPositionAsync();

      setCurrentLocation(location);
      setIsLoading(false);
    };

    getLocation();
  }, []);

  return { currentLocation, errorMessage, isLoading };
}
