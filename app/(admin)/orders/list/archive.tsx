import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";

import { FlatList, View } from "react-native";

export default function ArchiveScreen() {
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
