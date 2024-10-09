import React, { useState } from "react";
import { Alert, View, AppState, TextInput, Text, Image } from "react-native";
import { supabase } from "@/utils/supabase";
import { Button, Input } from "react-native-elements";
import { router } from "expo-router";
import TextInputComponent from "../shared/TextInput";
import SubmitButton from "../shared/SubmitButton";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View className="flex-1 flex justify-end gap-5 pb-20">
      <View className="pb-5 gap-1">
        <Text className="text-primary font-bold text-5xl">Welcome</Text>
        <Text className="opacity-80">Sign in to your account to continue</Text>
      </View>

      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
        autoCapitalize={"none"}
        className="flex flex-row text-lg px-5 py-2 gap-2 w-full border border-primary rounded-lg"
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        autoCapitalize={"none"}
        className="flex flex-row text-lg px-5 py-2 gap-2 w-full border border-primary rounded-lg"
      />
      <SubmitButton
        title="Sign In"
        loading={loading}
        handleSubmit={() => {
          signInWithEmail(), router.replace("/(tabs)/feed");
        }}
      />
      <Text className="text-center">
        Don't have an account?{" "}
        <Text
          className="text-primary font-bold"
          onPress={() => router.replace("/(auth)/sign-up")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}
