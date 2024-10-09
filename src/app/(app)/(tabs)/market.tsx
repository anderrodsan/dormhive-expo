import AnimatedItem from "@/components/animations/AnimatedItem";
import Auth from "@/components/auth/Auth";
import MarketHeader from "@/components/features/MarketHeader";
import ProductCard from "@/components/features/ProductCard";
import BadgeFilter from "@/components/shared/BadgeFilter";
import CreateButton from "@/components/shared/CreateButton";
import HeaderSearch from "@/components/shared/HeaderSearch";
import { getProducts } from "@/db/queries";
import { getCategoryCount } from "@/lib/utils";
import { AuthContext } from "@/provider/AuthProvider";
import React, { useContext } from "react";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native";
import { Text, View } from "react-native";
import Animated, {
  FadeInDown,
  ZoomInDown,
  ZoomInUp,
} from "react-native-reanimated";

export default function Marketplace() {
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [status, setStatus] = React.useState("all");

  //get user from context
  const auth = useContext(AuthContext);
  const user = auth.user || null;

  React.useEffect(() => {
    //set the products and filteredproducts
    onRefresh();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //set the products and filteredproducts
    getProducts().then((products) => {
      setProducts(products);
      //filter out the ones from the user
      const filtered = products.filter(
        (product: any) => product.creator_id === user?.id
      );
      setFilteredProducts(products);
    });
    setRefreshing(false);
  }, []);

  React.useEffect(() => {
    //filter the product based on the options

    if (status === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product: any) => product.category === status
      );
      //console.log(filtered);
      setFilteredProducts(filtered);
    }
  }, [status]);

  //options for filter
  const options = [
    { label: "All", value: "all", icon: "", count: products.length },
    {
      label: "Clothing",
      value: "clothing",
      icon: "tshirt-v-outline",
      count: getCategoryCount(products, "clothing"),
    },
    {
      label: "Furniture",
      value: "furniture",
      icon: "sofa-single-outline",
      count: getCategoryCount(products, "furniture"),
    },
    {
      label: "Electronics",
      value: "electronics",
      icon: "power-plug-outline",
      count: getCategoryCount(products, "electronics"),
    },
    {
      label: "Accessories",
      value: "accessories",
      icon: "glasses",
      count: getCategoryCount(products, "accessories"),
    },
    {
      label: "Food",
      value: "food",
      icon: "food-apple-outline",
      count: getCategoryCount(products, "food"),
    },
    {
      label: "Art",
      value: "art",
      icon: "palette-outline",
      count: getCategoryCount(products, "art"),
    },
    {
      label: "Others",
      value: "",
      icon: "crosshairs-question",
      count: getCategoryCount(products, ""),
    },
  ];

  return (
    <View className="relative flex-1 bg-background">
      <MarketHeader
        title="Marketplace"
        data={products}
        setData={setFilteredProducts}
        filteredData={filteredProducts}
      />
      <BadgeFilter
        options={options}
        status={status}
        setStatus={setStatus}
        onlyCount
      />
      <ScrollView
        className="px-4 pb-10"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex flex-row justify-between flex-wrap pb-10">
          {filteredProducts.map((product: any, index: number) => {
            if (product.creator_id === user.id) {
              return null;
            }
            return (
              <AnimatedItem
                delay={index * 50}
                key={index}
                className={`w-1/2 px-1 pb-5`}
              >
                <ProductCard product={product} />
              </AnimatedItem>
            );
          })}
        </View>
      </ScrollView>
      {/** New Product 
      <CreateButton icon="add" path={"(tabs)/menu"} />
      */}
    </View>
  );
}
