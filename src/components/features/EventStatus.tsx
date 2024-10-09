import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import { supabase } from "@/utils/supabase";
import { getEventStatus } from "@/db/queries";

export default function EventStatus({
  className,
  eventId,
  setEvent,
  userId,
}: {
  className?: string;
  eventId: any;
  setEvent: any;
  userId: any;
}) {
  const { colorScheme } = useColorScheme();

  const [status, setStatus] = React.useState<string | null>(null);
  const [statuses, setStatuses] = React.useState<any>([]);

  //console.log(userId, statuses);
  useEffect(() => {
    getEventStatus(eventId).then((statuses) => {
      setStatuses(statuses);
      console.log(statuses);
      const userStatus =
        statuses && userId
          ? statuses.find((s: any) => s.user_id === userId)
          : null;
      setStatus(userStatus?.status);
    });
  }, [eventId, userId]);

  async function handleChange(event: any) {
    //if the user status is undefined, update the state to "going", otherwise delete the row
    if (!status) {
      const { error } = await supabase.from("event_status").insert([
        {
          event_id: eventId,
          status: "going",
        },
      ]);
      setStatus("Going");
    } else {
      setStatus(null);
      const { error } = await supabase
        .from("event_status")
        .delete()
        .match({ event_id: eventId, user_id: userId });
      setStatus(null);
    }
    getEventStatus(eventId).then((statuses) => {
      setStatuses(statuses);
    });
  }

  return (
    <View className="flex-row justify-between gap-3 items-center p-3 bg-secondary-inv rounded-xl border border-secondary">
      <MaterialCommunityIcons
        name="calendar-check-outline"
        size={24}
        color={colorScheme === "dark" ? "black" : "white"}
      />

      <View className="text-sm flex-1 justify-start">
        {statuses?.length > 0 && statuses ? (
          <Text className="font-bold text-content-inv">
            {statuses?.length} going
          </Text>
        ) : (
          <Text className="font-bold text-content-inv">Nobody joined yet</Text>
        )}
        <View className="flex-1 flex-row justify-start line-clamp-1">
          {/** Map only the first 4 users */}
          {statuses?.slice(0, 4).map((status: any, index: number) => {
            //check if the user is the one who is logged in
            if (status.user_id === userId) {
              return (
                <Text key={index} className="text-content-inv opacity-75">
                  me{index !== statuses?.length - 1 && ", "}
                </Text>
              );
            }
            //otherwise list their username
            return (
              <Text key={index} className="text-content-inv opacity-75 ">
                {status.users.username}
                {index !== statuses?.length - 1 && ", "}
              </Text>
            );
          })}
        </View>
      </View>
      <Pressable
        className="flex flex-row items-center gap-2 bg-secondary px-3 py-2 rounded-lg border border-secondary"
        onPress={handleChange}
      >
        <MaterialCommunityIcons
          name={status ? "calendar-check" : "calendar-plus"}
          size={20}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="text-content">
          {status === "going" ? "Going" : "Join"}
        </Text>
      </Pressable>
    </View>
  );
}
