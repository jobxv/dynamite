"use client";
import { useEffect } from "react";
import { useAppStore } from "@/store/store";

const useProducts = () => {
  const products = useAppStore((state) => state.products);
  const isLoadingProducts = useAppStore((state) => state.isLoadingProducts);
  const error = useAppStore((state) => state.error);
  const fetchProducts = useAppStore((state) => state.fetchProducts);

  useEffect(() => {
    if (!isLoadingProducts) fetchProducts();
  }, []);

  return {
    products,
    isLoadingProducts,
    error,
  };
};

export default useProducts;
