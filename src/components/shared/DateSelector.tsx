import React, { useState } from "react";
import {
  Button,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormatedDate } from "@/utils/format-date";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function DateSelector({
  title,
  mode,
  date,
  setDate,
  className,
}: any) {
  const [show, setShow] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);
  const { colorScheme } = useColorScheme();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log(currentDate);
    setShow(false);

    //if mode == date -> format the date to YYYY-MM-DD and setDate, if mode == time -> format the time to HH:MM and setDate
    if (mode == "date") {
      //YYYY-MM-DD
      setDate(currentDate.toLocaleDateString("se-SE"));
    } else if (mode == "time") {
      // HH:MM without AM/PM
      setDate(
        currentDate.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
    setSelected(true);
  };

  return (
    <View className={`flex gap-2 ${className}`}>
      <Text className="font-bold text-content  opacity-75">{title}</Text>
      <Pressable
        onPress={() => {
          setShow(true);
          //set the date now
          setDate(new Date());
        }}
        className="w-full flex-row justify-between items-center bg-white rounded-lg border border-secondary px-3 py-2"
      >
        <TextInput
          placeholder={`Select ${mode}`}
          placeholderTextColor={"gray"}
          value={date}
          onChangeText={setDate}
          editable={false}
          className="text-content opacity-80"
        />
        <MaterialCommunityIcons
          name={mode == "date" ? "calendar-month-outline" : "clock-outline"}
          size={20}
          color={colorScheme === "dark" ? "white" : "black"}
          className="opacity-30"
        />
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="default"
          themeVariant={colorScheme === "dark" ? "dark" : "light"}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}
