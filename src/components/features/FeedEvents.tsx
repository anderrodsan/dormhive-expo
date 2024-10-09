import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import EventItem from "./EventItem";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import AnimatedItem from "../animations/AnimatedItem";
export default function FeedEvents({ events }: any) {
  return (
    <View className="space-y-2">
      <View className=" px-5 flex-row justify-between items-center">
        <View className="flex gap-2 items-center">
          {/*<CalendarDays/>*/}
          <Text className="font-bold text-lg text-content">
            Upcoming Events
          </Text>
        </View>

        <Link href={"/events"} className="text-primary text-blue-500 font-bold">
          See All
        </Link>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {events.length > 0 &&
          events.map((event: any, index: number) => (
            <AnimatedItem
              delay={index * 50}
              key={index}
              className={`w-[200px] py-2 ${
                index === events.length - 1 ? "mx-5" : "ml-5"
              }`}
            >
              <EventItem event={event} />
            </AnimatedItem>
          ))}
      </ScrollView>
    </View>
  );
}

async function getEvents() {
  const { data: events, error } = await supabase
    .from("events")
    .select("*, users(*)")
    .order("start_date", { ascending: true });

  return events;
}

const eventData = [
  {
    id: "1",
    name: "Music Festival",
    date: "2024-01-11 14:20:36.612872+00",
    location: "City Park",
    creator: "Melody Productions",
    text: "The Music Festival is an annual celebration of diverse music genres, featuring live performances from renowned artists. Join us for a weekend filled with rhythm, beats, and a vibrant atmosphere. Let the melodies take you on a journey!<br/><br/>Experience an array of musical talent while enjoying delicious food from local vendors. Dance to your favorite tunes or discover new ones in the company of music enthusiasts. Come and be part of this unforgettable celebration!",
    image:
      "https://i.pinimg.com/564x/9d/8a/f4/9d8af446a7e8f27aef89e57e31c2fb02.jpg",
    avatar_url:
      "https://i.pinimg.com/564x/ef/2c/a9/ef2ca91bd27e35288c0d579c7884fe85.jpg",
    status: "going",
  },
  {
    id: "2",
    name: "Workshop",
    date: "2024-02-13 14:20:36.612872+00",
    location: "Community Center",
    image:
      "https://i.pinimg.com/564x/08/93/e3/0893e3bbb48f5b6113006782479313b9.jpg",
    text: "Join our workshop at the Community Center designed to inspire creativity and innovation. Engage in interactive sessions led by industry experts, where you'll learn new skills and gain insights into the latest trends.<br/><br/>Unlock your potential, network with like-minded individuals, and leave empowered to bring fresh ideas to life. Explore various disciplines and dive deep into the world of possibilities!",
    creator: "DIK",
    avatar_url:
      "https://i.pinimg.com/564x/ef/2c/a9/ef2ca91bd27e35288c0d579c7884fe85.jpg",
    status: "interested",
  },
  {
    id: "3",
    name: "Conference",
    date: "2024-02-28 14:20:36.612872+00",
    location: "Karaoke Bar",
    image:
      "https://i.pinimg.com/564x/e5/5b/d0/e55bd0f09f409f15fe638e507e349c1f.jpg",
    text: "The Conference at the Convention Center brings together visionaries, innovators, and leaders from around the globe. Engage in thought-provoking discussions, gain insights from influential speakers, and explore cutting-edge ideas that shape our future.<br/><br/>Connect with industry pioneers, participate in workshops, and contribute to meaningful dialogues. Join us in this gathering of minds to drive positive change and innovation.",
    creator: "Convention Center",
    avatar_url:
      "https://i.pinimg.com/564x/ef/2c/a9/ef2ca91bd27e35288c0d579c7884fe85.jpg",
    status: "",
  },
  {
    id: "3",
    name: "Conference",
    date: "2024-02-28 14:20:36.612872+00",
    location: "Karaoke Bar",
    image:
      "https://i.pinimg.com/564x/e5/5b/d0/e55bd0f09f409f15fe638e507e349c1f.jpg",
    text: "The Conference at the Convention Center brings together visionaries, innovators, and leaders from around the globe. Engage in thought-provoking discussions, gain insights from influential speakers, and explore cutting-edge ideas that shape our future.<br/><br/>Connect with industry pioneers, participate in workshops, and contribute to meaningful dialogues. Join us in this gathering of minds to drive positive change and innovation.",
    creator: "Convention Center",
    avatar_url:
      "https://i.pinimg.com/564x/ef/2c/a9/ef2ca91bd27e35288c0d579c7884fe85.jpg",
    status: "",
  },
  {
    id: "3",
    name: "Conference",
    date: "2024-02-28 14:20:36.612872+00",
    location: "Karaoke Bar",
    image:
      "https://i.pinimg.com/564x/e5/5b/d0/e55bd0f09f409f15fe638e507e349c1f.jpg",
    text: "The Conference at the Convention Center brings together visionaries, innovators, and leaders from around the globe. Engage in thought-provoking discussions, gain insights from influential speakers, and explore cutting-edge ideas that shape our future.<br/><br/>Connect with industry pioneers, participate in workshops, and contribute to meaningful dialogues. Join us in this gathering of minds to drive positive change and innovation.",
    creator: "Convention Center",
    avatar_url:
      "https://i.pinimg.com/564x/ef/2c/a9/ef2ca91bd27e35288c0d579c7884fe85.jpg",
    status: "",
  },
];
