import { StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

type Product = {
  name: string;
  unitPrice: number;
  stock: number;
};

export default function ProductTable({data}:{data: Product[]}) {
  return (
    <ThemedView style={styles.table}>
      {/* Header */}
      <ThemedView style={[styles.row, styles.header]}>
        <ThemedText type="defaultSemiBold" style={[styles.cell, styles.name]}>
          Name
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.cell}>
          Unit Price
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.cell}>
          On Hand
        </ThemedText>
      </ThemedView>

      {/* Rows */}
      {data.map((item, i) => (
        <ThemedView key={i} style={styles.row}>
          <ThemedText style={[styles.cell, styles.name]}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.cell}>
            ₱{item.unitPrice}
          </ThemedText>
          <ThemedText style={styles.cell}>
            {item.stock}
          </ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    opacity: 0.9,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  name: {
    flex: 1.5,
  },
});
