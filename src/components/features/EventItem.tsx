import { Image, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useContext } from "react";
import Avatar from "../shared/Avatar";
import { AuthContext } from "@/provider/AuthProvider";

export default function EventItem({ event }: { event: any }) {
  //*** Format the date to display "02 Jan"
  const date = new Date(event?.date);
  const day = date.getDate();
  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  //get user from context
  const auth = useContext(AuthContext);
  const user = auth.user || null;

  //find the status of the event_status that matches the user_id

  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: "/event/[id]", params: { slug: event?.id } })
      }
      className={`relative w-full rounded-lg `}
    >
      <View className="relative rounded-xl h-[130px] w-full overflow-hidden">
        <Image
          source={{ uri: event?.img }}
          style={{ objectFit: "cover" }}
          className="w-full h-full"
        />
      </View>
      {/** Info 
      <View className="flex-row items-center py-2 w-full">
        <View className="flex-1 flex-col justify-start">
          <Text className="font-bold text-content text-lg">{event?.title}</Text>
          <Text className="text-content text-slate-500 text-start opacity-80">
            @{event?.users.username}
          </Text>
        </View>
      </View>
      */}

      <View className="flex-row items-center gap-3 pt-1 pb-3">
        <Avatar
          src={event?.users.avatar_url}
          className="w-7 h-7 rounded-full"
        />

        <View className="flex ">
          <Text className="font-bold text-content">{event?.title}</Text>
          <Text className="flex-1 opacity-80 text-content text-sm">
            {event?.creator_id === user?.id
              ? "Me"
              : `@${event?.users.username}`}
          </Text>
        </View>
      </View>

      <View className="absolute left-3 top-3 bg-white flex flex-col items-center justify-center w-[60px] h-[60px] rounded-md">
        <Text className="text-xl font-bold text-content">{day}</Text>
        <Text className="font-bold text-content">{month}</Text>
      </View>

      {event?.status == "going" && (
        <View className="absolute top-3 right-3 flex gap-2 items-center justify-center bg-primary font-bold h-9 w-9 rounded-full text-white">
          <MaterialCommunityIcons name="check" size={20} color="white" />
        </View>
      )}
      {event?.status == "interested" && (
        <View className="absolute top-3 right-3 flex gap-2 items-center justify-center bg-orange-600 font-bold h-9 w-9 rounded-full text-white">
          <MaterialCommunityIcons name="heart" size={20} color="white" />
        </View>
      )}
    </Pressable>
  );
}
