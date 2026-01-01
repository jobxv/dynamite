"use client";
import React from "react";
import RectangleCard from "./RectangleCard";
import useProducts from "@/hooks/useProducts";

const PicksSection = () => {
  const { products, error } = useProducts();
  return (
    <div className="flex flex-col gap-5 lg:max-w">
      <h1 className="text-2xl font-medium">Picks inspired by your shopping</h1>

      <div className="md:flex gap-4.5 grid grid-cols-3 overflow-auto">
        {products.slice(0, 5).map((item, index) => (
          <RectangleCard key={index} {...item} hideVideo />
        ))}
      </div>
    </div>
  );
};

export default PicksSection;
