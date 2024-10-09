import { getProductChats, getProducts, getProfile } from "@/db/queries";
import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import Avatar from "@/components/shared/Avatar";
import { supabase } from "@/utils/supabase";
import SignOut from "@/components/auth/SignOut";
import colors from "@/constants/colors";
import { AuthContext } from "@/provider/AuthProvider";
import GroupCard from "@/components/features/GroupCard";
import ProductChatCard from "@/components/features/ProductChatCard";

export default function Profile() {
  const { colorScheme } = useColorScheme();
  const [chats, setChats] = React.useState([]);

  useEffect(() => {
    /*
    getProducts().then((products) => {
      setProducts(products);
      //map the products and set it as: chats [{id: product.id, title: product.title, icon: product.img}]
      const chats = products.map((product) => ({
        id: product.id,
        title: product.title,
        icon: product.img,
      }));

      setChats(chats);
    });
    */
    getProductChats().then((chats) => {
      setChats(chats);
    });
  }, []);

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center py-3 px-5 bg-white">
        <View className="flex-row gap-4 items-center">
          <Pressable onPress={() => router.back()}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
          <Text className="flex-1 font-bold text-xl text-content">Chats</Text>
        </View>
      </View>

      <ScrollView className="flex-1 bg-background">
        <View className="flex gap-5 px-5 mt-5">
          {chats?.map((chat) => (
            <View className="" key={chat.id}>
              <ProductChatCard chat={chat} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
