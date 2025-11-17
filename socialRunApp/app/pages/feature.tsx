import useParseImage from "@/hooks/useParseImage";
import { callAxios } from "@/lib/axios/axios";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Feature() {
  const { returnImageDataListsForStorage } = useParseImage();
  const [images, setImages] = useState<string[] | null>(null);

  const pickImages = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      allowsEditing: true,
      selectionLimit: 5,
      base64: false,
    });

    if (!res.canceled) {
      let uris = [];

      for (let i = 0; i < res.assets.length; i++) {
        const asset = res.assets[i];
        const uri = asset.uri;
        uris.push(uri);
      }
      setImages(uris);
    }
  };

  const handleUpload = async () => {
    try {
      const parsedImages = images
        ? await returnImageDataListsForStorage(images)
        : null;

      await callAxios.post("/feed/upload", {
        writerId: "69153ade02843db34e18ac04",
        images: parsedImages,
        content: "test",
      });

      console.log("Feed upload Successed");
    } catch (error) {
      console.log(error);
      throw Error("피드 업로드 실패");
    }
  };

  return (
    <View>
      <Pressable onPress={pickImages}>
        <Text>이미지 선택</Text>
      </Pressable>
      <Pressable onPress={handleUpload} style={{ marginTop: 15 }}>
        <Text>업로드</Text>
      </Pressable>
    </View>
  );
}
