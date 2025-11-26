import { getFeed } from "@/api/feed/feed.api";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function Feed() {
  const [userName, setUserName] = useState<string>("코쓱친칠라");

  const { data, error } = useQuery({
    queryKey: ["get-feed", "feed-list", userName],
    queryFn: () => (userName ? getFeed(userName) : getFeed()),
  });

  return (
    <View>
      <Text>feed</Text>
    </View>
  );
}
