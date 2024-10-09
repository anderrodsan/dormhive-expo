import { Pressable, ScrollView, Text, View } from "react-native";
import React from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { getAlertById, getEventById } from "@/db/queries";
import Avatar from "@/components/shared/Avatar";
import { useFormatedDate } from "@/utils/format-date";

export default function Alert() {
  const { slug } = useLocalSearchParams();

  const { colorScheme } = useColorScheme();

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    getAlertById(slug.toString()).then((alert) => {
      setAlert(alert);
    });
  }, []);

  const date = useFormatedDate(alert?.created_at);

  return (
    <View className={`flex-1 flex-col bg-white`}>
      {/** Header */}
      <View className="sticky top-0 z-20 bg-opacity-70 bg-white flex justify-between items-center p-5 border-b border-secondary">
        <View className="cursor-pointer flex-row gap-3 items-center w-full justify-start">
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
          <Text className="font-bold text-xl text-content">Alert Details</Text>
        </View>
      </View>
      {/** Alert Details */}
      <ScrollView className="flex-1 flex bg-white w-full rounded-xl p-5">
        <Text className="text-2xl font-bold text-content mb-5">
          {alert?.title}
        </Text>
        <View className="flex flex-row justify-start items-center gap-3">
          <Avatar
            src={alert?.users.avatar_url}
            className="w-12 h-12 rounded-full"
          />
          <View className="flex-1 flex-row items-center gap-2">
            <Text className="font-bold text-content opacity-80">
              {alert?.users.full_name}
            </Text>
            <Text className="text-sm bg-secondary px-3 py-1 rounded-full text-content">
              {alert?.role}
            </Text>
            {alert?.pinned && (
              <MaterialCommunityIcons name="pin" size={20} color="grey" />
            )}
          </View>
          <Text className="font-light text-xs text-content">{date}</Text>
        </View>
        <View className="w-full border-b border-secondary my-5" />
        <View className="flex flex-col gap-2">
          <Text className="font-bold text-lg text-content">Description</Text>
          {/* Display the breaks and other html tags in the text (<br/>, etc.) */}
          <Text className="text-content opacity-80">{alert?.text}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
