import * as Location from "expo-location";
import React, { createContext, useContext, useEffect, useState } from "react";

interface LocationContextType {
  interVallocation: Location.LocationObject | null;
}

const LocationContext = createContext<LocationContextType | null>(null);

export default function LocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [interVallocation, setIntervalLocation] =
    useState<Location.LocationObject | null>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        const req = await Location.requestForegroundPermissionsAsync();
        if (req.status !== "granted") return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 1,
          timeInterval: 2000,
        },
        (pos) => setIntervalLocation(pos)
      );
    })();

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <LocationContext.Provider value={{ interVallocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useIntervalLocation = () => {
  const context = useContext(LocationContext);
  if (!context) throw Error("provider 안에서만 사용 가능합니다");
  return context;
};
