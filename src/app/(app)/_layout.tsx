import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, router, Slot, Stack } from "expo-router";
import { StatusBar } from "react-native";
import { useColorScheme } from "nativewind";
import { ThemeProvider } from "@/components/shared/ThemeProviders";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { getUser } from "@/db/queries";
import colors from "@/constants/colors";
import { AuthProvider } from "@/provider/AuthProvider";

export default function RootLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  {
    /** Get the user 
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        //console.log("session", session);
      } else {
        console.log("no user");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(tabs)/feed");
        setSession(session);
      } else {
        console.log("no user");
        router.replace("/login");
      }
    });
  }, []);
  */
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              statusBarColor: colorScheme === "dark" ? "#000" : "#fff",
              statusBarStyle: colorScheme === "dark" ? "light" : "dark",
              navigationBarColor: colorScheme === "dark" ? "#000" : "#fff",
              contentStyle: {
                backgroundColor: colorScheme === "dark" ? "#000" : "#fff", // Your main app background color here
              },
              animation: "ios",
            }}
          />
          <Stack.Screen
            name="(features)"
            options={{
              headerShown: false,
              //headerTransparent: true,
              navigationBarColor: colorScheme === "dark" ? "#000" : "#fff",
              statusBarStyle: colorScheme === "dark" ? "light" : "dark",
              contentStyle: {
                backgroundColor: colorScheme === "dark" ? "#000" : "#fff", // Your main app background color here
              },
              animation: "ios",
              //make teh content take the status bar
              presentation: "fullScreenModal",
            }}
          />

          <Stack.Screen
            name="(modals)"
            options={{
              //make it modal and appear from below the screen
              headerTransparent: false,
              presentation: "containedModal",
              animation: "slide_from_bottom",
              navigationBarColor: colorScheme === "dark" ? "#000" : "#fff",
              statusBarStyle: colorScheme === "dark" ? "light" : "dark",
              contentStyle: {
                backgroundColor: colorScheme === "dark" ? "#000" : "#fff", // Your main app background color here
              },
              headerShown: false,
            }}
          />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
