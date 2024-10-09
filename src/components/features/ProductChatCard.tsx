import { View } from "react-native";
import { Text } from "react-native";
import { Pressable } from "react-native";
import Avatar from "../shared/Avatar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { useColorScheme } from "nativewind";

export default function ProductChatCard({ chat }: { chat: any }) {
  return (
    <Pressable
      className={`w-full rounded-lg ${chat?.id ? "" : ""}`}
      onPress={() =>
        router.push({
          pathname: "/product/chats/[id]",
          params: { slug: chat.id },
        })
      }
    >
      <View className="flex-row justify-between items-center gap-3 pb-3 px-1">
        <View className="flex-1 flex-row items-center gap-4">
          <Avatar src={chat?.products.img} className="w-14 h-14 rounded-full" />
          <View className="flex-col flex-1 items-start">
            <Text className="font-bold text-lg text-content opacity-80">
              {chat?.products.title}
            </Text>
            <Text className="text-content opacity-80 line-clamp-1">
              @ander: Hi! Someone wants to join your group?
            </Text>
          </View>
        </View>
        <View className="flex-col justify-start items-end gap-2">
          <Text className="text-content text-sm opacity-50 font-bold">
            yesterday
          </Text>
          <View className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/70">
            <Text className="text-[white] text-xs font-bold"></Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
