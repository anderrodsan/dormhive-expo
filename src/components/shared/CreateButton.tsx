import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CreateButton({
  icon,
  path,
}: {
  icon: any;
  path: string;
}) {
  return (
    <TouchableOpacity
      onPress={() => router.push(path)}
      activeOpacity={0.8}
      className="absolute bottom-5 right-5 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer"
    >
      <MaterialIcons name={icon} size={35} color="white" />
    </TouchableOpacity>
  );
}
