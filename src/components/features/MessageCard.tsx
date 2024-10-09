import React from "react";
import { Text, View, Image } from "react-native";
import Avatar from "../shared/Avatar";

export default function MessageCard({ message, creator }: any) {
  const date = new Date(message.created_at);
  const formatedDate = date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View className="max-w-[90%]">
      {creator ? (
        <View className="flex p-3 rounded-xl bg-primary">
          {/**Image */}
          {message.img && (
            <Image
              source={{ uri: message.img }}
              className="w-20 h-20"
              style={{ objectFit: "cover" }}
            />
          )}
          <Text className="text-[white]">{message.text}</Text>
          <Text className="w-full text-right text-xs text-[white] opacity-70">
            {formatedDate}
          </Text>
        </View>
      ) : (
        <View className="flex-row gap-2">
          <Avatar src={message.users.avatar_url} className="w-7 h-7 mt-2" />
          <View className="flex p-3 rounded-xl bg-secondary">
            <Text className="font-bold text-content opacity-80">
              {message.users.username}
            </Text>
            {/**Image */}
            {message.img && (
              <Image
                source={{ uri: message.img }}
                className="max-w-[100%] aspect-square rounded-lg my-2"
                style={{ objectFit: "cover" }}
              />
            )}
            <Text className="text-content">{message.text}</Text>
            <Text className="text-xs text-content opacity-70">
              {formatedDate}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
