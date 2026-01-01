"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FooterDropdownProps {
  title: string;
  links: string[];
}

import React from "react";
import {
  FaInstagram,
  FaYoutube,
  FaPinterest,
  FaFacebookSquare,
} from "react-icons/fa";
import AnimatedButton from "../ui/AnimatedButton";
import Link from "next/link";
const footerLinkSections = [
  {
    title: "Shop",
    links: [
      "Gift cards",
      "Dynamite Registry",
      "Sitemap",
      "Dynamite Blog",
      "Dynamite United Kingdom",
      "Dynamite Germany",
      "Dynamite Canada",
    ],
  },
  {
    title: "Sell",
    links: ["Sell on Etsy", "Teams", "Forums", "Affiliates & creators"],
  },
  {
    title: "About",
    links: [
      "Etsy, Inc.",
      "Policies",
      "Investors",
      "Careers",
      "Press",
      "Impact",
      "Legal imprint",
    ],
  },
  {
    title: "Help",
    links: ["Help Center", "Privacy Settings"],
  },
];

// Define the data for the social media icons using react-icons components
const socialIcons = [
  {
    id: "instagram",
    href: "#", // Placeholder link
    icon: <FaInstagram className="sm:size-6 size-8 p-0.5 fill-white" />, // Use FaInstagram component
  },
  {
    id: "facebook",
    href: "#", // Placeholder link
    icon: <FaFacebookSquare className="sm:size-6 size-8 p-0.5 fill-white" />, // Use FaFacebook component
  },
  {
    id: "twitter",
    href: "#", // Placeholder link
    icon: <FaPinterest className="sm:size-6 size-8 p-0.5 fill-white" />, // Use FaTwitter component
  },
  {
    id: "youtube",
    href: "#", // Placeholder link
    icon: <FaYoutube className="sm:size-6 size-8 p-0.5 fill-white" />, // Use FaYoutube component
  },
];

const FooterLinks = () => {
  return (
    <div className=" sm:px-9 sm:pt-9 sm:pb-6 flex-2 text-white">
      <div className="w-full sm:flex hidden">
        {footerLinkSections.map((section, sectionIndex) => (
          <div
            key={section.title}
            className={`basis-1/4 block ${sectionIndex === footerLinkSections.length - 1 ? "pr-0" : "pr-5"
              }`}
          >
            <h3 className="mt-0 mb-3 text-base">{section.title}</h3>
            <div className="links-group">
              <ul className="list-none m-0 p-0 leading-tight text-sm">
                {section.links.map((linkText, linkIndex) => (
                  <li key={linkIndex} className="py-1.5 w-full">
                    <a className="cursor-pointer hover:underline!">
                      {linkText}
                    </a>
                  </li>
                ))}
              </ul>

              {section.title === "Help" && (
                <div className="mt-5">
                  <ul className="w-full flex gap-5 flex-wrap">
                    {socialIcons.map((icon) => (
                      <li key={icon.id} className=" inline-block w-auto">
                        <a
                          href={icon.href}
                          className="relative block transition duration-200 transform-origin-center rounded-full group z-10 "
                        >
                          <span className="absolute inset-0 scale-150 rounded-full bg-white/20 opacity-0 transition duration-200 group-hover:opacity-100"></span>
                          <span className="block relative z-10">
                            {icon.icon}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="py-3 sm:hidden block ">
        {footerLinkSections.map((section) => (
          <FooterDropDown
            key={section.title}
            title={section.title}
            links={section.links}
          />
        ))}
        <ul className="w-full flex gap-5 flex-wrap justify-center py-3">
          {socialIcons.map((icon) => (
            <li key={icon.id} className=" inline-block w-auto">
              <a
                href={icon.href}
                className="relative block transition duration-200 transform-origin-center rounded-full group z-10 "
              >
                <span className="absolute inset-0 scale-150 rounded-full bg-white/20 opacity-0 transition duration-200 group-hover:opacity-100"></span>
                <span className="block relative z-10">{icon.icon}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterLinks;
const FooterDropDown: React.FC<FooterDropdownProps> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden block px-5">
      <AnimatedButton
        className="flex justify-between items-center w-full text-white font-medium py-1.5"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        hoverColor="transparent"
      >
        {title}
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""
            }`}
        />
      </AnimatedButton>
      <ul
        className={`list-none overflow-hidden transition-[max-height] duration-500 ease-out ${isOpen ? "max-h-96" : "max-h-0"
          } leading-tight font-light`}
      >
        {links.map((linkText, linkIndex) => (
          <li key={linkIndex} className="py-3 px-3 w-full">
            <Link href="#" className="cursor-pointer hover:underline">
              {linkText}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
