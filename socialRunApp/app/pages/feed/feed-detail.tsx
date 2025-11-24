import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { use, useEffect, useRef } from "react";
import { useRecordContext } from "@/providers/RecordProvider";
import { Redirect } from "expo-router";
import MapView, { Marker, Polyline } from "react-native-maps";
import TotalRecordView from "@/components/modules/TotalRecordView";

export default function FeedDetail() {
  const mapRef = useRef<MapView>(null);
  const { record, handleSetRecord } = useRecordContext();

  if (!record || record.totalDistance < 0) {
    return <Redirect href={"/(tabs)"} />;
  }

  useEffect(() => {
    if (record.lineCoords && record.lineCoords.length > 0) {
      const startPoint = record.lineCoords[0];
      mapRef.current?.animateToRegion({
        latitude: startPoint.latitude,
        longitude: startPoint.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });
    }

    mapRef.current?.fitToCoordinates(record.lineCoords, {
      edgePadding: {
        top: 120,
        bottom: 120,
        left: 120,
        right: 120,
      },
      animated: true,
    });
  }, [record.lineCoords]);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 2 }}
        showsUserLocation={true}
        initialRegion={{
          latitude: record.lineCoords[0].latitude,
          longitude: record.lineCoords[0].longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}>
        <Polyline
          coordinates={record.lineCoords}
          strokeColor="#388CFF"
          strokeWidth={4}
        />
        <Marker
          coordinate={{
            latitude: record.lineCoords[0].latitude,
            longitude: record.lineCoords[0].longitude,
          }}>
          <View style={[styles.marker, { backgroundColor: "#f97316" }]} />
        </Marker>
        <Marker
          coordinate={{
            latitude: record.lineCoords[record.lineCoords.length - 1].latitude,
            longitude:
              record.lineCoords[record.lineCoords.length - 1].longitude,
          }}>
          <View style={[styles.marker, { backgroundColor: "#21c45d" }]} />
        </Marker>
      </MapView>
      <View style={{ padding: 16, backgroundColor: "white", flex: 1 }}>
        <TotalRecordView
          calories={record.calories}
          timeRecord={record.timeRecord}
          totalDistance={record.totalDistance}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  marker: {
    width: 18,
    height: 36,
    borderRadius: 9,
    borderWidth: 3,
    marginLeft: 9,
  },
});
