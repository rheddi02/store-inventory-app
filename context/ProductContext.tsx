import { Product } from "@/utils/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

type ProductContextType = {
  isQuickEdit: boolean;
  setIsQuickEdit: (edit: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  setReloadTrigger: (i: ProductContextType['reloadTrigger']) => void
  reloadTrigger: number
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickEdit, setIsQuickEdit] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState<number>(0);

  return (
    <ProductContext.Provider
      value={{
        isQuickEdit,
        setIsQuickEdit,
        selectedProduct,
        setSelectedProduct,
        setReloadTrigger,
        reloadTrigger
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
