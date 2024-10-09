// image picker component with expo-image-picker

import React, { useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImageModal from "./ImageModal";
import EventGaleryModal from "../features/EventGaleryModal";

export default function ImageSelector({ file, setFile, image, setImage }: any) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //allowsMultipleSelection: true,
      //aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <View className="bg-secondary">
      {file ? (
        <View className="relative">
          <Pressable onPress={() => setOpen(true)}>
            <Image
              source={{ uri: file.uri }}
              className="h-[400px] w-full"
              style={{ objectFit: "cover" }}
            />
          </Pressable>

          {/** X button to delete image */}
          <TouchableOpacity
            onPress={() => setFile(null)}
            activeOpacity={0.8}
            className="absolute top-3 right-3 flex items-center justify-center bg-[white]/60 rounded-full h-10 w-10"
          >
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="relative">
          <Pressable onPress={() => setOpen(true)}>
            <Image
              //default image from /asssets/events/party.png
              source={{
                uri: `https://qjpbtcomrwaxvyriixka.supabase.co/storage/v1/object/public/events/samples/${image}.png`,
              }}
              className="h-[400px] w-full"
              style={{ objectFit: "cover" }}
            />
          </Pressable>

          {/** X button to delete image */}
          <View className="absolute top-3 right-3 flex gap-3 justify-start items-end">
            {/** Upload image from device*/}
            <TouchableOpacity
              onPress={() => pickImage()}
              activeOpacity={0.8}
              className="flex-row gap-2 items-center justify-end bg-[white]/[0.8] rounded-full py-2 px-5"
            >
              <MaterialCommunityIcons name="upload" size={24} color="black" />
              <Text className="text-[black] font-bold">Upload image</Text>
            </TouchableOpacity>

            {/** Select image from galery */}
            <TouchableOpacity
              onPress={() => setOpen(true)}
              activeOpacity={0.8}
              className="flex-row gap-2 items-center justify-end bg-[white]/[0.8] rounded-full py-2 px-5"
            >
              <MaterialCommunityIcons
                name="image-multiple-outline"
                size={24}
                color="black"
              />
              <Text className="text-[black] font-bold">Galery</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/**<ImageModal image={image} isVisible={open} setIsVisible={setOpen} />*/}
      <EventGaleryModal
        setImage={setImage}
        isVisible={open}
        setIsVisible={setOpen}
      />
    </View>
  );
}
/*
<View className="p-5 flex items-center">
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.8}
            className="bg-secondary-inv opacity-75 rounded-xl px-5 py-2 w-full"
          >
            <Text className="text-content-inv text-center font-bold">
              Pick an image
            </Text>
          </TouchableOpacity>
        </View>
        */
