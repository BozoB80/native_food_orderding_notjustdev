import OrderListItem from "@/components/OrderListItem";
import { useGetAllOrdersAdmins, useSubscriptionOrders } from "@/queries";

import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function MenuScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useGetAllOrdersAdmins({ archived: false });

  // Real time data: get the order immediately when it is created
  useSubscriptionOrders();

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
