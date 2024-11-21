import ProductListItem from "@/components/ProductListItem";
import { useGetAllProducts } from "@/queries";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useGetAllProducts();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{
          gap: 10,
          padding: 10,
        }}
        columnWrapperStyle={{
          gap: 10,
        }}
      />
    </View>
  );
}
