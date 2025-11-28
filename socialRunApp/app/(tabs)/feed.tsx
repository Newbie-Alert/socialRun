import { getFeed } from "@/api/feed/feed.api";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function Feed() {
  const [userName, setUserName] = useState<string>("");

  // const { data, error } = useQuery({
  //   queryKey: ["get-feed", "feed-list", userName],
  //   queryFn: () => (userName ? getFeed(userName) : getFeed()),
  // });

  return <Loading />;
}
