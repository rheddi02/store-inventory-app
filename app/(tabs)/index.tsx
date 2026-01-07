import { FloatingButton } from "@/components/floating-button";
import ProductList from "@/components/ProductList";
import { ProductModal } from "@/components/ProductModal";
import { CategoryTabs } from "@/components/tabs/categoryTabs";
import { ThemedView } from "@/components/themed-view";
import { getCategories } from "@/db";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [reloadTrigger, setReloadTrigger] = useState<number>(0);
  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    (async () => {
      await loadCategories();
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
          }}
        />
      </ThemedView>

      {/* Content */}
      <ThemedView style={styles.content}>
          <ProductList
            {...{
              categoryId: activeCategory,
              setModalVisible,
              setSelectedProduct,
              reloadTrigger,
            }}
          />
      </ThemedView>
      {/* Modal */}
      <ProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        categories={categories}
        activeCategory={activeCategory}
        product={selectedProduct}
        onSaved={() => setReloadTrigger((prev) => prev + 1)}
      />
      <FloatingButton {...{ setSelectedProduct, setModalVisible }} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
