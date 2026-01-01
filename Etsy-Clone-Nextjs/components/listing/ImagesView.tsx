"use client";

import { useState } from "react";
import Image from "next/image";

import { Award } from "lucide-react";
import clsx from "clsx";

import { HeartButton } from "../RectangleCard";
import ScrollButtons from "../ScrollButtons";

import { IoStar } from "react-icons/io5";
import { Product } from "@/data/types";
import { getImageUrl } from "@/utils/image";
import useFavorites from "@/hooks/useFavorites";
interface RatingProps {
  rating: number;
  large?: boolean;
}

export const Rating = ({ rating, large }: RatingProps) => {
  return (
    <div className={`flex items-center ${large ? " gap-2" : " gap-0.5"} `}>
      {[...Array(5)].map((_, index) => (
        <IoStar
          key={index}
          className={`${index < rating ? "text-black" : "text-gray-400"} ${
            large ? " size-4.5 " : " size-3 "
          }`}
        />
      ))}
    </div>
  );
};

export default function ImagesGallery({
  data: product,
  loading,
}: {
  data: Product | undefined;
  loading: boolean;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const [isLiked, setIsLiked] = useState(
    product ? isFavorite(product.id) : false
  );

  const handleLikeUpdate = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      product && removeFavorite(product.id);
    } else {
      product && addFavorite(product.id);
    }
    product && setIsLiked(!isLiked);
  };

  const [bestseller] = useState(Math.random() < 0.5);

  return (
    <div className="flex gap-6 flex-1 justify-start">
      {/* Thumbnail Gallery */}
      <div className="flex flex-col gap-2">
        {!loading &&
          product?.images &&
          product?.images.length > 0 &&
          product?.images?.map((thumb, index) => (
            <button
              key={index}
              className={clsx(
                "w-16 h-16 border-2 overflow-hidden rounded-sm",
                selectedImage === index ? "border-black" : "border-gray-200"
              )}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={getImageUrl(thumb) || "/placeholder.svg"}
                alt={`Product thumbnail ${index + 1}`}
                width={60}
                height={60}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
      </div>

      {/* Main Product Image */}
      {loading || product === undefined || product?.images === undefined ? (
        <div className="relative pt-5 w-full h-fit">
          <Image
            src={"/placeholder.svg"}
            alt="Easter greeting card with cute illustrations including bunny, chick, carrots, and Easter eggs"
            width={600}
            height={800}
            className="object-cover rounded-lg w-full"
            priority
          />
        </div>
      ) : (
        <div className="relative pt-5 w-full h-fit">
          <Image
            src={
              getImageUrl(product.images[selectedImage]) || "/placeholder.svg"
            }
            alt="Easter greeting card with cute illustrations including bunny, chick, carrots, and Easter eggs"
            width={600}
            height={800}
            className="object-cover rounded-lg w-full"
            priority
          />
          <ScrollButtons
            className="absolute left-2 top-1/2 flex justify-between z-10 w-full pr-4"
            scrollLeft={() => setSelectedImage(Math.max(selectedImage - 1, 0))}
            scrollRight={() =>
              setSelectedImage(
                Math.min(selectedImage + 1, product.images.length - 1)
              )
            }
            disableLeft={selectedImage === 0}
            disableRight={selectedImage === product.images.length - 1}
          />
          <div className="absolute top-2 right-2 z-10 shadow-all-round rounded-full">
            <HeartButton
              large
              visible
              isLiked={isLiked}
              handleLike={handleLikeUpdate}
            />
          </div>
          {bestseller && (
            <div className="absolute top-2 left-2 z-10">
              <div className="bg-[#ffd7ba] text-[#7d3c00] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                <Award className="w-4 h-4" />
                Bestseller
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
