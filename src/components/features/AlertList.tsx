import { getAlerts } from "@/db/queries";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AlertCard from "./AlertCard";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AnimatedItem from "../animations/AnimatedItem";

export default function AlertList({ alerts }: any) {
  return (
    <View className="space-y-3 px-5 mb-10">
      <View className="flex-row justify-between items-center">
        <View className="flex gap-2 items-center">
          {/*<Bell/>*/}
          <Text className="font-bold text-content text-lg">News</Text>
        </View>

        <Link href={"/alerts"} className="text-primary font-bold">
          See All
        </Link>
      </View>
      {alerts.length > 0 ? (
        <View className="flex gap-5 mt-3">
          {/** Pinned alerts go first*/}
          {alerts.map((alert, index) => {
            if (!alert.pinned) {
              return null;
            }
            return (
              <AnimatedItem delay={index * 50} key={index}>
                <AlertCard alert={alert} />
              </AnimatedItem>
            );
          })}
          {/** Unpinned alerts*/}
          {alerts.map((alert: any, index: any) => {
            if (alert.pinned) {
              return null;
            }
            return (
              <AnimatedItem delay={index * 50} key={index}>
                <AlertCard alert={alert} />
              </AnimatedItem>
            );
          })}
        </View>
      ) : (
        <View className="flex-row gap-3 items-center my-5 p-5 w-full rounded-lg bg-secondary opacity-80">
          <MaterialCommunityIcons
            name="newspaper-variant-multiple"
            size={24}
            color="black"
            className="opacity-70"
          />
          <Text className="text-secondary-inv">News comming soon!</Text>
        </View>
      )}
    </View>
  );
}
