"use client";
import React from "react";
import CategoriesCard from "./CategoriesCard";
import useCategories from "@/hooks/useCategories";
import { shuffleArray } from "@/store/store";

const CategoriesSection = () => {
  const { categories: cats } = useCategories();
  const categories = shuffleArray(cats);
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-2xl font-medium">Shop our most popular categories</h4>
      <div className="md:flex gap-6 grid grid-cols-3">
        {categories.map((item, index) => (
          <CategoriesCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
