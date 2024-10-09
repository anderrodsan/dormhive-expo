import { Slot } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Slot screenOptions={{ headerShown: false, headerTransparent: true }} />
  );
};

export default Layout;
