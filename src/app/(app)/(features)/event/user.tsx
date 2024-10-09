import Auth from "@/components/auth/Auth";
import MarketHeader from "@/components/features/MarketHeader";
import ProductCard from "@/components/features/ProductCard";
import BadgeFilter from "@/components/shared/BadgeFilter";
import CreateButton from "@/components/shared/CreateButton";
import HeaderSearch from "@/components/shared/HeaderSearch";
import { getMyEvents, getMyProducts, getProducts } from "@/db/queries";
import { AuthContext } from "@/provider/AuthProvider";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Pressable, RefreshControl } from "react-native";
import { ScrollView } from "react-native";
import { Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import EventItem from "@/components/features/EventItem";

export default function MyEvents() {
  const { colorScheme } = useColorScheme();
  const [events, setEvents] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  //get user from context
  const auth = useContext(AuthContext);
  const user = auth.user || null;

  React.useEffect(() => {
    //set the events and filteredevents
    getMyEvents(user.id).then((events) => {
      setEvents(events);
    });
  }, [user]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //set the events and filteredevents
    getMyEvents(user.id).then((events) => {
      setEvents(events);
    });
    setRefreshing(false);
  }, []);

  return (
    <View className="relative flex-1 bg-background">
      {/* Header */}
      <View className="flex-row justify-between items-center gap-3 py-3 px-5 bg-white">
        <Pressable onPress={() => router.back()}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </Pressable>
        <Text className="flex-1 font-bold text-xl text-content">My events</Text>
      </View>
      <ScrollView
        className="px-5 pb-1 pt-5"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {events.map((event: any, index: number) => (
          <View key={index} className={`w-full pb-5`}>
            <EventItem event={event} />
          </View>
        ))}
        <View className="h-10" />
      </ScrollView>
      {/** New Product */}
      <CreateButton icon="add" path={"/(modals)/new-event"} />
    </View>
  );
}
