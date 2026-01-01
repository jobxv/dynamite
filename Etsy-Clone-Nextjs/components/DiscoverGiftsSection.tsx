"use client";
import React from "react";
import CircularItem from "@/components/ui/CircularCard";
import useProducts from "@/hooks/useProducts";

const DiscoverGiftsSection = () => {
  const { products, error } = useProducts();
  return !error && products.length > 0 ? (
    <div className="flex flex-col items-center justify-center gap-3 w-full overflow-x-hidden">
      <h3 className="text-3xl font-medium">
        Discover gifts for every occasion
      </h3>
      <div
        className="flex gap-10 overflow-x-auto w-full sm:justify-center py-5"
        style={{ scrollbarWidth: "none" }}
      >
        {products.slice(0, 6).map((item, index) => (
          <CircularItem key={index} {...item} />
        ))}
      </div>
    </div>
  ) : (
    ""
  );
};

export default DiscoverGiftsSection;
