import React from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <View className="flex flex-col items-center justify-center gap-5 w-full p-10">
        <Image
          source={require("@/assets/logo.png")}
          style={{ objectFit: "cover" }}
          className="w-32 h-32 mb-5"
        />

        <Text className="text-primary font-bold text-3xl">DormHive</Text>
      </View>
      <Link
        href={"/(tabs)/feed"}
        className="px-3 py-2 rounded-xl bg-primary mt-10"
      >
        <Text className="font-semibold text-lg text-[white]">Get Started</Text>
      </Link>
      <Text className="absolute bottom-32 text-content opacity-50 font-bold text-lg">
        Powered by Andr
      </Text>
      <StatusBar backgroundColor="#ffffff" style="light" />
    </View>
  );
}
