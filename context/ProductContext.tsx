import { Product } from "@/utils/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

type ProductContextType = {
  isQuickEdit: boolean;
  setIsQuickEdit: (edit: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  handleSelectedProduct: (
    product: ProductContextType["selectedProduct"],
  ) => void;
  setReloadTrigger: (i: ProductContextType["reloadTrigger"]) => void;
  reloadTrigger: number;
  products: Product[];
  setProducts: (products: ProductContextType["products"]) => void;
  handleQuickProductUpdate: (id: number, stock: number) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickEdit, setIsQuickEdit] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);

  const handleSelectedProduct = (product: Product | null) => {
    if (product?.id === selectedProduct?.id || !product) {
      setIsQuickEdit(false);
      setSelectedProduct(null);
      return;
    }
    setSelectedProduct(product);
    setIsQuickEdit(true);
  };

  const handleQuickProductUpdate = (id: number, stock: number) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id)
        return {
          ...product,
          stock,
        };
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        isQuickEdit,
        setIsQuickEdit,
        selectedProduct,
        setSelectedProduct,
        setReloadTrigger,
        reloadTrigger,
        handleSelectedProduct,
        setProducts,
        products,
        handleQuickProductUpdate,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
