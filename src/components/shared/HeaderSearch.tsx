import { BackHandler, Pressable, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

export default function HeaderSearch({
  title,
  data,
  setData,
  filteredData,
}: any) {
  const { colorScheme } = useColorScheme();

  const [open, setOpen] = React.useState(false);

  //if the back button is pressed
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Handle the back button press here
        // For example, set `open` to `false`
        setOpen(false);
        setData(data);
        return true; // Return true to prevent default back button behavior
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => {
        backHandler.remove();
      };
    }, [])
  );

  return (
    <View className="flex w-full bg-white px-5">
      {open ? (
        <View className="flex-row justify-between items-center w-full gap-3 py-2">
          <Pressable onPress={() => setOpen(false)}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>

          <TextInput
            autoFocus
            className="flex-1 border border-secondary py-1 px-5 bg-secondary rounded-lg text-content"
            placeholder="Search"
            placeholderTextColor={"gray"}
            onChange={(e) => {
              if (!e.nativeEvent.text) return setData(data);
              const filteredData = data.filter((item: any) => {
                return item.title
                  .toLowerCase()
                  .includes(e.nativeEvent.text.toLowerCase());
              });
              setData(filteredData);
              //detect if the back button is pressed close
            }}
          />
        </View>
      ) : (
        <View className="flex-row justify-between items-center w-full py-3">
          <Text className="flex-1 text-2xl font-bold text-content">
            {title}
          </Text>
          <Pressable onPress={() => setOpen(true)}>
            <FontAwesome
              name="search"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}
