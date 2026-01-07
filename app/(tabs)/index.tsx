import MilkCategory from "@/components/categories/milk";
import SyrupCategory from "@/components/categories/syrup";
import { ProductModal } from "@/components/ProductModal";
import { CategoryTabs } from "@/components/tabs/categoryTabs";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getCategories, getProducts } from "@/db";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };
  const loadData = async (categoryId?: number | null) => {
    const products = await getProducts(categoryId || activeCategory);
    setProducts(products);
  };
  useEffect(() => {
    (async () => {
      await loadCategories();
      await loadData();
    })();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {/* Category Tabs */}
      <ThemedView style={styles.tabs}>
        <CategoryTabs
          categories={categories}
          activeId={activeCategory}
          onSelect={async (id) => {
            setActiveCategory(id);
            await loadData(id);
          }}
        />
      </ThemedView>

      {/* Content */}
      <ThemedView style={styles.content}>
        {activeCategory === 1 && (
          <SyrupCategory
            {...{ data: products, setModalVisible, setSelectedProduct }}
          />
        )}
        {activeCategory === 2 && <MilkCategory />}
      </ThemedView>
      {/* Modal */}
      <ProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        categories={categories}
        product={selectedProduct}
        onSaved={() => loadData(activeCategory)}
      />
      <Pressable
        onPress={() => {
          setSelectedProduct(null);
          setModalVisible(true);
        }}
        >
          <ThemedText>➕ Add</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#007AFF",
  },
  tabText: {
    color: "#777",
  },
  activeText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
});
