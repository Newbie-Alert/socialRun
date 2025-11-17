import { callAxios } from "@/lib/axios/axios";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Feature() {
  return (
    <View>
      <Pressable>
        <Text>이미지 선택</Text>
      </Pressable>
      <Pressable style={{ marginTop: 15 }}>
        <Text>업로드</Text>
      </Pressable>
    </View>
  );
}
