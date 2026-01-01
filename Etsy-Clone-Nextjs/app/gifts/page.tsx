"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BsMoonStars } from "react-icons/bs";
import { FiGift, FiHeart, FiMail } from "react-icons/fi";
import {
  GiDiamondRing,
  GiMedicines,
  GiLovers,
  GiBabyBottle,
  GiTeacher,
  GiBowTie,
  GiHouse,
  GiCupcake,
} from "react-icons/gi";
import { BsCake } from "react-icons/bs";
import { GuardianEgyp } from "../fonts";
import ScrollButtons from "@/components/ScrollButtons";
import ButtonLink from "@/components/ui/ButtonLink";
import { productData, ProductDetails } from "@/data/products";
import clsx from "clsx";
import { categoryData } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import useProducts from "@/hooks/useProducts";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  date?: string;
  active?: boolean;
}

interface GiftItem {
  id: string;
  title: string;
  image: string;
  category: string;
  href: string;
}
const categories: Category[] = [
  {
    id: "eid",
    name: "Eid",
    icon: <BsMoonStars className="size-11" />,
    date: "Jun 7",
    active: true,
  },
  {
    id: "wedding",
    name: "Wedding",
    icon: <BsCake className="size-11 text-black fill-black" fill="black" />,
  },
  {
    id: "birthday",
    name: "Birthday",
    icon: <GiCupcake className="size-11" />,
  },
  {
    id: "anniversary",
    name: "Anniversary",
    icon: <GiLovers className="size-11" />,
  },
  {
    id: "thank-you",
    name: "Thank You",
    icon: <FiMail className="size-11" />,
  },
  {
    id: "sympathy",
    name: "Sympathy",
    icon: <FiHeart className="size-11" />,
  },
  {
    id: "get-well",
    name: "Get Well",
    icon: <GiMedicines className="size-11" />,
  },
  {
    id: "engagement",
    name: "Engagement",
    icon: <GiDiamondRing className="size-11" />,
  },
  {
    id: "new-baby",
    name: "New Baby",
    icon: <GiBabyBottle className="size-11" />,
  },
  {
    id: "expecting-parent",
    name: "Expecting Parent",
    icon: <FiGift className="size-11" />,
  },
  {
    id: "teacher-appreciation",
    name: "Teacher Appreciation",
    icon: <GiTeacher className="size-11" />,
  },
  {
    id: "just-because",
    name: "Just Because",
    icon: <GiBowTie className="size-11" />,
  },
  {
    id: "housewarming1",
    name: "Housewarming",
    icon: <GiHouse className="size-11" />,
  },
  {
    id: "housewarming2",
    name: "Housewarming",
    icon: <GiHouse className="size-11" />,
  },
  {
    id: "housewarming3",
    name: "Housewarming",
    icon: <GiHouse className="size-11" />,
  },
];

const giftItems: GiftItem[] = [
  {
    id: "1",
    title: "Handmade Pottery",
    image: "/placeholder.svg?height=300&width=400",
    category: "eid",
    href: "/category/handmade-pottery",
  },
  {
    id: "2",
    title: "Eid Gift Boxes",
    image: "/placeholder.svg?height=300&width=400",
    category: "eid",
    href: "/category/eid-gift-boxes",
  },
  {
    id: "3",
    title: "Eid Themed Home Decor",
    image: "/placeholder.svg?height=300&width=400",
    category: "eid",
    href: "/category/eid-home-decor",
  },
  {
    id: "4",
    title: "Islamic Jewelry",
    image: "/placeholder.svg?height=300&width=400",
    category: "eid",
    href: "/category/islamic-jewelry",
  },
  {
    id: "5",
    title: "Islamic Coloring Books and Crafts",
    image: "/placeholder.svg?height=300&width=400",
    category: "eid",
    href: "/category/islamic-crafts",
  },
  {
    id: "6",
    title: "Decorative Lanterns",
    image: "/placeholder.svg?height=300&width=400",
    category: "eid",
    href: "/category/decorative-lanterns",
  },
  {
    id: "7",
    title: "Embroidered Hijabs or Scarves",
    image: "/placeholder.svg?height=300&width=400",
    category: "eid",
    href: "/category/hijabs-scarves",
  },
  {
    id: "8",
    title: "Handmade Bags or Purses",
    image: "/placeholder.svg?height=300&width=400",
    category: "eid",
    href: "/category/handmade-bags",
  },
];

