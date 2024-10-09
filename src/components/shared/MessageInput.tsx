import React from "react";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function MessageInput({ handleSubmit }: any) {
  const { colorScheme } = useColorScheme();
  const [text, setText] = React.useState("");

  return (
    <View className="absolute bottom-0 left-0 w-full h-20 flex-row items-center justify-between bg-white px-5 py-2 gap-5 border-t border-secondary">
      <TextInput
        placeholder="Type a message..."
        value={text}
        onChangeText={(e) => setText(e)}
        className="flex-1 h-10 rounded-lg border border-secondary px-3"
      />
      <Pressable
        onPress={() => {
          if (!text) return;
          handleSubmit(text);
          setText("");
          //close keyboard
          Keyboard.dismiss();
        }}
      >
        <MaterialCommunityIcons
          name="send"
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      </Pressable>
    </View>
  );
}
