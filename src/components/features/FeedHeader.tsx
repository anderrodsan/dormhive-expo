import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import ModeToggle from "@/components/shared/ModeToggle";
import Avatar from "../shared/Avatar";
import { router } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";

export default function FeedHeader({ dorm, src }: { dorm: any; src: string }) {
  return (
    <Animated.View
      entering={FadeIn}
      className="flex flex-row justify-between items-center w-full px-5 py-1 bg-white border-secondary"
    >
      <Image
        source={require("@/assets/logo.png")}
        style={{ objectFit: "cover" }}
        className="w-7 h-7"
      />
      <Text className="flex-1 text-content font-bold opacity-80 text-2xl ml-3">
        {dorm?.name}
      </Text>
      <Pressable onPress={() => router.push("/profile")}>
        <Avatar src={src} className="w-12 h-12" />
      </Pressable>
    </Animated.View>
  );
}
