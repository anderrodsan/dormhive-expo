import "../global.css";

import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import colors from "@/constants/colors";

export default function Root() {
  const { colorScheme } = useColorScheme();
  // Set up the auth context and render our layout inside of it.
  return (
    <Stack>
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
          statusBarColor: colorScheme === "dark" ? "#000" : "#fff",
          navigationBarColor: colorScheme === "dark" ? "#000" : "#fff",
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff", // Your main app background color here
          },
          animation: "ios",
        }}
      />
      <Stack.Screen
        name="(app)"
        options={{
          headerShown: false,
          headerTransparent: true,
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff", // Your main app background color here
          },
          animation: "ios",
        }}
      />
    </Stack>
  );
}
