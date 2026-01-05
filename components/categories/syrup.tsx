import { ThemedView } from "@/components/themed-view";
import ProductList from "../ProductList";

export default function SyrupCategory() {
  const data = [
    { name: "Green Apple", unitPrice: 150, stock: 9 },
    { name: "Blueberry", unitPrice: 150, stock: 3 },
    { name: "Strawberry", unitPrice: 150, stock: 11 },
    { name: "Blue Lemonade", unitPrice: 150, stock: 3 },
    { name: "Lychee", unitPrice: 150, stock: 3 },
  ];

  return (
    <ThemedView>
      <ProductList data={data} />
    </ThemedView>
  );
}
