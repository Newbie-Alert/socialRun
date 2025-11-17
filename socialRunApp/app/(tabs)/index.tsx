import useRealtimeLine from "@/hooks/useUpdatePolyline";
import useUserLocation from "@/hooks/useUserLocation";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import MapView, { Polyline, Region } from "react-native-maps";

export default function Index() {
  const initRegion: Region = {
    longitude: 37.25,
    latitude: 126.45,
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
  };

  const mapRef = useRef<MapView | null>(null);
  const { currentLocation } = useUserLocation();
  const { isUpdate, handleRealtimeStart, lineCoords } = useRealtimeLine();

  useEffect(() => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          longitude: currentLocation.coords.longitude,
          latitude: currentLocation.coords.latitude,
        },
        zoom: 18,
      });
    }
  }, [currentLocation]);

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={() => router.push("/pages/feature")}>
        <Text>실험실</Text>
      </Pressable>
      <MapView
        ref={mapRef}
        initialRegion={initRegion}
        showsUserLocation={true}
        provider="google"
        style={{ flex: 1 }}>
        {lineCoords && lineCoords.length > 0 && (
          <Polyline coordinates={lineCoords} strokeWidth={2} fillColor="blue" />
        )}
      </MapView>
      <Pressable onPress={handleRealtimeStart}>
        <Text>{isUpdate ? "running" : "stop"}</Text>
      </Pressable>
    </View>
  );
}
