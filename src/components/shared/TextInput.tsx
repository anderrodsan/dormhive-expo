// text input component with the handle change function, with (setData, data) as props

import React from "react";
import { Text, TextInput, View } from "react-native";
import { useColorScheme } from "nativewind";

export default function TextInputComponent({
  setData,
  data,
  title,
  className,
}: {
  setData: any;
  data: any;
  title: string;
  className?: string;
}) {
  return (
    <View className="gap-2">
      <Text className="font-bold text-content opacity-75">{title}</Text>
      <TextInput
        className={`text-content w-full px-3 py-2 border border-secondary rounded-lg flex focus:border-primary ${className}`}
        placeholderTextColor={"gray"}
        placeholder="Type here..."
        onChangeText={(text) => setData(text)}
        value={data}
        textAlignVertical={title === "Description" ? "top" : "center"}
      />
    </View>
  );
}
