import { ThemedView } from "@/components/themed-view";
import ProductList from "../ProductList";

type Props = {
  categoryId: number;
  setModalVisible: (visible: boolean) => void;
};
export default function SyrupCategory({
  categoryId,
  setModalVisible,
}: Props) {
  return (
    <ThemedView>
      <ProductList {...{ categoryId, setModalVisible }} />
    </ThemedView>
  );
}
