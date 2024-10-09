import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useMemo, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import TextInputComponent from "@/components/shared/TextInput";

import DateTimePicker from "@react-native-community/datetimepicker";
import ImageSelector from "@/components/shared/ImagePicker";
import DateSelector from "@/components/shared/DateSelector";
import SubmitButton from "@/components/shared/SubmitButton";
import { supabase } from "@/utils/supabase";
import * as Crypto from "expo-crypto";
import { AuthContext } from "@/provider/AuthProvider";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

export default function NewEvent() {
  /** Bottom sheet 
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  */
  const { colorScheme } = useColorScheme();

  //get user from context
  const auth = useContext(AuthContext);
  const profile = auth.profile || null;

  const [image, setImage] = React.useState("party");
  const [file, setFile] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [date, setDate] = React.useState();
  const [time, setTime] = React.useState();
  const [location, setLocation] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  async function handleSubmit() {
    setLoading(true);
    //3 seconds delay

    //generate a unique crypto uuid for the image
    const UUID = Crypto.randomUUID();

    if (file) {
      //upload the image to supabase
      const fileExt = file.uri.split(".").pop();
      const base64 = await FileSystem.readAsStringAsync(file.uri, {
        encoding: "base64",
      });
      const filePath = `${profile!.id}/${UUID}.${fileExt}`;
      console.log(filePath);
      const contentType = "image";
      await supabase.storage
        .from("events")
        .upload(filePath, decode(base64), { contentType });

      //insert data into the events table
      const { data, error } = await supabase
        .from("events")
        .insert({
          id: UUID,
          title: title,
          text: text,
          date: date + " " + time,
          location: location,
          dorm_id: profile?.user_attributes.dorms.id,
          img:
            process.env.EXPO_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/events/" +
            profile.id +
            UUID +
            "." +
            fileExt,
        })
        .select();
      if (error) {
        console.log(error);
      }
    } else {
      //insert data into the events table
      const { data, error } = await supabase
        .from("events")
        .insert({
          title: title,
          text: text,
          date: date + " " + time,
          location: location,
          dorm_id: profile?.user_attributes.dorms.id,
          img:
            process.env.EXPO_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/events/samples/" +
            image +
            ".png",
        })
        .select();
      if (error) {
        console.log(error);
      }
    }

    setLoading(false);
  }

  return (
    <View className="relative flex-1 flex-col bg-background">
      {/** Header */}
      <View className="sticky top-0 z-20 bg-opacity-70 bg-white flex justify-between items-center p-5">
        <View className="cursor-pointer flex-row gap-3 items-center w-full justify-start">
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
          <Text className="font-bold text-xl text-content">New Event</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Image Picker */}
        <View>
          <ImageSelector
            file={file}
            setFile={setFile}
            image={image}
            setImage={setImage}
          />
        </View>

        {/** Event Details */}
        <View
          className={`flex-1 p-5 rounded-xl bg-white gap-5 ${image && "-mt-5"}`}
        >
          <Text className="font-bold text-content text-center text-xl opacity-75">
            Event Details
          </Text>
          {/** title input */}
          <TextInputComponent title="Title" data={title} setData={setTitle} />

          <View className="flex-row">
            {/** date input -- Gives ERROR*/}
            <DateSelector
              title="Date"
              mode="date"
              date={date}
              setDate={setDate}
              className="w-1/2 pr-1"
            />

            {/** time input */}
            <DateSelector
              title="Time"
              mode="time"
              date={time}
              setDate={setTime}
              className="w-1/2 pl-1"
            />
          </View>

          {/** location input */}
          <TextInputComponent
            title="Location"
            data={location}
            setData={setLocation}
          />
          {/** description input */}
          <TextInputComponent
            title="Description"
            data={text}
            setData={setText}
            className="h-40"
          />

          {/** Submit Button */}
          <SubmitButton
            title="Add Event"
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </View>
      </ScrollView>
    </View>
  );
}
