import { ThemedView } from "@/components/themed-view";
import ProductList from "../ProductList";

type Props = {
  data: any[];
  setSelectedProduct: (product: any) => void;
  setModalVisible: (visible: boolean) => void;
};
export default function SyrupCategory({data, setSelectedProduct,setModalVisible}: Props) {

  return (
    <ThemedView>
      <ProductList {...{data, setSelectedProduct, setModalVisible}} />
    </ThemedView>
  );
}
