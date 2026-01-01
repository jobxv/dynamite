"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import ButtonLink from "@/components/ui/ButtonLink";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";
import ProductCard from "@/components/ProductCard";
import { getCategoriyById, getProductsByCategory } from "@/app/api";
import useCategories from "@/hooks/useCategories";
import { Category, Product } from "@/data/types";
import { getImageUrl } from "@/utils/image";

export default function Page() {
  const [activePage, setActivePage] = useState(1);
  const params = useParams();
  const categoryId = params.id as string;
  const [showAll, setShowAll] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState<Category>();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchCatProducts = async () => {
      const result = await getCategoriyById(Number(categoryId));
      if (result.success) {
        console.log("Category with id " + categoryId, result.data);
        result.data && setCategoryInfo(result.data[0]);
      } else {
        console.log("Category not found");
      }
    };
    fetchCatProducts();
  }, []);
  useEffect(() => {
    const fetchCatProducts = async () => {
      const result = await getProductsByCategory(Number(categoryId));
      if (result.success) {
        setProducts(result.data);
      }
    };
    fetchCatProducts();
  }, []);

  const initialDisplayCount = 6;

  const { categories } = useCategories();

  const hiddenCount = categories.length - initialDisplayCount;
  const sortOptions = ["newest", "price-low-to-high", "price-high-to-low"];
  const [sortOption, setSortOption] = useState("newest");
  const onSelect = (option: string) => {
    setSortOption(option);
  };

  return (
    <div className={` max-w`}>
      <div className="flex mx-auto sm:px-4 py-8 flex-col w-fit justify-center max-w-[1104px]">
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-light mb-2 font-g`}>
            {categoryInfo?.name}
          </h1>
          <p className="text-gray-600 text-sm">
            {categoryInfo?.name || "category name"}
          </p>
        </div>

        <div className="sm:flex grid grid-cols-2 grid-rows-3 flex-wrap sm:gap-8 gap-4 justify-items-center sm:justify-between">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/c/${category.id}`}
              className={clsx(
                "flex flex-col items-center group w-fit",
                "transition-all duration-500 ease-out",
                {
                  "opacity-0 translate-y-2 pointer-events-none max-h-0":
                    !showAll && index >= initialDisplayCount,
                  "opacity-100 translate-y-0":
                    showAll || index < initialDisplayCount,
                }
              )}
            >
              <div className="rounded-lg overflow-hidden mb-2 ">
                <Image
                  src={getImageUrl(category.image) || "/placeholder.svg"}
                  alt={category.name}
                  height={210}
                  width={140}
                  className="object-cover group-hover:scale-105 h-[210px] w-[140px] transition-transform duration-300"
                />
              </div>
              <span className="text-sm text-center">{category.name}</span>
            </Link>
          ))}
        </div>

        {categories.length > initialDisplayCount && (
          <div className="flex justify-center">
            <ButtonLink
              onClick={() => setShowAll((f) => !f)}
              btnClassName="text-black"
              className="bg-gray-200 hover:bg-gray-300 transition-background-color duration-200 hover:shadow-full"
            >
              {showAll ? "Show less" : "Show more"}{" "}
              {!showAll && hiddenCount > 0 ? ` (${hiddenCount})` : ""}
            </ButtonLink>
          </div>
        )}
      </div>

      {products.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-end">
            <div className="relative mt-1 flex">
              <Dropdown
                buttonContent={"Sort By"}
                options={sortOptions}
                selectedOption={sortOption}
                onSelect={onSelect}
              ></Dropdown>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
      <div className="flex w-full flex-col gap-2 mt-10">
        <p>There&apos;s so much more for you to discover</p>
        <div className="flex items-center gap-2">
          <button
            className="size-9 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100"
            onClick={() => setActivePage(Math.max(1, activePage - 1))}
            disabled={activePage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`size-9 rounded-full focus-blue text-xsm flex items-center justify-center ${
                activePage === page
                  ? "border-2"
                  : "bg-gray-100 hover:bg-gray-100"
              }`}
              onClick={() => setActivePage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="size-9 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100"
            onClick={() => setActivePage(Math.min(5, activePage + 1))}
            disabled={activePage === 5}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-2xl font-medium">Shop by Interest</h3>
        <p className="text-sm text-gray-600">{categoryInfo?.name}</p>
        {(() => {
          const data = [
            {
              image: "/hat.jpg",
              title: "Minimalist",
            },
            {
              image: "/hat.jpg",
              title: "Minimalist",
            },
            {
              image: "/hat.jpg",
              title: "Minimalist",
            },
          ];
          return (
            <div className="flex gap-4 flex-wrap justify-center">
              {data.map((d, i) => (
                <Link
                  key={i}
                  href={"#"}
                  className="flex flex-col border-gray-300 border rounded-lg hover:shadow-all-round transition-shadow duration-200 hover:underline!"
                >
                  <Image src={d.image} alt={d.title} width={215} height={170} />
                  <span className="p-3 pb-5">{d.title}</span>
                </Link>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
