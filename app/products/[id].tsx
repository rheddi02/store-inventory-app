import { ProductHistoryRow } from "@/components/ProductHistoryRow";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getProductById, getStockHistory } from "@/db";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

type Product = {
  id: number;
  name: string;
  unit: string;
  unitPrice: number;
  stock: number;
  categoryId: number;
};

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Number(id);
  const [refreshing, setRefreshing] = useState(false);

  const [product, setProduct] = useState<Product | null>(null);
  const [productHistory, setProductHistory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProduct = async () => {
    try {
      const data = await getProductById(productId);
      const history = await getStockHistory(productId);
      setProductHistory(history);
      setProduct(data);
    } finally {
      setLoading(false);
    }
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProduct();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (!productId) return;
    loadProduct();
  }, [productId]);

  return (
    <>
      <Stack.Screen
        options={{
          title: product?.name ?? "Product Details",
        }}
      />
      <ThemedView style={{ flex: 1, padding: 16, gap: 10 }}>
        {loading ? (
          <ActivityIndicator />
        ) : !product ? (
          <ThemedText>Product not found</ThemedText>
        ) : (
          <>
            <View style={{ flexDirection: "row", gap: 16, marginBottom: 24 }}>
              <ThemedView style={styles.card}>
                <ThemedText type="description">Unit</ThemedText>
                <ThemedText type="title">{product.unit}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.card}>
                <ThemedText type="description">Price</ThemedText>
                <ThemedText type="title">{product.unitPrice}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.card}>
                <ThemedText type="description">Stock</ThemedText>
                <ThemedText type="title">{product.stock}</ThemedText>
              </ThemedView>
            </View>
            <View>
              <ThemedText>Product History:</ThemedText>
              <FlatList
                data={productHistory}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                ListHeaderComponent={
                  <ThemedView
                    style={{
                      flexDirection: "row",
                      paddingVertical: 8,
                      borderBottomWidth: 1,
                    }}
                  >
                    <ThemedText style={{ flex: 1, fontWeight: "600" }}>
                      Date
                    </ThemedText>
                    <ThemedText style={{ flex: 1, textAlign: "center" }}>
                      Old Stock
                    </ThemedText>
                    <ThemedText style={{ flex: 1, textAlign: "center" }}>
                      Change
                    </ThemedText>
                    <ThemedText style={{ flex: 1, textAlign: "center" }}>
                      New Stock
                    </ThemedText>
                    <ThemedText style={{ flex: 1, textAlign: "center" }}>
                      Reason
                    </ThemedText>
                  </ThemedView>
                }
                renderItem={({ item }) => (
                  <ProductHistoryRow productHistory={item} />
                )}
              />
            </View>
          </>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    flex: 1,
  },
});
