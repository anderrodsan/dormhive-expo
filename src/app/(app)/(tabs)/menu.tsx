import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import ModeToggle from "@/components/shared/ModeToggle";
import { useColorScheme } from "nativewind";
import React from "react";
import SignOut from "@/components/auth/SignOut";

export default function Events() {
  const items = [
    { path: "/(features)/profile", icon: "person", label: "Profile" },
    { path: "/menu", icon: "report-gmailerrorred", label: "Report Issues" },
    { path: "/menu", icon: "chair", label: "Facilities" },
    { path: "/menu", icon: "how-to-vote", label: "Resident Council" },
    { path: "/menu", icon: "info-outline", label: "Q&A" },
    { path: "/menu", icon: "local-laundry-service", label: "Laundry App" },
    { path: "/menu", icon: "map", label: "Location" },
    { path: "/menu", icon: "settings", label: "Settings" },
  ];

  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 bg-background">
      <View className="flex flex-row justify-between items-center w-full px-5 py-3 bg-white border-secondary">
        <Text className="flex-1 text-content font-bold text-2xl">Menu</Text>
      </View>
      <ScrollView className="p-5 w-full flex-1">
        {items.map((item: any, index: number) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => router.push(item.path)}
            className="flex flex-row justify-between items-center gap-5 w-full p-5 rounded-lg bg-secondary-100 border-secondary mb-3"
          >
            <MaterialIcons
              name={item.icon}
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <Text className="flex-1 text-lg text-content font-bold">
              {item.label}
            </Text>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        ))}
        <View className="flex items-center pt-5">
          <ModeToggle />
        </View>
        <View className="flex items-center pt-5 pb-20">
          <SignOut />
        </View>
      </ScrollView>
    </View>
  );
}
