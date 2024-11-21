import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { useGetUserOrders } from "@/queries";

import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function MenuScreen() {
  const { data: orders, isLoading, error } = useGetUserOrders();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{
          gap: 10,
          padding: 10,
        }}
      />
    </View>
  );
}
