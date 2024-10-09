import React, { useCallback, useContext, useMemo, useRef } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";

import { Link, router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { getEventById, getGroup, getMessages } from "@/db/queries";
import ImageModal from "@/components/shared/ImageModal";
import EventStatus from "@/components/features/EventStatus";
import { useFormatedDate } from "@/utils/format-date";
import Avatar from "@/components/shared/Avatar";
import MessageCard from "@/components/features/MessageCard";
import MessageInput from "@/components/shared/MessageInput";
import { supabase } from "@/utils/supabase";
import { AuthContext } from "@/provider/AuthProvider";

export default function ChatPage() {
  const { slug } = useLocalSearchParams();
  const [messages, setMessages] = useState(null);
  const [group, setGroup] = useState(null);
  const scrollViewRef = useRef(null);

  const { colorScheme } = useColorScheme();

  //get user from context
  const auth = useContext(AuthContext);
  const user = auth.user;

  useEffect(() => {
    getGroup(slug).then((group) => {
      setGroup(group);
    });
    getMessages(slug).then((messages) => {
      setMessages(messages);
      scrollToBottom();
    });
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  //message submit action
  const handleSubmit = async (message) => {
    console.log(message);

    // Send the message to supabase
    const { error } = await supabase
      .from("messages")
      .insert({ text: message, group_id: slug });
    if (error) {
      console.log(error);
    } else {
      //add the message to the list
      const newMessage = {
        text: message,
        creator_id: user?.id,
        created_at: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollToBottom();
    }
  };

  return (
    <View className="relative flex-1 flex-col bg-background">
      {/** Header */}
      <View className="sticky top-0 z-20 bg-opacity-70 bg-white flex justify-between items-center px-5 py-3">
        <View className="cursor-pointer flex-row gap-3 items-center w-full justify-start">
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
          <Avatar src={group?.icon} className="w-12 h-12" />
          <View className="flex">
            <Text className="font-bold text-xl text-content">
              {group?.title}
            </Text>
            <Text className="text-content opacity-50">
              {group?.count[0].count}{" "}
              {group?.count[0].count === 1 ? "member" : "members"}
            </Text>
          </View>
        </View>
      </View>

      {/** Scrollable Messages starting from the bottom */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.container}>
          {messages?.map((message, index) => {
            const creator = message.creator_id === user?.id;

            return (
              <View
                className={`py-2 flex ${creator ? "items-end" : "items-start"}`}
                key={index}
              >
                <MessageCard message={message} creator={creator} />
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/** Text Input */}
      <MessageInput handleSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
