import { useCallback, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

type Product = {
  name: string;
  unitPrice: number;
  stock: number;
};

export default function ProductList({ data }: { data: Product[] }) {
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
        <ThemedView style={{ flexDirection: 'row', padding: 12 }}>
          <ThemedText style={{ flex: 1.5, fontWeight: '600' }}>Name</ThemedText>
          <ThemedText style={{ flex: 1, fontWeight: '600' }}>Unit Price</ThemedText>
          <ThemedText style={{ flex: 1, fontWeight: '600' }}>On Hand</ThemedText>
        </ThemedView>
      }
      renderItem={({ item }) => (
        <ThemedView style={{ flexDirection: 'row', padding: 12 }}>
          <ThemedText style={{ flex: 1.5 }}>{item.name}</ThemedText>
          <ThemedText style={{ flex: 1 }}>₱{item.unitPrice}</ThemedText>
          <ThemedText style={{ flex: 1 }}>{item.stock}</ThemedText>
        </ThemedView>
      )}
    />
  );
}
