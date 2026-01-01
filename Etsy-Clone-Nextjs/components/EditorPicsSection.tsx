import React from "react";

import RectangleCard from "./RectangleCard";
import ButtonLink from "./ui/ButtonLink";
import { productData } from "@/data/products";

const EditorPicsSection = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4.5 justify-between px-4.5">
      <div className="col-span-full sm:col-span-1 md:col-span-2 text-left self-center mb-3 md:mb-0 px-3 lg:px-7 p-2 ">
        <div className="md:max-w-[360px] flex flex-col">
          <p className="text-sm text-gray-500">Editors&apos; Picks</p>
          <h2 className="text-2xl font-medium text-black mt-1 mb-2 md:mb-1">
            Book Lovers Sales - up to 50% off!
          </h2>
          <p className="text-sm text-black pb-4 hidden lg:block">
            Readers rejoice! Save on special finds for anyone who likes a little
            literature.*
          </p>
          <ButtonLink
            href="/gifts"
            btnClassName="text-black w-fit"
            className="bg-[#e9e9e9]"
          >
            Shop these unique finds
          </ButtonLink>
        </div>
      </div>
      {productData.slice(0, 6).map((item, index) => (
        <RectangleCard
          priceHidden
          key={index}
          {...item}
          className="size-full"
        />
      ))}
    </div>
  );
};

export const EditorPicsSectionSmall = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4.5 justify-between px-4.5">
      <div
        className={`text-left self-center mb-3 md:mb-0 px-3 lg:px-7 p-2 col-span-full md:col-span-2`}
      >
        <div className="md:max-w-[360px] flex flex-col">
          <p className="text-sm text-gray-500">Editors&apos; Picks</p>
          <h2 className="sm:text-2xl text-lg font-medium text-black mt-1 mb-2 md:mb-1">
            Gifts for Her
          </h2>
          <ButtonLink
            href="/gifts"
            btnClassName="w-fit text-black text-nowrap"
            className="bg-[#e9e9e9]"
          >
            See more
          </ButtonLink>
        </div>
      </div>
      {productData.slice(0, 7).map((item, index) => (
        <RectangleCard
          key={index}
          {...item}
          className={`${
            index === 2
              ? " md:col-span-2 md:row-span-2 max-w-full "
              : index === 6
              ? " col-span-2 md:col-span-1"
              : ""
          } `}
        />
      ))}
    </div>
  );
};

export default EditorPicsSection;
