import * as ImagePicker from "expo-image-picker";

import { View, Text } from "react-native";
import React, { useState } from "react";
import { callAxios } from "@/lib/axios/axios";

type ParsedFile = {
  uri: string;
  type: string;
  name: string;
};

export default function useImageUpload() {
  const [images, setImages] = useState<string[] | null>(null);

  /**
   * supabase 스토리지에 파일을 업로드 합니당.
   * @returns publicPath 배열
   */
  const handleParseFilesAndUpload = async () => {
    try {
      const picked = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        aspect: [4, 3],
        mediaTypes: ["images", "videos"],
        selectionLimit: 5,
      });

      let parsedImageList = [];

      if (!picked.canceled) {
        const pickedAssets = picked.assets;

        for (let i = 0; i < pickedAssets.length; i++) {
          const asset = pickedAssets[i];
          const uri = asset.uri;
          const fileExt = uri.split(".").pop();
          const filename = `image_${Date.now()}.${fileExt}`;

          const mimeType =
            asset.mimeType ??
            (fileExt === "png"
              ? "image/png"
              : fileExt === "heic"
              ? "image/heic"
              : "image/jpeg");

          const parsedImage = {
            uri,
            name: filename,
            type: mimeType,
          };

          parsedImageList.push(parsedImage);
        }

        handleImageUpload(parsedImageList);
      }
    } catch (error) {
      throw Error("이미지 파싱 에러");
    }
  };

  const handleImageUpload = async (parsedImageList: ParsedFile[]) => {
    try {
      const formData = new FormData();

      parsedImageList.forEach((parsedImage) => {
        formData.append("files", parsedImage as any);
      });

      const res = await callAxios.post<{ publicUrl: string[] }>(
        "/storage/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data) {
        const { publicUrl } = res.data;
        const makeURL = publicUrl.map((url) => {
          return `${process.env.EXPO_PUBLIC_SUPABASE_STORAGE_PREFIX}/${url}`;
        });
        setImages(makeURL);
      }
    } catch (error) {
      console.log(error);
      throw Error("이미지 업로드 실패");
    }
  };
  return { images, handleParseFilesAndUpload };
}
