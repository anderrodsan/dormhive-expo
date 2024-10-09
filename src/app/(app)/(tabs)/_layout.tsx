import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import colors from "@/constants/colors";

export default function TabsLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          borderTopColor: colorScheme === "dark" ? "#000" : "#fff",
          height: 60,
        },
        //avoid scrolling when keyboard
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={"home-outline"}
              focusedIcon={"home"}
              size={30}
              name={"Home"}
              focused={focused}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={"account-group-outline"}
              focusedIcon={"account-group"}
              size={30}
              name={"Chats"}
              focused={focused}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={"calendar-month-outline"}
              focusedIcon={"calendar-month"}
              size={30}
              name={"Events"}
              focused={focused}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="market"
        options={{
          title: "Market",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={"store-outline"}
              focusedIcon={"store"}
              size={30}
              name={"Market"}
              focused={focused}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={"menu"}
              focusedIcon={"menu"}
              size={30}
              name={"Menu"}
              focused={focused}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const TabIcon = ({ icon, focusedIcon, size, name, focused, color }) => {
  return (
    <View className="flex-1 items-center justify-center space-y-1 w-full">
      <MaterialCommunityIcons
        name={focused ? focusedIcon : icon}
        size={size}
        stro
        color={`${focused ? color : color}`}
      />
      <Text className={`text-sm text-content`}>{name}</Text>
    </View>
  );
};