interface Interest {
  id: string;
  name: string;
}

const interests: Interest[] = [
  { id: "1", name: "Romance" },
  { id: "2", name: "Sentimental Gifts" },
  { id: "3", name: "Art" },
  { id: "4", name: "Science" },
  { id: "5", name: "Nature" },
  { id: "6", name: "Family" },
  { id: "7", name: "Plants" },
  { id: "8", name: "Minimalist Decor" },
  { id: "9", name: "Sports" },
  { id: "10", name: "Pop Culture" },
  { id: "11", name: "Reading" },
  { id: "12", name: "Puzzles & Games" },
  { id: "13", name: "Travel" },
  { id: "14", name: "Fashion" },
  { id: "15", name: "Cooking & Baking" },
  { id: "16", name: "Hosting" },
  { id: "17", name: "Movies" },
];

const page = () => {
  return (
    <div className="max-w py-6">
      <div className="text-center space-y-5">
        <h1
          className={`sm:text-[42px] text-3xl font-light ${GuardianEgyp.className}`}
        >
          Extra-special gifting made extra-easy
        </h1>
        <p className="sm:text-2xl font-medium text-lg">
          Discover perfect picks for the occasion!
        </p>
      </div>
      <GiftsCategorySection categories={categories} giftItems={giftItems} />
      <GiftsByInterestSection interests={interests} />
    </div>
  );
};

export default page;

function GiftsByInterestSection({ interests }: { interests: Interest[] }) {
  const category = "accessories";
  const { products } = useProducts();
  const [selectedInterest, setSelectedInterest] = useState("1");
  return (
    <div className="">
      <div className="flex justify-center flex-col items-center mt-15 gap-10">
        <h3 className="sm:text-2xl font-medium text-lg">
          Browse by interest for the best gifts!
        </h3>
        <div className="flex flex-wrap max-w-5xl gap-2 justify-center items-center mx-auto">
          {interests.map((interest) => (
            <ButtonLink
              onClick={() => setSelectedInterest(interest.id)}
              small
              key={interest.id}
              outline
              className={clsx(
                "sm:bg-gray-100",
                selectedInterest !== interest.id && "bg-white",
                selectedInterest === interest.id
                  ? "border-2"
                  : ["md:border-none", "border", "border-gray-400"]
              )}
            >
              {interest.name}
            </ButtonLink>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-10">
        <div className="flex justify-between">
          <div className="flex group gap-3 cursor-pointer">
            <Image
              src={"/bunny.jpg"}
              alt={""}
              width={50}
              height={50}
              className="rounded-xl aspect-square group-hover:shadow-all-round"
            />
            <div className="flex flex-col justify-center ">
              <p className="text-xsm text-gray-500 group-hover:underline">
                The Photographer
              </p>
              <p className="text-sm group-hover:underline">Film Keychains</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 grid-rows-1 overflow-hidden md:grid-cols-6 gap-4 justify-center items-start">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              extraSmall
              hideStarSeller
              hideSeller
            />
          ))}
        </div>
      </div>
      <InspireGifterSection />
    </div>
  );
}

