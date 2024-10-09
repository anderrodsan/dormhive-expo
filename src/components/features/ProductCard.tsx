import { Image, Pressable } from "react-native";
import { View, Text } from "react-native";
import Avatar from "../shared/Avatar";
import { router } from "expo-router";
import React from "react";

export default function ProductCard({ product, userId }: any) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/product/[id]",
          params: { slug: product.id },
        })
      }
      className={`relative rounded-lg border-secondary`}
    >
      <Image
        source={{ uri: product.img }}
        className="h-[150px] w-full rounded-xl"
      />
      <View className="absolute top-3 left-3 bg-white border rounded-lg px-2 py-1 border-secondary">
        {product?.price > 0 ? (
          <View className="flex-row gap-1">
            <Text className="font-bold text-lg text-content">
              {product?.price}
            </Text>
            <Text className="font-bold text-lg text-content">
              {product?.currency}
            </Text>
          </View>
        ) : (
          <Text className="font-bold text-lg text-content">Free</Text>
        )}
      </View>
      {/** Info 
      <View className="flex gap-1 pt-1 pb-3">
        <Text className="font-bold text-lg text-content">{product?.title}</Text>
        <View className="flex-row justify-between items-center gap-2">
          <Avatar
            src={product.users.avatar_url}
            className="w-7 h-7 rounded-full"
          />
          <Text className="flex-1 opacity-80 text-content">
            {product?.users.username}
          </Text>
        </View>
      </View>*/}

      <View className="flex-row items-center gap-3 pt-1">
        <Avatar
          src={product.users.avatar_url}
          className="w-7 h-7 rounded-full"
        />

        <View className="flex ">
          <Text className="font-bold text-content">{product?.title}</Text>
          <Text className="flex-1 opacity-80 text-content text-sm">
            {userId === product.users.id ? "Me" : `@${product?.users.username}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
