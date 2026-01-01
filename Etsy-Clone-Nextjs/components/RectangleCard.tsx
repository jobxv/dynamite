"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { ProductDetails } from "@/data/products";
import clsx from "clsx";
import { IoPlaySharp } from "react-icons/io5";
import { toast } from "sonner";
import { Product } from "@/data/types";
import { getImageUrl } from "@/utils/image";
import { useAppStore } from "@/store/store";

export interface RectangleCardProps extends Product {
  onLike?: () => void;
  className?: string;
  priceHidden?: boolean;
  hideVideo?: boolean;
}

const RectangleCard = ({
  id,
  images,
  video,
  price,
  original_price,
  onLike,
  className,
  title = "Card item",
  priceHidden = false,
  hideVideo = false,
}: RectangleCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video play failed:", error);
        setIsVideoPlaying(false);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handlePlay = () => setIsVideoPlaying(true);
      const handlePause = () => setIsVideoPlaying(false);

      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("pause", handlePause);

      return () => {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
      };
    }
  }, []);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    onLike?.();
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    return () => {
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    };
  }, []);

  return (
    <Link
      href={`/listing/${id}`}
      className={`group relative block ${className} ${
        className?.includes("max-w") ? "" : "md:max-w-[314px]"
      } `}
    >
      <span
        className={`absolute inset-0 cursor-pointer rounded-3xl scale-90 opacity-0
                   group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 ease-out shadow-xl bg-white -z-10`}
      ></span>

      <div
        className="relative rounded-xl overflow-hidden bg-white size-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={
            images[0].includes("uploads") ? getImageUrl(images[0]) : images[0]
          }
          alt={"rectangle"}
          width={550}
          height={250}
          className={`w-full h-auto min-h-full object-cover aspect-[1/1.3] md:min-w-[200]`}
        />

        {video && !hideVideo && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isVideoPlaying || isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              ref={videoRef}
              tabIndex={-1}
              muted
              preload="none"
              className="w-full h-full object-cover"
              aria-label={title}
              aria-hidden={!isVideoPlaying && !isHovered}
              loop
              playsInline
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        )}

        {video && !isVideoPlaying && !isHovered && (
          <div className="absolute p-1 size-5 rounded-full  bg-white bottom-2 right-2 z-10 flex items-center justify-center">
            <IoPlaySharp className="absolute size-4 left-[3px]" />
          </div>
        )}

        <div
          className={`absolute left-0 bottom-0 px-2 py-0.5 m-1 rounded-full bg-white border-[#949494] border text-xsm flex items-center gap-1.5 text-nowrap overflow-ellipsis transition-all duration-300 ease-out ${
            priceHidden
              ? "transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              : ""
          }`}
        >
          <span className="">USD {price.toFixed(2)}</span>
          {original_price && (
            <span className="font-light line-through">
              USD {original_price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <HeartButton isLiked={isLiked} handleLike={handleLike} />
      </div>
    </Link>
  );
};

export default RectangleCard;

interface HeartButtonProps {
  isLiked: boolean;
  handleLike: () => void;
  visible?: boolean;
  large?: boolean;
  className?: string;
}
export const HeartButton = ({
  isLiked,
  handleLike,
  visible = false,
  large = false,
  className,
}: HeartButtonProps) => {
  const { isAuthenticatedState: authenticated } = useAppStore();
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (authenticated) {
      setScale(1.2);
      setTimeout(() => {
        setScale(1);
      }, 300);
      handleLike();
    } else {
      toast.error("You have to be signed in to favorite products.");
    }
  };
  const [scale, setScale] = useState(1);

  return (
    <div
      className={clsx(
        "absolute transition-all duration-200  z-10",
        !className && "group-hover:top-2 top-4 right-2",
        className
      )}
    >
      <button
        onClick={handleLikeClick}
        className={`rounded-full transition-colors duration-200 ${
          visible ? "" : "group-hover:block hidden"
        }  cursor-pointer hover:shadow-md border border-gray-300 ${
          large ? "p-2.5" : "p-1.5"
        } bg-white`}
        aria-label={isLiked ? "Remove from Favorites" : "Add to Favorites"}
      >
        <div className="relative">
          <IoMdHeartEmpty
            className={`${large ? "size-6" : "size-[18px]"} text-gray-500 ${
              isLiked ? "hidden" : "block"
            } `}
          />
          <IoMdHeart
            className={`${
              large ? "size-6" : "size-[18px]"
            } text-[#b50330] transition-transform duration-300 ease-out ${
              isLiked ? "block" : "hidden"
            }`}
            style={{ transform: `scale(${scale})` }}
          />
        </div>
      </button>
    </div>
  );
};
