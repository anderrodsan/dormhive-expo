import { supabase } from "@/utils/supabase";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";

export default function SignOut() {
  return (
    <TouchableOpacity
      className="flex-row items-center gap-2 px-5 py-2 rounded-xl border border-[red]/60 font-bold"
      onPress={() => supabase.auth.signOut()}
    >
      <Octicons name="sign-out" size={20} color="red" />
      <Text className="text-[red] font-bold">Sign Out</Text>
    </TouchableOpacity>
  );
}
