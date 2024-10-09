import React, { useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { getAllEventStatusById } from "@/db/queries";

export default function BadgeFilter({
  options,
  status,
  setStatus,
  onlyCount = false,
}: {
  options: any[];
  status: string;
  setStatus: any;
  onlyCount?: boolean;
}) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row gap-2 pl-5 my-5">
      {/* Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=""
      >
        {options.map((option, index) => {
          const color =
            option.value === status
              ? "white"
              : colorScheme === "dark"
              ? "white"
              : "black";

          if (onlyCount && option.count === 0) {
            return null;
          }

          return (
            <Pressable
              key={index}
              className={`flex-row items-center gap-2 px-3 py-1 rounded-full mr-2 ${
                option.value === status ? "bg-primary" : "bg-secondary"
              }`}
              onPress={() => setStatus(option.value)}
            >
              {option.icon && (
                <MaterialCommunityIcons
                  name={option.icon}
                  size={20}
                  color={color}
                />
              )}

              <Text
                className={` ${
                  option.value === status ? "text-[white]" : "text-content"
                }`}
              >
                {option.label}
              </Text>
              <View className="flex justify-center items-center px-2 rounded-full bg-white">
                <Text
                  className={
                    option.value === status
                      ? "text-black font-semibold text-sm"
                      : "font-semibold text-sm"
                  }
                >
                  {option.count}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
