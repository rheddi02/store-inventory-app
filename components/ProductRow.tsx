import { Colors } from "@/constants/theme";
import { useProduct } from "@/context/ProductContext";
import { updateProductQuantity, updateProductStock } from "@/db";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Product } from "@/utils/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useEffect, useRef } from "react";
import { FlatList, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { UnitSelector } from "./unit-selector";
import Swipeable, { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";

export function ProductRow({
  product,
  index,
  flatListRef,
  onEdit,
  onDelete,
  onView,
  onLongPress,
  onRowOpen
}: {
  product: Product;
  index: number;
  flatListRef: React.RefObject<FlatList<Product> | null>;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onView: (product: Product) => void;
  onLongPress: (product: Product) => void;
  onRowOpen: (row: SwipeableMethods | null) => void
}) {
  const swipeRef = useRef<SwipeableMethods | null>(null)
  const { showActionSheetWithOptions } = useActionSheet();
  const theme = useColorScheme() ?? "light";
  const {
    isQuickEdit,
    selectedProduct,
    handleSelectedProduct,
    handleQuickProductUpdate,
  } = useProduct();

  const handleProductQuantity = async (stock: string) => {
    if (!selectedProduct) return;
    const totalStock =
      Number(selectedProduct.stock) + (stock ? Number(stock) : 0);
    await updateProductQuantity(totalStock);
    if (totalStock !== selectedProduct.stock) {
      await updateProductStock(selectedProduct.id, totalStock, "adjustment");
    }
    handleQuickProductUpdate(product.id, totalStock);
    handleSelectedProduct(null);
  };

  const handleEdit = () => {
    swipeRef.current?.close()    // close any open row first
    onEdit(product)         // then run edit logic
  }

  const handleDelete = () => {
    swipeRef.current?.close()     // close row before delete
    onDelete(product)
  }

  useEffect(() => {
    // Scroll to this item when UnitSelector appears
    if (
      isQuickEdit &&
      selectedProduct?.id === product.id &&
      flatListRef.current
    ) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5, // Center the item in the viewport
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isQuickEdit, selectedProduct?.id, product.id, index, flatListRef]);

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

  const renderRightActions = () => (
    <ThemedView style={styles.actions}>
      <TouchableOpacity
        style={[styles.button, styles.edit]}
        onPress={handleEdit}
      >
        <ThemedText style={styles.text}>Edit</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.delete]}
        onPress={handleDelete}
      >
        <ThemedText style={styles.text}>Delete</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  const handleOpenRow = () => {
    onRowOpen(swipeRef.current)
  }

  return (
    <Swipeable
      ref={swipeRef}
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={handleOpenRow}
    >
    <Pressable
      onPress={() => handleSelectedProduct(product)}
      onLongPress={onPress}
    >
      <ThemedView
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          borderTopWidth: 1,
          borderTopColor: Colors[theme].tinted,
        }}
      >
        <ThemedText
          style={[
            product?.id === selectedProduct?.id && { fontWeight: 900 },
            product?.id !== selectedProduct?.id &&
              !!selectedProduct?.id && { color: "gray" },
            { flex: 2 },
          ]}
        >
          {product.name}
        </ThemedText>
        <ThemedText style={{ flex: 1, textAlign: "center" }}>
          {product.stock} {product.unit}
        </ThemedText>
      </ThemedView>
      {isQuickEdit && selectedProduct?.id === product.id && (
        <Pressable onPress={() => {}}>
          <UnitSelector
            units={Array.from({ length: 21 }, (_, i) => String(i - 10)).filter(
              (unit) => unit !== "0",
            )}
            onSelect={handleProductQuantity}
          />
        </Pressable>
      )}
    </Pressable>
    </Swipeable>
  );
}
const styles = StyleSheet.create({
  row: {
    backgroundColor: "white",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  actions: {
    flexDirection: "row",
  },
  button: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  edit: {
    backgroundColor: "#f39c12",
  },
  delete: {
    backgroundColor: "#e74c3c",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});