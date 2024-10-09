import React from "react";
import { Image, Text, View } from "react-native";
import SignIn from "@/components/auth/SignIn";

export default function Login() {
  return (
    <View className="flex-1 justify-between gap-2 bg-background w-full p-10">
      <View className="flex-row items-center justify-start gap-3 w-full">
        <Image
          source={require("@/assets/logo.png")}
          style={{ objectFit: "cover" }}
          className="w-10 h-10"
        />

        <Text className="text-primary font-bold text-2xl">Dormhive</Text>
      </View>
      <SignIn />
    </View>
  );
}
