import AlertList from "@/components/features/AlertList";
import FeedBadges from "@/components/features/FeedBadges";
import FeedEvents from "@/components/features/FeedEvents";
import FeedHeader from "@/components/features/FeedHeader";
import {
  getAlerts,
  getEvents,
  getEventsWithStatus,
  getProfile,
} from "@/db/queries";
import { AuthContext } from "@/provider/AuthProvider";
import React, { useContext } from "react";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function Feed() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const [alerts, setAlerts] = React.useState([]);
  const [profile, setProfile] = React.useState(null);
  //get user from context
  const auth = useContext(AuthContext);
  const user = auth.user || null;

  React.useEffect(() => {
    getEventsWithStatus(user?.id)
      .then(setEvents)
      .then(() => getAlerts().then(setAlerts));
    getProfile(user?.id).then(setProfile);
    console.log(profile);
  }, [user]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getEventsWithStatus(profile?.id).then(setEvents);
    getAlerts().then(setAlerts);
    setRefreshing(false);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 h-full justify-start bg-background">
      <FeedHeader
        dorm={profile?.user_attributes.dorms}
        src={profile?.avatar_url}
      />
      <ScrollView
        className="flex-1 pt-5"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Animated.View entering={FadeIn.duration(500)}>
          <Text className="text-content font-bold text-3xl px-5">Overview</Text>
          <View className="flex flex-row gap-2 px-5 mt-2">
            <Text className="text-lg text-content">Welcome</Text>
            <Text className="text-lg font-bold text-content">
              {profile?.full_name}!
            </Text>
          </View>
          <FeedBadges />
        </Animated.View>
        <FeedEvents events={events} />
        <AlertList alerts={alerts} />
      </ScrollView>
    </SafeAreaView>
  );
}
