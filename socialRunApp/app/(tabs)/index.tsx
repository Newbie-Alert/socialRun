import GradientPlayBox from "@/components/main/GradientPlayBox";
import useRunning from "@/hooks/useRunning";
import useUserLocation from "@/hooks/useUserLocation";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";
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
  const {
    userState,
    handleUserState,
    lineCoords,
    timerRef,
    record,
    lastSegmentDistance,
    totalDistance,
  } = useRunning();

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
      {/* <Pressable onPress={() => router.push("/pages/feature")}>
        <Text>실험실</Text>
      </Pressable> */}

      <MapView
        ref={mapRef}
        initialRegion={initRegion}
        showsUserLocation={true}
        provider="google"
        style={{ flex: 1 }}>
        {lineCoords && lineCoords.length > 0 && (
          <Polyline
            strokeColor="#388CFF"
            coordinates={lineCoords}
            strokeWidth={4}
          />
        )}
      </MapView>
      <GradientPlayBox
        lastSegmentDistance={lastSegmentDistance}
        totalDistance={totalDistance}
        timerRef={timerRef}
        userState={userState}
        onPress={handleUserState}
      />
    </View>
  );
}
