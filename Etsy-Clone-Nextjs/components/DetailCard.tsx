import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { HeartButton } from "./RectangleCard";
import { getImageUrl } from "@/utils/image";
import useFavorites from "@/hooks/useFavorites";

interface DetailCardProps {
  id: number;
  images: string[];
  original_price?: number;
  price: number;
  tagline: string;
  rating: number;
  title: string;
}

const DetailCard = ({
  images,
  original_price,
  price,
  tagline,
  rating,
  title: name,
  id,
}: DetailCardProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const [isLiked, setIsLiked] = useState(isFavorite(id));

  const handleLikeUpdate = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Link href={"#"}>
      <div className="relative border Z-0 border-[#0e0e0e2e] group max-w-[266px] lg:min-w-[266px] md:min-w-[220px] sm:w-[180px] rounded-xl overflow-hidden hover:shadow-[0_2px_5px_rgb(0_0_0_/_30%)]">
        <HeartButton
          className="group-hover:top-2 group-hover:right-2 top-0"
          isLiked={isLiked}
          handleLike={handleLikeUpdate}
        />
        <Image
          src={getImageUrl(images[0])}
          alt={name}
          width={266}
          height={266}
          className="aspect-square object-cover"
        />
        <div className="flex flex-col gap-1 px-2 pb-10 pt-2">
          <div className="flex justify-between">
            <p className="truncate pr-12 text-sm text-gray-600">{name}</p>
            <div className="flex items-center gap-1 justify-center text-xsm">
              <span className="text-xsm -mb-1">{rating}</span>
              <MdOutlineStar size={15} />
            </div>
          </div>
          <div className="flex justify-between pr-5 items-center flex-wrap">
            <p className="text-green-700 font-medium text-lg">USD {price}</p>
            <p className="text-xsm text-gray-600 line-through">
              USD {original_price}
            </p>
            {original_price && (
              <p className="bg-green-400 text-xs font-medium rounded-full flex items-center px-1 h-fit">
                {(((original_price - price) / original_price) * 100).toFixed(0)}
                % off
              </p>
            )}
          </div>
          <p className="text-xsm">{tagline}</p>
        </div>
      </div>
    </Link>
  );
};

export default DetailCard;
