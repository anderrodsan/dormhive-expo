import Auth from "@/components/auth/Auth";
import MarketHeader from "@/components/features/MarketHeader";
import ProductCard from "@/components/features/ProductCard";
import BadgeFilter from "@/components/shared/BadgeFilter";
import CreateButton from "@/components/shared/CreateButton";
import HeaderSearch from "@/components/shared/HeaderSearch";
import { getMyProducts, getProducts } from "@/db/queries";
import { AuthContext } from "@/provider/AuthProvider";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Pressable, RefreshControl } from "react-native";
import { ScrollView } from "react-native";
import { Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function MyProducts() {
  const { colorScheme } = useColorScheme();
  const [products, setProducts] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  //get user from context
  const auth = useContext(AuthContext);
  const user = auth.user || null;

  React.useEffect(() => {
    //set the products and filteredproducts
    getMyProducts(user.id).then((products) => {
      setProducts(products);
    });
  }, [user]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //set the products and filteredproducts
    getMyProducts(user.id).then((products) => {
      setProducts(products);
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
        <Text className="flex-1 font-bold text-xl text-content">
          My products
        </Text>
      </View>
      <ScrollView
        className="px-4 pb-10 mt-5"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Animated.View
          className="flex flex-row justify-between flex-wrap pb-10"
          entering={FadeInUp}
        >
          {products?.map((product: any, index: number) => {
            return (
              <View key={index} className={`w-1/2 px-1 pb-5`}>
                <ProductCard product={product} />
              </View>
            );
          })}
        </Animated.View>
      </ScrollView>
      {/** New Product */}
      <CreateButton icon="add" path={"(tabs)/menu"} />
    </View>
  );
}
