import { getProfile } from "@/db/queries";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import Avatar from "@/components/shared/Avatar";
import { supabase } from "@/utils/supabase";
import SignOut from "@/components/auth/SignOut";
import colors from "@/constants/colors";

export default function Profile() {
  const { colorScheme } = useColorScheme();
  const [profile, setProfile] = React.useState(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  //array including email, full name, username, room, dorm
  const profileData: any = [
    {
      label: "Email",
      value: profile?.email || "",
      icon: "mail",
    },
    {
      label: "Username",
      value: profile?.username || "",
      icon: "alternate-email",
    },
    {
      label: "Dorm",
      value: profile?.user_attributes.dorms.name || "",
      icon: "margin",
    },
    {
      label: "Room",
      value: profile?.user_attributes.room || "",
      icon: "bed",
    },
  ];

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center py-5 px-5 border-b border-secondary">
        <View className="flex-row gap-4 items-center">
          <Pressable onPress={() => router.back()}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
          <Text className="flex-1 font-bold text-xl text-content">Profile</Text>
        </View>
      </View>

      <ScrollView className="flex-1 bg-white">
        {/** Profile Picture & Name */}
        <View className="flex flex-col items-center bg-secondary-100">
          <View className="relative m-5">
            <Avatar src={profile?.avatar_url} className="h-40 w-40" />
            <View className="w-10 h-10 z-10 absolute flex items-center justify-center bottom-0 right-0 rounded-full border border-secondary bg-secondary">
              <MaterialIcons
                name="edit"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </View>
          </View>
          <Text className="text-3xl font-bold text-primary pb-5">
            {profile?.full_name}
          </Text>
        </View>

        {/** Profile Details */}
        <View className="flex-1 flex flex-col justify-start w-full gap-5 p-5 rounded-xl border-t border-secondary bg-white">
          <View className="flex-row justify-center gap-5 items-center w-full">
            <Text className="text-lg font-bold text-center text-content opacity-80">
              Personal Information
            </Text>
            <Pressable>
              <MaterialIcons
                name="edit"
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </Pressable>
          </View>

          <View className="flex gap-4">
            {profileData.map((data: any, index: number) => (
              <View
                key={index}
                className="flex-row items-center justify-between w-full bg-secondary-100 rounded-lg px-5 py-5"
              >
                <View className="flex-row items-center gap-3">
                  <MaterialIcons
                    name={data.icon}
                    size={20}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                  <Text className="text-base font-bold text-content">
                    {data.label}
                  </Text>
                </View>
                <Text className="text-base text-content opacity-80">
                  {data.value}
                </Text>
              </View>
            ))}
          </View>
          <View className="flex gap-5 justify-center items-center pt-5">
            <SignOut />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
