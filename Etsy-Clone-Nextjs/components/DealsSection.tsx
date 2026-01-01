"use client";
import React, { useRef, useEffect, useState } from "react";
import DetailCard from "./DetailCard";
import ScrollButtons from "./ScrollButtons";
import { Product } from "@/data/types";
import { getDiscountedProducts } from "@/app/api";
const DealsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [disableLeft, setDisableLeft] = useState(true);
  const [disableRight, setDisableRight] = useState(false);
  const [prodcts, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchDiscProducts = async () => {
      const response = await getDiscountedProducts();
      setProducts(response.data);
      setIsLoading(false);
    };
    fetchDiscProducts();
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 500;
      updateButtonState();
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 500;
      updateButtonState();
    }
  };

  const updateButtonState = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setDisableLeft(scrollLeft === 0);
      setDisableRight(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (container) {
      container.addEventListener("scroll", updateButtonState);
      updateButtonState();

      return () => {
        container.removeEventListener("scroll", updateButtonState);
      };
    }
  }, []);

  return (
    <div className="hidden md:block">
      <div className="flex justify-between items-center mb-4 ">
        <h3 className="text-2xl font-medium">Today&apos;s big deals</h3>
        <ScrollButtons
          className="gap-2 flex"
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
          disableLeft={disableLeft}
          disableRight={disableRight}
        />
      </div>
      <div
        ref={containerRef}
        className="flex gap-5 overflow-x-auto scroll-smooth p-2"
        style={{ scrollbarWidth: "none" }}
      >
        {prodcts?.map((item, index) => (
          <DetailCard rating={0} tagline="" key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DealsSection;
