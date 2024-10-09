import { getGroups } from "@/db/queries";
import React from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import HeaderSearch from "@/components/shared/HeaderSearch";
import GroupCard from "@/components/features/GroupCard";
import AnimatedItem from "@/components/animations/AnimatedItem";

export default function Events() {
  const [groups, setGroups] = React.useState([]);
  const [filteredGroups, setFilteredGroups] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    //set the groups and filteredgroups
    getGroups().then((groups) => {
      setGroups(groups);
      setFilteredGroups(groups);
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //set the groups and filteredgroups
    getGroups().then((groups) => {
      setGroups(groups);
      setFilteredGroups(groups);
    });
    setRefreshing(false);
  }, []);

  return (
    <View className="relative flex-1 bg-background">
      <HeaderSearch
        title="Chats"
        setData={setFilteredGroups}
        filteredData={filteredGroups}
        data={groups}
      />

      <ScrollView
        className="px-5 pt-3 pb-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredGroups.map((group: any, index: number) => (
          <AnimatedItem
            delay={index * 50}
            key={index}
            className={`w-full py-2`}
          >
            <GroupCard group={group} />
          </AnimatedItem>
        ))}
      </ScrollView>
    </View>
  );
}
