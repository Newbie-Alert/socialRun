import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { useRecordContext } from "@/providers/RecordProvider";
import { Redirect, router } from "expo-router";
import MapView, { Marker, Polyline } from "react-native-maps";
import TotalRecordView from "@/components/recordValueView/TotalRecordView";
import { Ionicons } from "@expo/vector-icons";
import useImageUpload from "@/hooks/useImageUpload";
import { uploadFeed } from "@/api/feed/feed.api";
import { saveRecord } from "@/api/auth/record/record.api";
import { useAuth } from "@/providers/AuthProvider";
import { UploadBodyType } from "@/api/feed/type";

export default function FeedDetail() {
  const { height } = Dimensions.get("window");
  const { images, handleParseFilesAndUpload } = useImageUpload();

  const mapRef = useRef<MapView>(null);
  const { record, handleSetRecord } = useRecordContext();

  const [feedInfo, setFeedInfo] = useState<UploadBodyType>({
    content: "",
    title: "",
    images: null,
    totalRecord: record ? record : null,
  });

  const handleFeedInfo = (
    key: keyof UploadBodyType,
    value: string | string[]
  ) => {
    setFeedInfo((prev) => ({ ...prev, [key]: value }));
  };

  if (!record || record.totalDistance < 0) {
    return <Redirect href={"/(tabs)"} />;
  }

  const handleUpload = async () => {
    try {
      const res = await uploadFeed(feedInfo);
      if (res === 201) {
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(JSON.stringify(feedInfo, null, 2));
  };

  const handleSaveRecord = async () => {
    try {
      const res = await saveRecord(record);
      if (res === 201) {
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (record.lineCoords && record.lineCoords.length > 0) {
      const startPoint = record.lineCoords[0];
      mapRef.current?.animateToRegion({
        latitude: startPoint.latitude,
        longitude: startPoint.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });

      mapRef.current?.fitToCoordinates(record.lineCoords, {
        edgePadding: {
          top: 120,
          bottom: 120,
          left: 120,
          right: 120,
        },
        animated: true,
      });
    }
  }, [record.lineCoords]);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          backgroundColor: "#f2f2f2",
          paddingBottom: 60,
        }}>
        <MapView
          ref={mapRef}
          style={{ height: height * 0.35 }}
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
              latitude:
                record.lineCoords[record.lineCoords.length - 1].latitude,
              longitude:
                record.lineCoords[record.lineCoords.length - 1].longitude,
            }}>
            <View style={[styles.marker, { backgroundColor: "#21c45d" }]} />
          </Marker>
        </MapView>
        <View style={{ height: height * 0.55, padding: 16, gap: 12 }}>
          <View
            style={{
              width: "100%",
            }}>
            <TotalRecordView
              calories={record.calories}
              pace={record.pace}
              totalDistance={record.totalDistance}
              timeRecord={record.timeRecord}
            />
          </View>
          <View style={styles.formBox}>
            <Text style={{ fontWeight: 700, fontSize: 21 }}>
              Share Your Run
            </Text>
            <View style={{ gap: 6 }}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.formInput}
                onChangeText={(text) => {
                  handleFeedInfo("title", text);
                }}
              />
            </View>
            <View style={{ gap: 6 }}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.formInput}
                onChangeText={(text) => {
                  handleFeedInfo("content", text);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBox}>
        <TouchableOpacity
          style={[{ backgroundColor: "#15a349" }, styles.bottomButton]}
          onPress={handleSaveRecord}>
          <Text style={styles.buttonText}>Save only Record</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{ backgroundColor: "#111827" }, styles.bottomButton]}
          onPress={handleUpload}>
          <Ionicons name="share" size={18} color={"white"} />
          <Text style={styles.buttonText}>Post And Save</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  formBox: {
    backgroundColor: "white",
    elevation: 1,
    gap: 8,
    padding: 16,
  },
  formTitle: { fontWeight: 700, fontSize: 21 },
  inputLabel: {
    fontSize: 16,
  },
  formInput: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#d7dbe0",
    color: "black",
  },
  bottomBox: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    borderColor: "#e6e6e6",
    borderTopWidth: 1,
    padding: 12,
    paddingBottom: 21,
  },
  bottomButton: {
    width: "48%",
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    flexDirection: "row",
    gap: 6,
  },
  buttonText: { color: "white", fontWeight: 700 },
});
