"use client";
import {
  ShopIcon,
  CatIcon,
  ChevronLeftLarge,
  ChevronRightLarge,
  CourtHammerIcon,
  HandWithMailIcon,
  DoorOpenIcon,
} from "@/components/Icons";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const [canPlay, setCanPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkCanPlay = () => {
      if (video.readyState >= 3 || !video.paused) {
        setCanPlay(true);
      }
    };

    video.addEventListener("canplaythrough", checkCanPlay);
    video.addEventListener("play", checkCanPlay);

    checkCanPlay();

    return () => {
      video.removeEventListener("canplaythrough", checkCanPlay);
      video.removeEventListener("play", checkCanPlay);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center md:pt -32 font-g min-h-screen">
      <div className="flex w-full max-w-7xl mx-auto px-8">
        <div className="flex w-full md:flex-row flex-col">
          <div className="lg:w-1/2 md:w-2/6 lg:p-10 relative flex items-center justify-center md:sticky top-0 h-screen">
            <div className="relative w-full md:w-full lg:px-10">
              {!canPlay && (
                <span className="relative w-full lg:px-10 transition-opacity duration-300 flex justify-center items-center">
                  <ShopIcon />
                </span>
              )}
              <video
                src="/animation1.mp4"
                className={`relative w-full h-full object-cover transition-opacity duration-300 ${canPlay
                  ? "opacity-100"
                  : "opacity-0 absolute pointer-events-none"
                  }`}
                autoPlay
                loop
                muted
                playsInline
                ref={videoRef}
                onCanPlayThrough={() => setCanPlay(true)}
              />
            </div>
          </div>

          <div className="lg:w-1/2 md:w-4/6 p-3 flex flex-col gap-6">
            <div className="min-h-[150vh] md:pb-20 pb-5 flex flex-col justify-center space-y-6">
              <h1 className="lg:text-[78px] md:text-6xl text-6xl font-light md:leading-16 lg:leading-20 mb-10 text-left">
                Keep Commerce Human
              </h1>
              <p className="sm:text-[25px] text-lg font-light lg:leading-[2.7rem] md:leading-9 mb-4 text-left">
                Dynamite is the global marketplace for unique and creative goods.
                It&apos;s home to a{" "}
                <Link
                  href={"#extraordinary-items"}
                  className="underline decoration-[#f5640080] hover:decoration-[#f56400] decoration-[0.5px] underline-offset-8"
                >
                  universe of special, extraordinary items,
                </Link>{" "}
                from unique handcrafted pieces to vintage treasures.
              </p>
              <p className="sm:text-[25px] text-lg font-light lg:leading-[2.7rem] md:leading-9 mb-4">
                In a time of increasing automation, it&apos;s our mission to
                keep human connection at the heart of commerce. That&apos;s why
                we built a place where creativity lives and thrives because
                it&apos;s powered by people. We help our{" "}
                <Link
                  href="#community-sellers"
                  className="underline decoration-[#f5640080] hover:decoration-[#f56400] decoration-[0.5px] underline-offset-8"
                >
                  community of sellers
                </Link>{" "}
                turn their ideas into successful businesses. Our platform
                connects them with{" "}
                <Link
                  href="#buyers"
                  className="underline decoration-[#f5640080] hover:decoration-[#f56400] decoration-[0.5px] underline-offset-8"
                >
                  millions of buyers
                </Link>{" "}
                looking for an alternative—something special with a human touch,
                for those moments in life that deserve imagination.
              </p>
              <p className="sm:text-[25px] text-lg font-light lg:leading-[2.7rem] md:leading-9">
                As a company, we strive to lead with{" "}
                <Link
                  href="#our-values"
                  className="underline decoration-[#f5640080] hover:decoration-[#f56400] decoration-[0.5px] underline-offset-8"
                >
                  our guiding principles
                </Link>{" "}
                and to help spread ideas of sustainability and responsibility
                whose impact can reach far beyond our own business.
              </p>
            </div>
          </div>
        </div>
      </div>
      <HowEtsyWorks />
      <FindOut />
    </div>
  );
};

