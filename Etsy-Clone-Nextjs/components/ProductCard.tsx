"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { HeartButton } from "./RectangleCard";
import clsx from "clsx";
import { Product } from "@/data/types";
import { getImageUrl } from "@/utils/image";
import useFavorites from "@/hooks/useFavorites";
import { getSellerDetails } from "@/app/api";

interface ProductCardProps {
  product: Product;
  starVisible?: boolean;
  ratingHidden?: boolean;
  small?: boolean;
  extraSmall?: boolean;
  hideStarSeller?: boolean;
  hideSeller?: boolean;
  dontGrow?: boolean;
}

const MOCK_RATING = 4.5;
const MOCK_REVIEW_COUNT = 150;

const MOCK_FREE_SHIPPING_PROBABILITY = 0.6;
const MOCK_BESTSELLER_PROBABILITY = 0.4;

const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const ProductCard = ({
  product,
  starVisible,
  ratingHidden,
  small,
  extraSmall,
  hideStarSeller,
  hideSeller,
  dontGrow,
}: ProductCardProps) => {
  const [sellerUsername, setSellerUsername] = useState<string | null>(null);
  const [isLoadingSeller, setIsLoadingSeller] = useState(false);
  const [sellerError, setSellerError] = useState<string | null>(null);

  useEffect(() => {
    if (!product) return;
    const getSeller = async () => {
      if (!product.seller_id) {
        setSellerUsername("Seller Info N/A");
        setIsLoadingSeller(false);
        setSellerError(null);
        return;
      }

      setIsLoadingSeller(true);
      setSellerError(null);

      try {
        const response = await getSellerDetails(product.seller_id);

        if (response.success && response.data) {
          setSellerUsername(response.data.username);
        } else {
          setSellerUsername("Seller Info N/A");
          setSellerError(
            response.message || response.error || "Failed to fetch seller"
          );
          console.error(
            "Error fetching seller details:",
            response.message || response.error
          );
        }
      } catch (err) {
        console.error("Error fetching seller details:", err);
        setSellerUsername("Seller Info N/A");
        setSellerError("An error occurred while fetching seller");
      } finally {
        setIsLoadingSeller(false);
      }
    };

    getSeller();
  }, [product]);
  

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const isLiked = product ? isFavorite(product.id) : false;

  const handleLikeUpdate = () => {
    if (isLiked) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };

  const seed = product ? product.id : 0;

  const mockHasFreeShipping = useMemo(
    () => seededRandom(seed + 1) < MOCK_FREE_SHIPPING_PROBABILITY,
    [seed]
  );

  const mockIsBestseller = useMemo(
    () => seededRandom(seed + 2) < MOCK_BESTSELLER_PROBABILITY,
    [seed]
  );

  const { actualOriginalPrice, actualDiscountPercentage } = useMemo(() => {
    // Add this check at the beginning
    if (!product) {
      return {
        actualOriginalPrice: undefined,
        actualDiscountPercentage: undefined,
      };
    }

    // Now you can safely access product properties
    if (
      product.original_price !== undefined &&
      product.original_price !== null &&
      product.original_price > product.price
    ) {
      const percent =
        ((product.original_price - product.price) / product.original_price) *
        100;
      return {
        actualOriginalPrice: product.original_price,
        actualDiscountPercentage: percent,
      };
    }

    return {
      actualOriginalPrice: undefined,
      actualDiscountPercentage: undefined,
    };
  }, [product?.price, product?.original_price, product]); // Add product to dependencies

  const Rating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-3.5 h-3.5 fill-black text-black" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-3.5 h-3.5">
          <Star
            className="absolute w-3.5 h-3.5 fill-black text-black"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
          <Star className="absolute w-3.5 h-3.5 fill-none text-black" />
        </div>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-3.5 h-3.5 fill-none text-black" />
      );
    }

    return stars;
  };

  if (!product) {
    return (
      <div className="w-full h-full animate-pulse bg-gray-200 rounded"></div>
    );
  }

  return (
    <Link
      href={`/listing/${product.id}`}
      className={`relative group ${
        dontGrow ? "" : "flex-grow"
      } max-w-[320px] h-full w-fit`}
    >
      <div className="relative mb-2">
        <Image
          src={getImageUrl(product.images[0])}
          alt={product.title}
          width={extraSmall ? 203 : small ? 250 : 320}
          height={extraSmall ? 160 : small ? 200 : 260}
          className={clsx(
            `aspect-[1.23/1] hover:shadow-full transition-all duration-300 object-cover`,
            extraSmall ? "rounded w-full" : small ? "" : "rounded-sm"
          )}
        />
        <div
          className={`absolute ${
            extraSmall
              ? "top-1 right-1"
              : small
              ? "top-1 right-2"
              : "top-2 right-5"
          } z-10 group-hover:opacity-100 transition-opacity duration-200 ${
            starVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <HeartButton
            isLiked={isLiked}
            handleLike={handleLikeUpdate}
            visible={true}
          />
        </div>
      </div>
      <div
        className={clsx(
          extraSmall && "max-w-[203px]",
          small && "max-w-[250px]",
          !extraSmall && !small && "max-w-[320px] px-2",
          "flex flex-col"
        )}
      >
        <h3 className="text-sm line-clamp-1">{product.title}</h3>

        {!hideSeller && (small || extraSmall) && (
          <div className={`text-xs text-gray-600`}>
            {isLoadingSeller
              ? "Loading Seller..."
              : sellerError
              ? "Seller Info N/A"
              : sellerUsername || "Seller Info N/A"}{" "}
          </div>
        )}

        {!mockHasFreeShipping && !ratingHidden && (
          <div className="flex sm:items-center mb-1 flex-col sm:flex-row justify-start">
            <div className="flex mr-1">{Rating(MOCK_RATING)}</div>
            <span className="flex justify-between gap-1">
              <span className="text-xs text-gray-600">
                ({MOCK_REVIEW_COUNT.toLocaleString()})
              </span>

              {!hideStarSeller && mockIsBestseller && (
                <div className="flex items-center ml-1">
                  <span className="w-3.5 h-3.5 bg-purple-500 rounded-full flex items-center justify-center mr-0.5">
                    <Star className="w-2 h-2 fill-white text-white" />
                  </span>
                  <span className="text-xs">Star Seller</span>
                </div>
              )}
            </span>
          </div>
        )}

        <div className="flex gap-1 mt-1 items-center flex-wrap">
          <span className="font-medium text-sm">
            USD {Number(product.price).toFixed(2)}
          </span>

          {actualOriginalPrice !== undefined &&
            actualDiscountPercentage !== undefined && (
              <div className="text-xs text-[#63a47f]">
                <span className="line-through">
                  USD {actualOriginalPrice.toFixed(2)}
                </span>
                <span className="ml-1">
                  (-{actualDiscountPercentage.toFixed(0)}%){" "}
                </span>
              </div>
            )}
        </div>

        {!hideSeller && !(small || extraSmall) && (
          <div className={`text-xs text-gray-600`}>
            {isLoadingSeller
              ? "Loading Seller..."
              : sellerError
              ? "Seller Info N/A"
              : sellerUsername || "Seller Info N/A"}{" "}
          </div>
        )}

        {mockHasFreeShipping && (
          <div className="text-[10px] bg-green-400 flex rounded-full w-fit px-2 mt-1">
            FREE Shipping
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
