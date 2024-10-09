import EventItem from "@/components/features/EventItem";
import { getEvents, getEventsWithStatus } from "@/db/queries";
import React, { useContext } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import BadgeFilter from "@/components/shared/BadgeFilter";
import { AuthContext } from "@/provider/AuthProvider";
import EventHeader from "@/components/features/EventHeader";
import AnimatedItem from "@/components/animations/AnimatedItem";

export default function Events() {
  const [events, setEvents] = React.useState([]);
  const [filteredEvents, setFilteredEvents] = React.useState([]);
  const [status, setStatus] = React.useState("all");
  const [refreshing, setRefreshing] = React.useState(false);

  const user = useContext(AuthContext).user;

  React.useEffect(() => {
    //set the events and filteredevents
    getEventsWithStatus(user.id).then((events) => {
      setEvents(events);
      //set filtered events based on the status
      if (status === "all") {
        setFilteredEvents(events);
      } else {
        const filtered = events?.filter(
          (event: any) => event.status === status
        );
        setFilteredEvents(filtered);
      }
    });
  }, [status]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //set the events and filteredevents
    getEventsWithStatus(user.id).then((events) => {
      setEvents(events);
      setFilteredEvents(events);
    });
    setRefreshing(false);
  }, []);

  //options for filter
  const options: any = [
    {
      label: "All",
      value: "all",
      icon: null,
      count: events.length,
    },
    {
      label: "Going",
      value: "going",
      icon: "check",
      count: getStatusCount(events, "going"),
    },
    {
      label: "Interested",
      value: "interested",
      icon: "heart-outline",
      count: getStatusCount(events, "interested"),
    },
  ];

  function getStatusCount(events: any, status: string) {
    const filtered = events?.filter((event: any) => event?.status === status);
    return filtered.length;
  }

  return (
    <View className="relative flex-1 bg-background">
      <EventHeader
        title="Events"
        setData={setFilteredEvents}
        filteredData={filteredEvents}
        data={events}
      />
      {/** Search Input 
      <View className="w-full px-5 mt-5">
        <TextInput
          placeholder="Search"
          className="w-full py-2 px-3 bg-secondary rounded-xl"
        />
      </View>
      */}

      <BadgeFilter options={options} status={status} setStatus={setStatus} />
      <ScrollView
        className="px-5 pb-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredEvents.map((event: any, index: number) => (
          <AnimatedItem
            delay={index * 50}
            key={index}
            className={`w-full pb-5`}
          >
            <EventItem event={event} />
          </AnimatedItem>
        ))}
        <View className="h-10" />
      </ScrollView>
      {/** Create Event 
      <CreateButton icon="add" path={"(modals)/new-event"} />
      */}
    </View>
  );
}
