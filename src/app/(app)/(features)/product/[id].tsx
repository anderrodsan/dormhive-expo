import React from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { Link, router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import {
  getAlertById,
  getEventById,
  getProductById,
  getProductImages,
} from "@/db/queries";
import Avatar from "@/components/shared/Avatar";
import { useFormatedDate } from "@/utils/format-date";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import ImageModal from "@/components/shared/ImageModal";

export default function Product() {
  const { slug } = useLocalSearchParams();

  const { colorScheme } = useColorScheme();
  const width = Dimensions.get("window").width;

  const [product, setProduct] = useState(null);

  // The images for the product need the base url from the supabase projects -> baseUrl + (userId/productId/ImageName.png)
  const [images, setImages] = useState([]);
  const baseUrl =
    "https://qjpbtcomrwaxvyriixka.supabase.co/storage/v1/object/public/products/";

  useEffect(() => {
    getProductById(slug.toString()).then((product) => {
      setProduct(product);
    });

    getProductImages(slug.toString()).then((images) => {
      setImages(images);
      console.log(images);
    });
  }, []);

  const [idx, setIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View className={`relative flex-1 w-full flex-col bg-white`}>
      {/** Header */}
      <View className="absolute top-0 left-0 flex justify-between items-center p-5 z-10">
        <Pressable onPress={() => router.back()}>
          <View className="h-10 w-10 flex justify-center items-center bg-[white] rounded-full">
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={"black"}
            />
          </View>
        </Pressable>
      </View>

      {/** Product Details */}
      <ScrollView className="flex-1 flex-col bg-white w-full rounded-xl">
        {/** image carousel */}
        <View className="relative w-full h-[400px] bg-secondary-100">
          <Carousel
            loop={false}
            width={width}
            height={400}
            autoPlay={false}
            data={[...new Array(images.length).keys()]}
            scrollAnimationDuration={500}
            onSnapToItem={(index) => setIdx(index)}
            renderItem={({ index }) => (
              <Pressable
                onPress={() => setIsVisible(true)}
                className="relative"
              >
                <Image
                  source={{
                    uri: baseUrl + images[index],
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Pressable>
            )}
          />
        </View>

        <ImageModal
          image={baseUrl + images[idx]}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />

        {/** Product Details */}
        <View className="flex-1 bg-white w-full rounded-xl p-5 gap-3 border-t border-secondary -mt-3">
          {/** map dots showing how many images there are */}
          {images.length > 1 && (
            <View className=" w-full flex-row items-center justify-center">
              <View className="flex-row gap-2 px-3 py-1 rounded-full">
                {images.map((_, index) => (
                  <View
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === idx ? "bg-primary" : "bg-[gray]/40"
                    }`}
                  />
                ))}
              </View>
            </View>
          )}
          <View className="space-y-2">
            <View className="flex-row justify-between gap-2">
              <Text className="text-2xl font-bold text-content">
                {product?.title}
              </Text>
              <View className="flex-row gap-1 justify-start items-start px-3 py-1 bg-primary rounded-lg">
                <Text className="text-xl text-[white] font-bold">
                  {product?.price}
                </Text>
                <Text className="text-xl text-[white] font-bold">
                  {product?.currency}
                </Text>
              </View>
            </View>
            <View className="flex-row gap-2 items-center pt-2">
              <Avatar
                src={product?.users.avatar_url}
                className="h-7 w-7 rounded-full"
              />
              <Text className="text-content">
                by @{product?.users.username}
              </Text>
            </View>
          </View>

          <View className="flex-1 flex-col gap-2 mt-5">
            <Text className="font-bold text-lg text-content">Description</Text>
            {/* Display the breaks and other html tags in the text (<br/>, etc.) */}
            <Text className="text-content opacity-80">{product?.text}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
