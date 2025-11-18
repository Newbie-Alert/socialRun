import PagerView from "react-native-pager-view";
import useImageUpload from "@/hooks/useImageUpload";
import { useAuth } from "@/providers/AuthProvider";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

type Feed = {
  writerId: string;
  content: string;
  files: string[] | null;
};

export default function Feature() {
  const { auth } = useAuth();
  const [feed, setFeed] = useState<Feed>({
    writerId: auth.userId,
    content: "",
    files: null,
  });

  const { images, handleParseFilesAndUpload } = useImageUpload();

  const handleFeedInput = (key: keyof Feed, value: string) => {
    setFeed((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={handleParseFilesAndUpload}>
        <Text>이미지 선택</Text>
      </Pressable>
      <Pressable style={{ marginTop: 15 }}>
        <Text>업로드</Text>
      </Pressable>

      {images && images.length > 0 && (
        <View style={{ flex: 1 }}>
          <PagerView style={{ height: 300 }}>
            {images.map((image, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
              </View>
            ))}
          </PagerView>
        </View>
      )}
    </View>
  );
}
