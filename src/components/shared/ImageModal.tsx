import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import React from "react";
import { Image, Modal, Pressable, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ImageModal({
  image,
  isVisible,
  setIsVisible,
}: {
  image: string;
  isVisible: boolean;
  setIsVisible?: (isVisible: boolean) => void;
}) {
  return (
    <Modal
      //header to close
      animationType="fade"
      visible={isVisible}
      transparent
      onRequestClose={() => setIsVisible(false)}
      style={{ backgroundColor: "black" }}
      className="relative"
    >
      {/** Make the whole page darker when the image is open */}
      <View className="absolute inset-0 w-full h-full bg-[black] opacity-70 transition duration-300" />

      <ReactNativeZoomableView
        maxZoom={5}
        minZoom={1}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
        onZoomAfter={this.logOutZoomState}
      >
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </ReactNativeZoomableView>
    </Modal>
  );
}
