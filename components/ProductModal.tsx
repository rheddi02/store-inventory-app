import { useEffect, useRef, useState } from "react";
import { Modal } from "react-native";

import { addProduct, updateProduct, updateProductStock } from "@/db";
import { ThemedButton } from "./themed-button";
import { ThemedInput } from "./themed-input";
import { ThemedSelect } from "./themed-select";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { UnitSelector } from "./unit-selector";

type Props = {
  visible: boolean;
  onClose: () => void;
  categories: any[];
  activeCategory: number;
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
  const [addStock, setAddStock] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const nameRef = useRef<any>(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setUnit(product.unit);
      setPrice(String(product.unitPrice));
      setStock(String(product.stock));
      setCategoryId(product.categoryId);
      setAddStock("");
    } else {
      setName("");
      setUnit("pc");
      setPrice("");
      setStock("");
      setAddStock("");
      setCategoryId(activeCategory ?? null);
    }
  }, [product, visible]);

  const save = async () => {
    if (!categoryId) return;

    if (product) {
      const totalStock = Number(stock) + (addStock ? Number(addStock) : 0);
      // Update product details
      await updateProduct(
        product.id,
        name,
        unit,
        Number(price),
        totalStock,
        categoryId,
      );

      // Track stock change if modified
      if (totalStock !== product.stock) {
        await updateProductStock(product.id, totalStock, "adjustment");
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

  useEffect(() => {
    if (!product && visible && nameRef.current) {
      const timer = setTimeout(() => {
        nameRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [visible]);

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
          <ThemedText style={{ marginBottom: 2 }} type="title">
            {product ? "Edit Product" : "Add Product"}
          </ThemedText>
          <ThemedText style={{ marginBottom: 8 }} type="description">
            {product
              ? "Modify the details of your product."
              : "Enter details for your new product."}
          </ThemedText>
          <ThemedText style={{ marginBottom: 2, marginTop: 10 }}>
            Name
          </ThemedText>
          <ThemedInput
            ref={nameRef}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <ThemedText style={{ marginBottom: 2, marginTop: 10 }}>
            Unit
          </ThemedText>
          <UnitSelector
            units={["pc", "ml", "L", "oz", "g"]}
            selectedUnit={unit}
            onSelect={setUnit}
          />
          {/* <ThemedSelect
            placeholder="Select Unit"
            selectedValue={unit}
            onValueChange={setUnit}
            items={["ml", "L", "oz", "g", "pc"].map((unit) => ({
              label: unit,
              value: unit,
            }))}
          /> */}
          <ThemedText style={{ marginBottom: 2, marginTop: 10 }}>
            Price
          </ThemedText>
          <ThemedInput
            placeholder="Unit Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          {product && (
            <>
              <ThemedText style={{ marginBottom: 2, marginTop: 10 }}>
                Current Stock
              </ThemedText>
              <ThemedInput
                readOnly
                placeholder="Unit Price"
                keyboardType="numeric"
                value={stock}
                onChangeText={setStock}
              />
            </>
          )}
          <ThemedText style={{ marginBottom: 2, marginTop: 10 }}>
            {product ? "Additional Stock" : "Quantity"}
          </ThemedText>
          {product ? (
            <ThemedInput
              placeholder="Additional Stock"
              keyboardType="numeric"
              value={addStock}
              onChangeText={setAddStock}
            />
          ) : (
            <ThemedInput
              placeholder="Stock"
              keyboardType="numeric"
              value={stock}
              onChangeText={setStock}
            />
          )}
          {product && (
            <UnitSelector
              units={Array.from({ length: 11 }, (_, i) => String(i - 5)).filter(
                (unit) => unit !== "0",
              )}
              selectedUnit={addStock}
              onSelect={setAddStock}
            />
          )}

          <ThemedText style={{ marginTop: 10 }}>Category</ThemedText>

          <ThemedSelect
            selectedValue={categoryId}
            onValueChange={setCategoryId}
            items={categories.map((c) => ({
              label: c.name,
              value: c.id,
            }))}
          />
          <ThemedButton
            title={product ? "Update Product" : "Add Product"}
            onPress={save}
          />

          <ThemedButton title="Cancel" variant="outline" onPress={onClose} />
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}
