"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Rating } from "./ImagesView";
import { TickIcon } from "../Icons";
import { Review, SellerInfo } from "@/data/types";
import useProducts from "@/hooks/useProducts";
import { getImageUrl } from "@/utils/image";

interface ReviewsSectionProps {
  reviews?: Review[];
  sellerInfo: SellerInfo | undefined;
}

const ReviewsSection = ({ reviews = [], sellerInfo }: ReviewsSectionProps) => {
  const [activePage, setActivePage] = useState(1);
  const relatedSearches = useProducts();

  const buyerHighlights = [
    "Beautiful",
    "Love it",
    "Cute",
    "Fast shipping",
    "Great quality",
    "Love the shop",
    "Stunning",
    "Very well made",
  ];

  return (
    <div className="max-w-4xl mt-12 px-4">
      {/* Related Searches */}
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4">Related searches</h3>
        <div className="flex flex-wrap gap-4 justify-between">
          {relatedSearches.products.slice(0,7).map((item, index) => (
            <Link href={`/listing/${item.id}`} key={index} className="flex flex-col items-center hover:shadow-md rounded-lg p-2">
              <div className="w-18 h-18 rounded-full overflow-hidden mb-2">
                <Image
                  src={getImageUrl(item.images[0]) || "/placeholder.svg"}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-center max-w-[70px] line-clamp-2">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Shop Reviews Summary */}
      <div className="mb-6">
        <h2 className="text-2xl font-medium">
          {sellerInfo?.username} has {reviews.length.toLocaleString()} reviews
          <span className="inline-flex ml-2">
            <Rating rating={sellerInfo?.rating || 0} large />
          </span>
        </h2>
      </div>

      {/* Review Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex">
          <button className="px-4 py-2 border-b-2 border-black font-medium">
            This item{" "}
            <span className="ml-1 bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-sm">
              {reviews.length}
            </span>
          </button>
          <button className="px-4 py-2 text-gray-600">Other items</button>
          <button className="px-4 py-2 text-gray-600">
            <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-sm">
              {reviews.length.toLocaleString()}
            </span>
          </button>
        </div>
      </div>

      {/* Buyer Highlights */}
      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-medium">Buyer highlights, summarized by AI</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {buyerHighlights.map((highlight, index) => (
            <span
              key={index}
              className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="flex justify-end mb-6">
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-500">
            <option>Sort by: Suggested</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-8">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Left side - Review content */}
                <div className="flex-1">
                  <div className="flex mb-2">
                    <Rating rating={review.rating} large />
                  </div>

                  <p className="mb-3">{review.comment}</p>

                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium mr-2">
                      {review.username.charAt(0)}
                    </div>
                    <Link
                      href="#"
                      className="text-sm font-medium hover:underline"
                    >
                      {review.username}
                    </Link>
                    <span className="text-gray-500 text-sm ml-2">
                      {review.created_at}
                    </span>
                  </div>
                </div>

                {/* Right side - Quality ratings */}
                <div className="mt-4 md:mt-0 space-y-2">
                  <div className="flex items-center justify-between text-green-600 text-sm mb-4">
                    <TickIcon />
                    <span>Recommends this item</span>
                  </div>

                  <div className="flex justify-end gap-2">
                    <span className="text-sm">Item quality</span>
                    <div className="flex">
                      <Star className="w-4 h-4 fill-black" />
                      <span className="ml-1 text-xsm">5</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <span className="text-sm">Shipping</span>
                    <div className="flex">
                      <Star className="w-4 h-4 fill-black" />
                      <span className="ml-1 text-xsm">5</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <span className="text-xsm">Customer service</span>
                    <div className="flex">
                      <Star className="w-4 h-4 fill-black" />
                      <span className="ml-1 text-sm">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-8 text-gray-500">
            No reviews yet for this item.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100"
          onClick={() => setActivePage(Math.max(1, activePage - 1))}
          disabled={activePage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {reviews.length > 0 && [1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              activePage === page
                ? "bg-black text-white"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setActivePage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100"
          onClick={() => setActivePage(Math.min(5, activePage + 1))}
          disabled={activePage === 5}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;
