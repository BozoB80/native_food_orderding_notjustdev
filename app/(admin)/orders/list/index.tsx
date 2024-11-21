import OrderListItem from "@/components/OrderListItem";
import { supabase } from "@/lib/supabase";
import { useGetAllOrdersAdmins } from "@/queries";
import { useEffect } from "react";

import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function MenuScreen() {
  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useGetAllOrdersAdmins({ archived: false });

  useEffect(() => {
    const orders = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          console.log("Change received!", payload);
          refetch();
        }
      )
      .subscribe();
    return () => {
      orders.unsubscribe();
    };
  }, []);

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
