import { getProducts } from "@/db";
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { ProductRow } from "./ProductRow";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Props = {
  categoryId: number;
  reloadTrigger: number;
  setSelectedProduct: (product: any) => void;
  setModalVisible: (visible: boolean) => void;
};

export default function ProductList({
  categoryId,
  setSelectedProduct,
  setModalVisible,
  reloadTrigger,
}: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const loadData = async () => {
    const prods = await getProducts(categoryId);
    setProducts(prods);
  };
  const onEdit = (product: any) => {
    setSelectedProduct(product);
    setModalVisible(true);
  }
  const onView = (product: any) => {
    setSelectedProduct(product);
    // TODO: Implement view modal
    router.push(`/products/${product.id}`);
  }
  const onDelete = (product: any) => {
    setSelectedProduct(product);
    // TODO: Implement delete logic
  }
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    (async () => {
      setRefreshing(true);
      await loadData();
      setRefreshing(false);
    })();
  }, [categoryId, reloadTrigger]);

  return (
    <FlatList
      data={products}
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
            Stock
          </ThemedText>
        </ThemedView>
      }
      renderItem={({ item }) => (
        <ProductRow
          product={item}
          onView={()=>onView(item)}
          onEdit={()=>onEdit(item)}
          onDelete={()=>{}}
        />
      )}
    />
  );
}
