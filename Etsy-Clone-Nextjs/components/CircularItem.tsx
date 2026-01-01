import { ProductDetails } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const CircularItem = ({  title, images, id }: ProductDetails) => {
  return (
    <Link href={`/listing/${id}`}>
      <div className="flex items-center justify-center flex-col gap-2 rounded-2xl group relative">
      <span
        className={`absolute inset-0 cursor-pointer rounded-3xl scale-90 opacity-0  group-hover:scale-110 group-hover:opacity-100 transition-all duration-200 ease-out shadow-full bg-white -z-10`}
      ></span>
        <Image
          src={images[0]}
          alt={title}
          width={160}
          height={160}
          className="rounded-full min-w-[100px]"
        />
        <p className=" border-[#0e0e0e2e] max-w-[160px] text-center">{title.split(" ").slice(0,4).join(" ")}</p>
      </div>
    </Link>
  );
};

export default CircularItem;
