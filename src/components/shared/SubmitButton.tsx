import React from "react";
import { Text } from "react-native";
import {
  ActivityIndicator,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";

export default function SubmitButton({
  title,
  handleSubmit,
  loading,
}: {
  title: string;
  handleSubmit: () => void;
  loading: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        handleSubmit();
      }}
      activeOpacity={0.75}
      className="flex justify-center items-center h-12 bg-primary rounded-lg"
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text className="text-[white] font-bold text-lg">{title}</Text>
      )}
    </TouchableOpacity>
  );
}
