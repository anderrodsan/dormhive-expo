import { Slot } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";

export default function FeaturesLayout() {
  const { colorScheme } = useColorScheme();

  return <Slot />;
}