const InspireGifterSection = () => {
  const questions = [
    "Do they love music?",
    "Do they love Sports?",
    "What is their Style?",
    "What is their Favorite Color?",
    "What is their Favorite Food?",
  ];

  // Function to chunk the product data into groups of 6
  const chunkArray = (arr: ProductDetails[], size: number) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedProducts = chunkArray(productData, 5);

  return (
    <div className="flex flex-col gap-5 mt-10">
      <h2 className="text-4xl text-center mb-5">Inspire your inner gifter!</h2>

      {chunkedProducts.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="flex flex-col gap-5">
          {/* Display a question before each chunk */}
          {questions[chunkIndex % questions.length] && (
            <h3 className="text-2xl font-medium mt-5">
              {questions[chunkIndex % questions.length]}
            </h3>
          )}
          <div className="flex gap-5 flex-wrap justify-center">
            {chunk.map((item) => (
              <GiftCard
                key={item.id}
                image={item.images[0]}
                title={item.title}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const GiftCard = ({ image, title }: { image: string; title: string }) => {
  const bgs = ["green", "blue", "orange", "yellow", "purple"];
  const bgColor = bgs[Math.floor(Math.random() * bgs.length)];
  const textColor = bgColor === "green" || "blue" ? "white" : "black";
  const bgColorClass =
    bgColor === "green"
      ? "bg-[#034927]"
      : bgColor === "blue"
      ? "bg-[#2638c0]"
      : bgColor === "orange"
      ? "bg-[#f1641e]"
      : bgColor === "pink"
      ? "bg-pink-500"
      : bgColor === "purple"
      ? "bg-[#8c8af0]"
      : bgColor === "yellow"
      ? "bg-[#fdd95c]"
      : "bg-gray-500";

  return (
    <Link href={"#"} className="size-fit">
      <div className={`${bgColorClass} flex w-fit rounded-2xl flex-col`}>
        <h2
          className={`font-medium text-lg p-3 flex-col flex text-${textColor}`}
        >
          <span>{title.split(" ")[0]}</span>
          <span>{title.split(" ").slice(1, 3).join(" ")}</span>
        </h2>
        <div className="p-1.5 relative">
          <Image
            src={image}
            alt={""}
            width={240}
            height={240}
            className="rounded-xl aspect-square object-cover"
            style={{
              clipPath: "circle(farthest-side  at 50% 100%)",
            }}
          />
        </div>
      </div>
    </Link>
  );
};

const GiftsCategorySection = ({
  categories,
  giftItems,
}: {
  categories: Category[];
  giftItems: GiftItem[];
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("eid");

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const filteredGifts = giftItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="sm:px-4">
      <div className="relative mb-8 max-h-fit">
        <ScrollButtons
          small
          aria-label="Scroll"
          className="left-0 top-1/2 translate-y-15 w-full hidden md:flex justify-between pointer-events-none"
          scrollLeft={() => handleScroll("left")}
          scrollRight={() => handleScroll("right")}
        />

        <div
          ref={scrollRef}
          className="flex md:pl-12 overflow-x-auto py-2 md:px-8 px-2 gap-9 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`group flex flex-col items-center min-w-[64px] cursor-pointer ${
                activeCategory === category.id
                  ? "border-b-2 border-black font-medium"
                  : "hover:border-b-2 hover:border-black"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div
                className={`p-3 rounded-full flex items-center justify-center mb-2 text-black fill-black transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-[#e0e0e0]"
                    : "group-hover:bg-[#e0e0e0]"
                }`}
              >
                {category.icon}
              </div>
              <span
                className={`text-xs text-center ${
                  activeCategory === category.id ? "" : "text-gray-600"
                } group-hover:text-gray-800`}
              >
                {category.name}
              </span>
              {category.date && (
                <span className="text-xs text-gray-600">{category.date}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Gift Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {filteredGifts.map((item) => (
          <Link
            href={item.href}
            key={item.id}
            className="block group overflow-hidden border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="sm:p-4 p-2 bg-white">
              <h3 className="text-center sm:font-medium">{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* More Ideas Button */}
      <div className="flex justify-center mt-8">
        <ButtonLink href={`/gifts/${activeCategory}/more`} className="" outline>
          <span className="mr-2">
            More ideas for{" "}
            {categories.find((c) => c.id === activeCategory)?.name}
          </span>
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </div>
  );
};
