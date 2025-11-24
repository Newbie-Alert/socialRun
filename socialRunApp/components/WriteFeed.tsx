import { View, Text } from "react-native";
import React from "react";
import { TotalRecord } from "@/hooks/useRunning";
import TotalRecordView from "./modules/TotalRecordView";
import MapView, { Polyline } from "react-native-maps";

type Props = TotalRecord;

export default function WriteFeed({ totalRecord }: { totalRecord: Props }) {
  const { lineCoords, totalDistance, timeRecord, calories, pace } = totalRecord;

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: lineCoords[0].latitude,
          longitude: lineCoords[0].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Polyline coordinates={lineCoords} />
      </MapView>
      <TotalRecordView
        calories={calories}
        timeRecord={timeRecord}
        totalDistance={totalDistance}
      />
      <Text>WriteFeed</Text>
    </View>
  );
}
