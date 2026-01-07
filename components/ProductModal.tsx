import { useEffect, useState } from "react";
import { Modal } from "react-native";

import { addProduct, updateProduct, updateProductStock } from "@/db";
import { ThemedButton } from "./themed-button";
import { ThemedInput } from "./themed-input";
import { ThemedSelect } from "./themed-select";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Props = {
  visible: boolean;
  onClose: () => void;
  categories: any[];
  activeCategory: number
  product?: any;
  onSaved: () => void;
};

export function ProductModal({
  visible,
  onClose,
  categories,
  activeCategory,
  product,
  onSaved,
}: Props) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setUnit(product.unit);
      setPrice(String(product.unitPrice));
      setStock(String(product.stock));
      setCategoryId(product.categoryId);
    } else {
      setName("");
      setUnit("L");
      setPrice("");
      setStock("");
      setCategoryId(activeCategory ?? null);
    }
  }, [product, visible]);

  const save = async () => {
    if (!categoryId) return;

    if (product) {
      // Update product details
      await updateProduct(
        product.id,
        name,
        unit,
        Number(price),
        Number(stock),
        categoryId
      );

      // Track stock change if modified
      if (Number(stock) !== product.stock) {
        await updateProductStock(product.id, Number(stock), "adjustment");
      }
    } else {
      // NEW PRODUCT
      await addProduct(name, unit, Number(price), Number(stock), categoryId);
    }

    onSaved();
    onClose();
  };
  
  useEffect(() => {
  if (visible) {
    setCategoryId(product?.categoryId ?? activeCategory ?? null);
  }
}, [visible, product, activeCategory]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 16,
        }}
      >
        <ThemedView
          style={{
            padding: 16,
            borderRadius: 12,
          }}
        >
          <ThemedText type="title">
            {product ? "Edit Product" : "Add Product"}
          </ThemedText>

          <ThemedInput placeholder="Name" value={name} onChangeText={setName} />
          {/* <ThemedInput
            placeholder="Unit (ml, L, oz, g)"
            value={unit}
            onChangeText={setUnit}
          /> */}
          <ThemedSelect
            placeholder="Select Unit"
            selectedValue={unit}
            onValueChange={setUnit}
            items={["ml", "L", "oz", "g", "pc"].map((unit) => ({
              label: unit,
              value: unit,
            }))}
          />
          <ThemedInput
            placeholder="Unit Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <ThemedInput
            placeholder="Stock"
            keyboardType="numeric"
            value={stock}
            onChangeText={setStock}
          />

          <ThemedText style={{ marginTop: 10 }}>Category</ThemedText>

          <ThemedSelect
            selectedValue={categoryId}
            onValueChange={setCategoryId}
            items={categories.map((c) => ({
              label: c.name,
              value: c.id,
            }))}
          />
          <ThemedButton title="Save Product" onPress={save} />

          <ThemedButton title="Cancel" variant="outline" onPress={onClose} />
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}
