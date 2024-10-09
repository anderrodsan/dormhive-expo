import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import React, { useEffect } from "react";
import { Image, Modal, Pressable, View, Text, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function EventGaleryModal({
  setImage,
  isVisible,
  setIsVisible,
}: {
  setImage: (image: string) => void;
  isVisible: boolean;
  setIsVisible?: (isVisible: boolean) => void;
}) {
  const { colorScheme } = useColorScheme();
  const images = ["party", "concert", "picnic", "community"];

  const baseUrl =
    "https://qjpbtcomrwaxvyriixka.supabase.co/storage/v1/object/public/events/samples/";

  return (
    <Modal
      //header to close
      animationType="slide"
      visible={isVisible}
      transparent
      onRequestClose={() => setIsVisible(false)}
      statusBarTranslucent
      className=""
    >
      <View className="flex-1 justify-end">
        <Pressable
          onPress={() => setIsVisible(false)}
          className="h-20 w-full bg-[black]/[0.3]"
        />
        <View className="flex-1 relative flex gap-5 justify-start bg-white px-5 py-5 rounded-t-xl">
          <Text className="text-center text-content text-2xl font-bold">
            Select image
          </Text>
          <Pressable
            onPress={() => setIsVisible(false)}
            className="absolute top-6 right-5"
          >
            <MaterialCommunityIcons
              name="close"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
          <ScrollView className="flex-1">
            {images.map((image) => (
              <Pressable
                key={image}
                onPress={() => {
                  setImage(image);
                  setIsVisible(false);
                }}
              >
                <Image
                  source={{
                    uri: `${baseUrl}${image}.png`,
                  }}
                  className="h-40 w-full rounded-xl mb-5"
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
