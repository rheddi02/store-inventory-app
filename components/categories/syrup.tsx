import { ThemedView } from "@/components/themed-view";
import ProductList from "../ProductList";

type Props = {
  reloadTrigger: number
  categoryId: number
  setSelectedProduct: (product: any) => void;
  setModalVisible: (visible: boolean) => void;
};
export default function SyrupCategory({ reloadTrigger, categoryId, setSelectedProduct, setModalVisible }: Props) {

  return (
    <ThemedView>
      <ProductList {...{ reloadTrigger, categoryId, setSelectedProduct, setModalVisible }} />
    </ThemedView>
  );
}
