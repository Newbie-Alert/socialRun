import useUserLocation from "@/hooks/useUserLocation";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import MapView, { Region } from "react-native-maps";

export default function Index() {
  const mapRef = useRef<MapView | null>(null);
  const { currentLocation } = useUserLocation();

  const initRegion: Region = {
    longitude: 37.25,
    latitude: 126.45,
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
  };

  useEffect(() => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          longitude: currentLocation.coords.longitude,
          latitude: currentLocation.coords.latitude,
        },
      });
    }
  }, [currentLocation]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        initialRegion={initRegion}
        showsUserLocation={true}
        provider="google"
        style={{ flex: 1 }}
      />
    </View>
  );
}
