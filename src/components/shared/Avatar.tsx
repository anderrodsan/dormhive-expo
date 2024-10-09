import React from "react";
import { Image } from "react-native";
import { View } from "react-native";

export default function Avatar({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <Image
      source={{ uri: src }}
      style={{ objectFit: "cover" }}
      className={`rounded-full ${className}`}
    />
  );
}
