"use client";
import { useEffect } from "react";
import { useAppStore } from "@/store/store";

export const useCategories = () => {
  const categories = useAppStore((state) => state.categories);
  const isLoadingCategories = useAppStore((state) => state.isLoadingCategories);
  const error = useAppStore((state) => state.error);
  const fetchCategories = useAppStore((state) => state.fetchCategories);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoadingCategories,
    error,
    fetchCategories,
  };
};

export default useCategories;
