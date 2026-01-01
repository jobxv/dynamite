"use client";
import React from "react";
import Link from "next/link";
import ButtonLink from "../ui/ButtonLink";
import EmailSubscriptionForm from "../EmailSubscriptionForm";
import { HiGlobeAlt } from "react-icons/hi";
import FooterLinks from "./FooterDropDown";
import { usePathname } from "next/navigation";
import { EtsyLogo } from "../Icons";

const Footer = () => {
  const pathname = usePathname();
  return (
    <>
      {!pathname.includes("signin") && !pathname.includes("register") && (
        <div className="flex flex-col md:mt-15 mt-10">
          <WhatIsEtsySection />
          <EmailSubscriptionForm />
          <div className="bg-primary-dark">
            <div className="flex md:flex-row flex-col justify-center mx-auto text-base max-w-screen-xl">
              <div className="flex md:flex-col order-last md:order-first items-center justify-center px-9 py-4 gap-4 flex-1 bg-primary-dark">
                <Link href="#" className="aspect-square">
                  <div className="bg-primary fill-white p-1.5 rounded-2xl flex justify-center items-center size-16.5">
                    <EtsyLogo />
                  </div>
                </Link>
                <Link
                  href="#"
                  className="rounded-full md:py-3 py-2 sm:text-base text-sm px-5 md:font-normal bg-primary text-white"
                >
                  Download the Dynamite App
                </Link>
              </div>
              <FooterLinks />
            </div>
          </div>
          <FooterLastSection />
        </div>
      )}
    </>
  );
};

export default Footer;

const WhatIsEtsySection = () => {
  return (
    <div className="bg-secondary/30">
      <div className="text-center px-10 py-12 mx-auto max-w-[1400px]">
        <h2 className={`text-[42px] font-graphik font-light font-g`}>
          What is Dynamite?
        </h2>
        <Link href="/about" className="underline! text-xsm mb-4 inline-block">
          Read our wonderfully weird story
        </Link>
        <div className="flex flex-col md:flex-row md:text-left gap-8 mt-10 mb-10 text-center">
          <div className="flex-1">
            <h3 className="text-2xl font-medium mb-5">
              A community doing good
            </h3>
            <div className="mb-2 text-">
              Dynamite is a global online marketplace where people come together to
              make, sell, buy, and collect unique items. We&apos;re also a
              community pushing for positive change for small businesses,
              people, and the planet.{" "}
              <span className="underline cursor-help group relative">
                Here are some of the ways we&apos;re making a positive impact,
                together.
                <ul className="list-disc group-hover:block hidden list-inside text-sm mt-2 absolute -top-45 bg-white max-w-70 p-3 rounded-lg">
                  <li>
                    Your purchases on Dynamite in 2020 generated nearly $4 billion
                    in income for small businesses.
                  </li>
                  <li>
                    We advocate for policy that benefits creative entrepreneurs
                    and small businesses.
                  </li>
                  <li>
                    We&apos;re working towards net zero emissions by 2030.
                  </li>
                </ul>
              </span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-medium mb-5">
              Support independent creators
            </h3>
            <p>
              There&apos;s no Dynamite warehouse &ndash; just millions of people selling
              the things they love. We help connect you directly with makers to
              find something extraordinary.
            </p>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-medium  mb-5">Peace of mind</h3>
            <p>
              Your privacy is our priority. If you ever need assistance, our
              support team is always ready to help.
            </p>
          </div>
        </div>
        <div className="text-center mt-10 flex flex-col items-center gap-3">
          <h4 className="text-lg font-medium mb-2">
            Have a question? Well, we&apos;e got some answers.
          </h4>
          <ButtonLink
            btnClassName="z-10"
            href="https://www.etsy.com/help?ref=hp_what_is_etsy_help_center"
            outline
          >
            Go to Help Center
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

const lastFooterLinks = [
  { text: "Terms of Use", href: "#" },
  { text: "Privacy", href: "#" },
  { text: "Interest-based ads", href: "#" },
  { text: "Local Shops", href: "#" },
  { text: "Regions", href: "#" },
];

const FooterLastSection = () => {
  return (
    <div className="bg-gray-800 py-4 px-6">
      <div className="max-w-screen-xl mx-auto text-sm">
        <div className="flex md:flex-row flex-col items-center md:px-9 gap-2">
          <div className="flex pr-3 font-medium rounded-full relative overflow-hidden z-10 transition duration-200 hover:bg-[#3f3f3f] group">
            <div className="absolute inset-0 z-[-1] transition duration-200 ease-in-out rounded-full transform scale-x-0 group-hover:scale-x-100 group-hover:bg-[#3f3f3f]"></div>
            <a href="#" className="flex items-center py-2 px-4 text-white">
              <span className="w-4 h-4 mr-3">
                <HiGlobeAlt className="w-4 h-4 fill-white" />
              </span>
              <span>
                &nbsp; Ethiopia &nbsp; | &nbsp; English (US) &nbsp; | &nbsp; $
                (USD)
              </span>
            </a>
          </div>
          <div className="flex items-center text-white flex-grow flex-shrink basis-0 justify-end sm:flex-row flex-col gap-3 md:0">
            <span className="block flex-1 text-nowrap">
              &copy;&nbsp;{new Date().getFullYear()} Dynamite, Inc.
            </span>
            <ul className="list-none m-0 flex md:gap-5 gap-3 ml-5 flex-wrap justify-center">
              {lastFooterLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="underline text-white text-nowrap"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
