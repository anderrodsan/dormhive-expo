import { View } from "react-native";
import { Text } from "react-native";
import { Pressable } from "react-native";
import Avatar from "../shared/Avatar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { useColorScheme } from "nativewind";

export default function GroupCard({ group }: { group: any }) {
  const groupIcons: any = [
    {
      type: "dorm",
      icon: "home-city-outline",
    },
    {
      type: "block",
      icon: "office-building-outline",
    },
    {
      type: "kitchen",
      icon: "silverware-fork-knife",
    },
    {
      type: "floor",
      icon: "package-variant-closed",
    },
  ];

  const { colorScheme } = useColorScheme();

  //find the type of group
  const groupIcon = groupIcons.find((icon) => icon.type === group.type);

  return (
    <Pressable
      className={`w-full rounded-lg ${group.pinned ? "bg-highlight" : ""}`}
      onPress={() =>
        router.push({
          pathname: "/chat/[id]",
          params: { slug: group.id },
        })
      }
    >
      <View className="flex-row justify-between items-center gap-3 pb-3 px-1">
        <View className="flex-1 flex-row items-center gap-4">
          {/**Icon 
          <MaterialCommunityIcons
            name={groupIcon?.icon}
            size={28}
            color={colorScheme == "dark" ? "white" : "black"}
            className="opacity-70"
          />*/}
          <Avatar src={group?.icon} className="w-14 h-14 rounded-full" />
          <View className="flex-col flex-1 items-start">
            <Text className="font-bold text-lg text-content opacity-80">
              {group?.title}
            </Text>
            <Text className="text-content opacity-80 line-clamp-1">
              @ander: Hi! Someone wants to join your group?
            </Text>
            {/**Members Count 
            <Text className="text-content text-sm opacity-50 pt-1">
              {group?.count[0].count} Members
            </Text>
            */}
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
