import React from "react";
import { getProfile } from "@/db/queries";
import { supabase } from "@/utils/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
export default function FeedBadges() {
  const badges = [
    {
      label: "info",
      path: "/info",
      icon: "library-books",
    },
    {
      label: "report issue",
      path: "/issues",
      icon: "report-gmailerrorred",
    },
    {
      label: "resident council",
      path: "/feed",
      icon: "how-to-vote",
    },
    {
      label: "facilities",
      path: "/facilities",
      icon: "chair",
    },
  ];

  const { colorScheme } = useColorScheme();

  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile(user?.id).then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <View className="flex gap-2 my-5">
      <ScrollView
        horizontal
        //don't show the scrollbar
        showsHorizontalScrollIndicator={false}
        className=""
      >
        <View className="flex-row gap-2 pl-5">
          {badges.map((item: any, index: number) => (
            <Link key={index} href={item.path}>
              <View className="px-3 py-1 rounded-2xl bg-secondary flex-row gap-2 justify-center items-center">
                <MaterialIcons
                  name={item.icon}
                  size={16}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
                <Text className="text-sm font-semibold text-content">
                  {item.label}
                </Text>
              </View>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
