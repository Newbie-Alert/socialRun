import { View, Text, Image } from "react-native";
import React from "react";
import PagerView from "react-native-pager-view";

type Props = {
  images: string[];
};

export default function Carousel({ images }: Props) {
  return (
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
  );
}
