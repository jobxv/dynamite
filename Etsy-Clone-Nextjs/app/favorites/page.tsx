"use client";
import React from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import { IoPencil } from "react-icons/io5";
import { RiShare2Line } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { LockIcon } from "@/components/Icons";
import ProductCard from "@/components/ProductCard";
import useProducts from "@/hooks/useProducts";
import useFavorites from "@/hooks/useFavorites";

const page = () => {
  const { products } = useProducts();
  const { favorites } = useFavorites();
  console.log("favorites", favorites);
  
  return (
    <div className="p-4 max-w ">
      <div className="md:px-8 flex flex-col">
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <h1
                className={`text-2xl md:text-[42px] font-light text-gray-800 mr-4 font-g`}
              >
                Favorite items
              </h1>
              {/* <ButtonLink outline>Sign in</ButtonLink> */}
            </div>
            <div className="flex items-center space-x-4 ">
              <span className="flex items-center font-medium gap-1">
                <LockIcon />
                Private
              </span>
              <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300">
                <IoPencil size={24} />
              </button>
              <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300">
                <RiShare2Line size={24} />
              </button>
            </div>
          </div>

          {!favorites.length && <div>
            No items in favorites</div>}

          {/* make visible when only not signed in */}
          {/* <div className="flex items-start flex-col text-gray-700 gap-2 mb-8">
            <div className="flex items-center gap-2">
              <IoMdTime size={24} />
              <p className="font-medium">
                Don&apos;t lose your faves! Sign in or create an account.
              </p>
            </div>
            <div className="pl-1 max-w-lg leading-7">
              <p>
                Guest favorites are only saved to your device for 7 days, or
                until you clear your cache. Sign in or create an account to hang
                on to your picks.
              </p>
            </div>
          </div> */}
        </div>

        <div className="flex justify-start items-center gap-4">
          {favorites.slice(0, 3).map((p) => (
            <ProductCard
              key={p.id}
              small
              starVisible
              ratingHidden
              product={{ ...p, images: [p.image_url] }}
              dontGrow
            />
          ))}
        </div>
        <div className="flex flex-col mt-25 gap-4">
          <h3 className="text-3xl font-medium">Similar to this collection</h3>
          <div className="flex gap-5 flex-wrap">
            <ProductCard
              starVisible
              ratingHidden
              extraSmall
              product={products[0]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
