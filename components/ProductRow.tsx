import { Colors } from "@/constants/theme";
import { useProduct } from "@/context/ProductContext";
import { updateProductQuantity, updateProductStock } from "@/db";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Product } from "@/utils/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Pressable } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { UnitSelector } from "./unit-selector";

export function ProductRow({
  product,
  onEdit,
  onDelete,
  onView,
  onLongPress,
}: {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onView: (product: Product) => void;
  onLongPress: (product: Product) => void;
}) {
  const { showActionSheetWithOptions } = useActionSheet();
  const theme = useColorScheme() ?? "light";
  const {
    isQuickEdit,
    selectedProduct,
    setIsQuickEdit,
    setSelectedProduct,
    setReloadTrigger,
    reloadTrigger,
  } = useProduct();

  const onQuickEdit = () => {
    setSelectedProduct(product);
    setIsQuickEdit(!isQuickEdit);
  };

  const quickUpdate = async (stock: string) => {
    if (!selectedProduct) return;
    const totalStock =
      Number(selectedProduct.stock) + (stock ? Number(stock) : 0);
    await updateProductQuantity(totalStock);
    if (totalStock !== selectedProduct.stock) {
      await updateProductStock(selectedProduct.id, totalStock, "adjustment");
    }
    setReloadTrigger(reloadTrigger + 1);
    setSelectedProduct(null);
    setIsQuickEdit(false);
  };

  const onPress = () => {
    const options = ["View", "Edit", "Delete", "Cancel"];
    const cancelButtonIndex = 3;
    const destructiveButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (index) => {
        if (index === 0) onView(product);
        if (index === 1) onEdit(product);
        if (index === 2) onDelete(product);
      },
    );
  };

  return (
    <Pressable onPress={onQuickEdit} onLongPress={onPress}>
      <ThemedView
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          borderTopWidth: 1,
          borderTopColor: Colors[theme].tint,
        }}
      >
        <ThemedText style={{ flex: 2 }}>{product.name}</ThemedText>
        <ThemedText style={{ flex: 1, textAlign: "center" }}>
          {product.stock} {product.unit}
        </ThemedText>
      </ThemedView>
      {isQuickEdit && selectedProduct?.id === product.id && (
        <UnitSelector
          units={Array.from({ length: 7 }, (_, i) => String(i - 3)).filter(
            (unit) => unit !== "0",
          )}
          onSelect={quickUpdate}
        />
      )}
    </Pressable>
  );
}