const HowEtsyWorks = () => {
  return (
    <div className="bg-[#303044] lg:py-70 py-20 text-white font-light w-full relative">
      <div className="max-w-7xl mx-auto md:flex">
        <div className="lg:w-1/2 p-2 md:p-0 space-y-10 lg:space-y-70">
          <div className="">
            <h3 className="sm:text-5xl text-3xl pb-5"> How Dynamite Works </h3>
            <p className="sm:text-xl text-sm md:text-[24px] sm:pr-15 md:leading-9 leading-normal font-gr sm:font-g">
              Our global marketplace is a vibrant community of real people
              connecting over special goods. The platform empowers sellers to do
              what they love and helps buyers find what they love.
            </p>
          </div>

          <div className="sm:hidden size-[210] bg-[#454557] my-15 mx-auto rounded-full relative">
            <CourtHammerIcon className="absolute translate-x-1/3 -top-10 sm:hidden bg-[#da726b] flex-shrink-0 size-[124px] aspect-square rounded-full" />
            <HandWithMailIcon className="absolute -bottom-5 -right-10 sm:hidden size-[124px] rounded-full aspect-square flex-shrink-0 bg-[#f2d0b8]" />
            <DoorOpenIcon className="absolute sm:hidden -bottom-5  -left-10 size-[124px] rounded-full aspect-square flex-shrink-0 bg-[#f56400]" />
          </div>

          <div className="flex gap-10 w-full sm:px-10 lg:px-0">
            <CourtHammerIcon className="sm:block hidden lg:hidden bg-[#da726b] flex-shrink-0 size-[130px] aspect-square rounded-full" />
            <div className="">
              <h3 className="md:text-5xl text-xl pb-5">
                {" "}
                Sell extraordinarily{" "}
              </h3>
              <p className="md:text-lg lg:text-2xl text-sm sm:pr-15 lg:leading-10 font-gr md:font-g">
                With low fees, powerful tools, and support and education, we
                help creative entrepreneurs start, manage, and scale their
                businesses. Want to become an Dynamite seller? All it takes is 20
                cents to get started.
              </p>
              <button className="w-full sm:w-[230px] border border-[#ffffff4d] rounded-[3px] py-3 text-sm font-gr mt-3 md:mt-10 hover:border-white cursor-pointer">
                Become a Seller
              </button>
            </div>
          </div>
          <div className="flex gap-10 w-full sm:px-10 lg:px-0">
            <HandWithMailIcon className="sm:block hidden lg:hidden size-[130px] rounded-full aspect-square flex-shrink-0 bg-[#f2d0b8]" />
            <div className="">
              <h3 className="md:text-5xl text-xl pb-5">
                {" "}
                Buy extraordinarily{" "}
              </h3>
              <p className="md:text-lg lg:text-2xl text-sm sm:pr-15 lg:leading-10 font-gr md:font-g">
                From the specific to the unexpected (or custom-made), our search
                tools help buyers explore all the special one-of-a-kind items
                offered by Dynamite sellers. Our Journal and Editors Picks curate
                exciting trends and ideas discovered in the marketplace by our
                own team.
              </p>
              <button className="w-full sm:w-[230px] border border-[#ffffff4d] rounded-[3px] py-3 text-sm font-gr mt-3 md:mt-10 hover:border-white cursor-pointer">
                Start Shopping
              </button>
            </div>
          </div>
          <div className="flex gap-10 w-full sm:px-10 lg:px-0">
            <DoorOpenIcon className="sm:block hidden lg:hidden size-[130px] rounded-full aspect-square flex-shrink-0 bg-[#f56400]" />
            <div className="">
              <h3 className="md:text-5xl text-xl pb-5">Shop securely </h3>
              <p className="md:text-lg lg:text-2xl text-sm sm:pr-15 lg:leading-10 font-gr md:font-g">
                We provide the technology behind the Dynamite marketplace, helping
                buyers and sellers connect and exchange on Dynamite. Keeping those
                connections safe, fun and secure is our priority, and we&apos;re
                always{" "}
                <span className="underline underline-offset-7 decoration-[0.5px] decoration-[#ffffffbf] hover:decoration-white">
                  here to help
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="relative lg:block hidden lg:w-1/2">
          <div className="sticky top-0 min-h-screen flex items-center justify-center left-0">
            <Image
              src={"/hammer.png"}
              alt={"hammer"}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FindOut = () => {
  return (
    <div className="flex items-center flex-col justify-center font-g md:pt-10 pt-5 bg-[#ac1e2d]">
      <span className="size-64">
        <CatIcon />
      </span>

      <ScrollableContainer
        items={[
          <>
            <h3 className="md:text-[43px] text-3xl text-white font-light mb-4 text-center">
              Where can I find news about Dynamite?
            </h3>
            <p className="text-sm font-gr text-center">
              You&apos;ll find product announcements, company news and stories
              about our community members at our{" "}
              <Link
                className="underline underline-offset-2 hover:decoration-white"
                href="https://www.etsy.com/news/"
              >
                news blog
              </Link>
              . For investor news and presentations, SEC filings and leadership
              and governance information, visit our{" "}
              <Link
                className="underline underline-offset-2 hover:decoration-white"
                href="https://investors.etsy.com"
              >
                Investor Relations
              </Link>{" "}
              site.
            </p>
          </>,
          <>
            <h3 className="md:text-[43px] text-3xl text-white font-light text-center">
              Is Dynamite hiring?
            </h3>
            <p className="text-sm font-gr text-center">
              Yes! Visit our{" "}
              <Link
                className="underline underline-offset-2 hover:decoration-white"
                href={"#"}
              >
                careers page
              </Link>
              to see our open roles and to learn what it&apos;s like to be a
              part of the Dynamite team.
            </p>
          </>,
          <>
            <h3 className="md:text-[43px] text-3xl text-white font-light text-center">
              I&apos;m ready to shop. Where do I begin?
            </h3>
            <p className="text-sm font-gr text-center">
              Visit Dynamite.com to start exploring. If you&apos;re looking for
              something specific,{" "}
              <Link
                className="underline underline-offset-2 hover:decoration-white"
                href="#"
              >
                search away
              </Link>
              , or find inspiration through{" "}
              <Link
                className="underline underline-offset-2 hover:decoration-white"
                href="#"
              >
                The Dynamite Journal
              </Link>
              . You can join the Dynamite community by{" "}
              <Link
                className="underline underline-offset-2 hover:decoration-white"
                href="#"
              >
                registering for an account
              </Link>
              .
            </p>
          </>,
          <>
            <h3 className="md:text-[43px] text-3xl text-white font-light text-center">
              How do I become an Dynamite Seller?
            </h3>
            <p className="text-sm font-gr text-center">
              If you want to sell your handmade, vintage or craft items on Dynamite,
              check that they fit within our{" "}
              <Link
                className="underline underline-offset-2 hover:decoration-white"
                href="#"
              >
                Seller Policy
              </Link>
              . Then,{" "}
              <Link
                className="underline underline-offset-2 hover:decoration-white"
                href="#"
              >
                visit Dynamite.com/sell
              </Link>{" "}
              to set up your shop. It only takes 20 cents and your imagination
              to set up a global business.
            </p>
          </>,
        ]}
      />
    </div>
  );
};

export default Page;

const ScrollableContainer = ({ items }: { items: React.ReactNode[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState(0);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -containerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
    setActiveItem(Math.max(0, activeItem - 1));
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.clientWidth,
        behavior: "smooth",
      });
      setActiveItem(Math.min(items.length - 1, activeItem + 1));
    }
  };

  return (
    <div className="pb-10 flex flex-col justify-between">
      <div className="flex items-center space-y-4 max-wsm pb-5">
        <button
          onClick={scrollLeft}
          className="p-2 h-full hidden md:flex items-center justify-center rounded"
        >
          <ChevronLeftLarge />
        </button>
        <div
          ref={containerRef}
          className="flex overflow-hidden scroll-smooth lg:mx-36"
        >
          {items.map((e, i) => (
            <div
              key={i}
              className={clsx(
                "w-full flex-shrink-0 text-white md:px-8 text-center",
                activeItem == i
                  ? "opacity-100"
                  : "max-w-0 max-h-0 sm:max-w-full"
              )}
            >
              {e}
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={scrollRight}
            className="p-2  h-full hidden md:flex items-center justify-center rounded"
          >
            <ChevronRightLarge />
          </button>
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-5">
        {items.map((e, i) => (
          <div
            key={i}
            className={clsx(
              "size-1.5 rounded-full transition-all duration-200",
              activeItem == i ? "scale-200 bg-gray-100" : "bg-gray-300"
            )}
          ></div>
        ))}
      </div>
    </div>
  );
};
