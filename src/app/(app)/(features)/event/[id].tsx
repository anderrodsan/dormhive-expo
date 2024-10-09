import React, { useContext } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { Link, router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { getEventById } from "@/db/queries";
import ImageModal from "@/components/shared/ImageModal";
import EventStatus from "@/components/features/EventStatus";
import { useFormatedDate } from "@/utils/format-date";
import { AuthContext } from "@/provider/AuthProvider";
import Feather from "@expo/vector-icons/Feather";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

export default function EventPage() {
  const { slug } = useLocalSearchParams();

  const { colorScheme } = useColorScheme();

  const [event, setEvent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  //get user from context
  const auth = useContext(AuthContext);
  const user = auth.user;

  useEffect(() => {
    getEventById(slug.toString()).then((event) => {
      setEvent(event);
    });
  }, []);

  // Replace spaces with "&" in the input text
  const locationUrl = event?.location.replace(/ /g, "&");

  const date = useFormatedDate(event?.date);
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the day name of the date
  const dayName = dayNames[new Date(event?.date).getDay()];

  //get the time from event.date "2022-12-01 20:00"
  const time = new Date(event?.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const IMG_HEIGHT = 400;

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
            "clamp"
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <View className="relative flex-1 flex-col bg-background">
      {/** Header */}
      <View className="absolute top-0 left-0 w-full flex flex-row justify-between items-center p-5 z-10">
        {/** Back Button */}
        <Pressable onPress={() => router.back()}>
          <View className="h-10 w-10 flex justify-center items-center bg-[white] rounded-full shadow-md shadow-[black]">
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={"black"}
            />
          </View>
        </Pressable>
        {/** Edit Event Button */}
        {user?.id === event?.creator_id && (
          <Pressable onPress={() => router.back()}>
            <View className="h-10 w-10 flex justify-center items-center bg-[white] rounded-full shadow-md shadow-[black]">
              <Feather name="edit" size={20} color="black" />
            </View>
          </Pressable>
        )}
      </View>

      {/** Open Image and zoom */}
      <ImageModal
        image={event?.img}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        className="flex-1"
      >
        <Pressable onPress={() => setIsVisible(true)}>
          <Animated.Image
            source={{ uri: event?.img }}
            style={[{ objectFit: "cover" }, imageAnimatedStyle]}
            className={`h-[${IMG_HEIGHT}px] w-full`}
          />
        </Pressable>

        {/** Event Details */}
        <View className="flex-1 bg-background w-full -mt-3 rounded-xl p-5 gap-3">
          <View className="flex-row justify-between w-full">
            <View className="space-y-2">
              <Text className="text-xl font-bold text-content">
                {event?.title}
              </Text>
              <View className="flex-row gap-2 items-center pt-2">
                {/**Avatar */}
                <Text className="text-content">
                  by{" "}
                  {event?.creator_id === user?.id
                    ? "me"
                    : `@${event?.users.username}`}
                </Text>
              </View>
            </View>
            <View className="flex flex-col justify-center items-center w-16 h-16 bg-primary rounded-md flex-shrink-0 ml-3">
              <Text className="text-xl text-[white] font-bold">20</Text>
              <Text className="text-[white] font-bold">Jun</Text>
            </View>
          </View>

          {/** Attending Info */}
          <EventStatus
            eventId={event?.id}
            setEvent={setEvent}
            userId={user?.id}
          />

          {/** Date info */}
          <View className="flex-row justify-between gap-3 bg-secondary items-center p-3 rounded-xl border-secondary">
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <View className="flex-1">
              <Text className="font-semibold  text-content">
                {dayName} , {date}
              </Text>
              <Text className=" text-content">{time}</Text>
            </View>
          </View>

          {/** Location info */}
          <View className="flex-row justify-between gap-3 bg-secondary items-center p-3 rounded-xl border-secondary">
            <MaterialCommunityIcons
              name="map-marker"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <View className="flex-1">
              <Text className="font-semibold text-content">
                {event?.location}
              </Text>
            </View>
            <Link
              href={`https://www.google.com/maps/search/${locationUrl}`}
              target="_blank"
            >
              <View className="flex flex-row items-center bg-secondary-100 px-3 py-2 rounded-lg">
                <Octicons
                  name="link-external"
                  size={20}
                  color={colorScheme === "dark" ? "white" : "black"}
                  className="opacity-80"
                />
                <Text className="text-content opacity-80 ml-2">
                  Open in Maps
                </Text>
              </View>
            </Link>
          </View>
          <View className="flex flex-col gap-2 mt-5 mb-40">
            <Text className="font-bold text-lg">Description</Text>
            {/* Display the breaks and other html tags in the text (<br/>, etc.) */}
            <Text className="text-content">{event?.text}</Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
