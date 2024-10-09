import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function AnimatedItem({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <Animated.View
      entering={FadeInDown.springify().damping(100).delay(delay)}
      className={className}
    >
      {children}
    </Animated.View>
  );
}
