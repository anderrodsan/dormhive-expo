import { View } from "react-native";
import { Text } from "react-native";
import { Pressable } from "react-native";
import Avatar from "../shared/Avatar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormatedDate } from "@/utils/format-date";
import { router } from "expo-router";
import React from "react";

export default function AlertCard({ alert }: { alert: any }) {
  const date = useFormatedDate(alert?.created_at);

  return (
    <Pressable
      className={`w-full rounded-xl ${alert.pinned ? "bg-secondary" : ""}`}
      onPress={() =>
        router.push({ pathname: "/alert/[id]", params: { slug: alert.id } })
      }
    >
      <View className="p-3 text-xs flex flex-row gap-3">
        <Avatar
          src={alert?.users.avatar_url}
          className="w-12 h-12 rounded-full"
        />
        <View className="flex-1 gap-2">
          <View className="flex flex-row justify-between items-center">
            <View className="flex-1 flex-row items-center gap-2">
              <Text className="font-bold text-sm text-content opacity-70">
                {alert?.users.full_name}
              </Text>
              <Text className="text-xs bg-secondary px-3 py-1 rounded-full text-content">
                {alert?.role}
              </Text>
              {alert?.pinned && (
                <MaterialCommunityIcons name="pin" size={20} color="grey" />
              )}
            </View>
            <Text className="font-light text-sm text-content">{date}</Text>
          </View>
          <Text className="font-semibold text-content">{alert?.title}</Text>
          <Text className="line-clamp-2 text-sm text-content opacity-70">
            {alert?.text}
          </Text>
          <View className="flex flex-row items-center gap-1">
            {/**Icon 
            <Text className="text-sm text-content opacity-50">3 replies</Text>*/}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
