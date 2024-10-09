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
import { colorScheme, useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import {
  getEventById,
  getGroup,
  getMessages,
  getProductChatById,
  getProductChats,
  getProductMessages,
} from "@/db/queries";
import ImageModal from "@/components/shared/ImageModal";
import EventStatus from "@/components/features/EventStatus";
import { useFormatedDate } from "@/utils/format-date";
import Avatar from "@/components/shared/Avatar";
import MessageCard from "@/components/features/MessageCard";
import MessageInput from "@/components/shared/MessageInput";
import { supabase } from "@/utils/supabase";
import { AuthContext } from "@/provider/AuthProvider";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  SystemMessage,
  IMessage,
} from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";

export default function ChatPage() {
  const { slug } = useLocalSearchParams();
  const [messages, setMessages] = useState<IMessage[]>(null);
  const [text, setText] = useState("");
  const [product, setProduct] = useState(null);
  const scrollViewRef = useRef(null);

  const { colorScheme } = useColorScheme();

  //get user from context
  const auth = useContext(AuthContext);
  const user = auth.user;

  useEffect(() => {
    getProductChatById(slug.toString()).then((product) => {
      setProduct(product);
      console.log(product);
    });
    getProductMessages(slug.toString()).then((messages) => {
      setMessages([
        ...messages.map((message) => {
          return {
            _id: message.id,
            text: message.text,
            createdAt: new Date(message.created_at),
            user: {
              _id: message.sender_id,
              name: message.users.username,
              avatar: message.users.avatar_url,
            },
          };
        }),
      ]);
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
      .from("product_messages")
      .insert({ text: message, chat_id: slug });
    if (error) {
      console.log(error);
    } else {
      //add the message to the list
      const newMessage = {
        _id: new Date().toString(),
        text: message,
        createdAt: new Date(),
        user: {
          _id: user.id,
        },
      };
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
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
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { slug: product?.product_id },
              })
            }
          >
            <Avatar src={product?.products.img} className="w-12 h-12" />
          </Pressable>

          <View className="flex">
            <Text className="font-bold text-xl text-content">
              {product?.products.title}
            </Text>
            <Text className="text-content opacity-50">
              {product?.seller_id === user.id ? product.seller.username : "me"}
              {", "}
              {product?.buyer_id === user.id ? product.buyer.username : "me"}
            </Text>
          </View>
        </View>
      </View>

      <GiftedChat
        messages={messages}
        onSend={(message) => handleSubmit(message[0].text)}
        renderUsernameOnMessage={true}
        user={{ _id: user?.id, name: user?.username }}
        renderSend={(props) => (
          <View className="flex-row items-center">
            <Send {...props}>
              <Ionicons
                name="send"
                size={20}
                color={"#3b82f6"}
                className="mb-3 mr-5"
              />
            </Send>
          </View>
        )}
        textInputProps={{
          style: {
            color: colorScheme === "dark" ? "white" : "black",
            padding: 10,
            flex: 1,
          },
        }}
        renderChatEmpty={() => <Text>No messages</Text>}
        renderInputToolbar={(props: any) => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: colorScheme === "dark" ? "black" : "white",
              }}
            />
          );
        }}
        renderBubble={(props: any) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: "white",
                },
                left: {
                  color: colorScheme === "dark" ? "white" : "black",
                },
              }}
              wrapperStyle={{
                right: {
                  backgroundColor: "#3b82f6",
                },
                left: {
                  backgroundColor:
                    colorScheme === "dark" ? "#1e293b" : "#e2e8f0",
                },
              }}
            />
          );
        }}
      />
    </View>
  );
}
