import Image from "next/image";
import React from "react";
import { HeartButton } from "./RectangleCard";
import { FaPlay } from "react-icons/fa";

interface CardWithVideoProps {
  imageUrl: string;
  videoUrl?: string;
  title?: string;
  price: number;
  salePrice?: number;
  isFavorited: boolean;
  linkHref: string;
  onFavoriteToggle: () => void;
}

const CardWithVideo = ({
  imageUrl,
  videoUrl,
  title,
  price,
  salePrice,
  isFavorited,
  linkHref,
  onFavoriteToggle = () => {},
}: CardWithVideoProps) => {
  return (
    <div className="flex-shrink-0 grid-cols-6 lg:grid-cols-3 p-1 size-[314px] relative">
      <div className="relative w-full rounded-md overflow-hidden">
        <a className="inline-block w-full" href={linkHref} title={title}>
          <div className="relative">
            <div className="relative w-full h-0 pb-[100%] bg-gray-300 rounded-md overflow-hidden">
              <Image
                className="absolute inset-0 w-full h-full object-cover block rounded-md z-10"
                alt={title ?? "Card"}
                src={imageUrl}
                fill
                loading="lazy"
              />
            </div>

            <p className="animated animated-appear-02 mb-2 pl-2 pr-2 max-w-full text-black absolute bottom-0 z-10 text-sm ">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white border border-gray-200 w-full truncate">
                <span className="flex items-baseline">
                  <span className="currency-symbol mr-0.5">USD</span>
                  <span className="currency-value">{price.toFixed(2)}</span>
                </span>
                {salePrice && (
                  <span className="text-gray-500 text-xs line-through ml-1">
                    <span className="currency-symbol mr-0.5">USD</span>
                    <span className="currency-value">
                      {salePrice.toFixed(2)}
                    </span>
                  </span>
                )}
              </span>
            </p>

            {/* Optional Video Preview */}
            {videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                <video
                  tabIndex={-1}
                  muted
                  preload="none"
                  className="w-full h-full object-cover"
                  aria-label={title}
                  aria-hidden="true"
                  loop
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaPlay />
                </div>
              </div>
            )}
          </div>
        </a>
        <HeartButton isLiked={isFavorited} handleLike={onFavoriteToggle} />
      </div>
    </div>
  );
};

export default CardWithVideo;
