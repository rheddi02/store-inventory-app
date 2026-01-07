import { useCallback, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { ProductRow } from "./ProductRow";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Product = {
  name: string;
  unitPrice: number;
  stock: number;
};

type Props = {
  data: Product[];
  setSelectedProduct: (product: any) => void;
  setModalVisible: (visible: boolean) => void;
};

export default function ProductList({ data, setSelectedProduct, setModalVisible }: Props) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={
        <ThemedView
          style={{
            flexDirection: "row",
            paddingVertical: 8,
            borderBottomWidth: 1,
          }}
        >
          <ThemedText style={{ flex: 2, fontWeight: "600" }}>Name</ThemedText>
          <ThemedText style={{ flex: 1, textAlign: "center" }}>
            Price
          </ThemedText>
          <ThemedText style={{ flex: 1, textAlign: "center" }}>
            Stock
          </ThemedText>
        </ThemedView>
      }
      renderItem={({ item }) => <ProductRow item={item} onPress={() => {
      setSelectedProduct(item);
      setModalVisible(true);
    }}/>}
    />
  );
}
