import React from "react";
import ButtonLink from "./ui/ButtonLink";
import Image from "next/image";

const heroData = {
  title: "Make Mom's Day",
  description: "Meaningful gifts at every budget",
  image: "/hero-1.jpg",
  btnText: "Ready? Set. Gift.",
};

import Link from "next/link";
const heroData2 = {
  title: "Hurry! Easter gifts, decore, and more",
  description: "Shop Now",
  image: "/hero-2.jpg",
};

const HeroSection = () => {
  return (
    <>
      <div className="flex lg:gap-10 mt-6">
        <Link href={"#"} className="">
          <div className=" flex flex-col sm:flex-row rounded-xl overflow-hidden bg-[#eee1ff] lg:w-auto w-full h-full hover:shadow-all-round">
            <div className="p-6 flex sm:w-1/2 flex-col gap-4 text-center items-center justify-center ">
              <h2 className={`text-5xl font-g font-light `}>
                {heroData.title.split(" ").map((word, index) => (
                  <span key={index} className="hidden sm:inline">
                    {index === 0 ? (
                      <>
                        {word}
                        <br />
                      </>
                    ) : (
                      word
                    )}{" "}
                  </span>
                ))}

                <span className="block sm:hidden">{heroData.title}</span>
              </h2>
              <p className="text-xl">{heroData.description}</p>
              <ButtonLink btnClassName="hidden md:flex">{heroData.btnText}</ButtonLink>
            </div>
            <Image
              src={heroData.image}
              alt="hero-image"
              width={500}
              height={500}
              className="sm:w-1/2 w-full sm:object-cover hero-image-clip"
              priority
            />
          </div>
        </Link>
        <Link href={"#"}>
          <div className="relative rounded-xl overflow-hidden aspect-sqaure hidden lg:block flex-shrink-0 hover:shadow-all-round">
            <Image
              src={heroData2.image}
              alt="hero-image"
              width={400}
              height={400}
              priority
            />
            <div className="absolute inset bg-gradient-to-t from-black/60 via-transparent to-transparent w-full h-full top-0 left-0"></div>
            <div className="absolute bottom-0 left-0 text-white w-full p-4.5">
              <span className="text-[28px] font-medium">{heroData2.title}</span>
              <br />
              {heroData2.description}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default HeroSection;
