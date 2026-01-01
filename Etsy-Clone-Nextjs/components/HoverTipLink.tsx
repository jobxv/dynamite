import React from "react";
import { ButtonProps } from "./ui/AnimatedButton";
import Link from "next/link";

const HoverTipLink = ({
  children,
  className,
  tip,
  badge,
  href,
  onClick,
}: ButtonProps & { tip: string; badge?: string | number; href?: string }) => {
  const badgeDisplay = badge === undefined ? 0 : parseInt(badge.toString());
  return (
    <div className="relative group inline-block z-0" {...onClick}>
      {href ? (
        <Link
          href={href}
          className={`block relative size-fit aspect-square overflow-hidden cursor-pointer group-hover:z-20 rounded-full after:z-10 p-3 focus-visible:outline-[#8ca6e9] focus:outline-[#8ca6e9] ${
            className ?? ""
          }`}
        >
          <span
            className="absolute inset-0 bg-[#ccebff] rounded-full scale-40 opacity-0 
                 group-hover:scale-150 group-hover:opacity-100 transition-all duration-400 ease-out"
          ></span>
          <span className="relative z-10">{children}</span>
        </Link>
      ) : (
        <div
          className={`block relative size-fit aspect-square overflow-hidden cursor-pointer group-hover:z-20 rounded-full after:z-10 p-3 focus-visible:outline-[#8ca6e9] focus:outline-[#8ca6e9] ${
            className ?? ""
          }`}
        >
          <span
            className="absolute inset-0 bg-[#ccebff] rounded-full scale-40 opacity-0 
                 group-hover:scale-150 group-hover:opacity-100 transition-all duration-400 ease-out"
          ></span>
          <span className="relative z-10">{children}</span>
        </div>
      )}
      {badgeDisplay > 0 && (
        <span
          className={`absolute right-1 top-1 ${
            badgeDisplay.toString().length > 1 ? "" : "w-4 h-4"
          } rounded-[7] bg-orange-600 flex items-center justify-center z-20 group-hover:bg-[#122868] text-white transition-all duration-100 text-[11px]`}
        >
          {badge}
        </span>
      )}

      <div
        className="absolute top-full left-1/2 -translate-x-1/2 translate-y-2 p-3 text-sm text-white
               bg-[#102c6d] rounded shadow-lg opacity-0 group-hover:opacity-100
               transition-opacity duration-300 pointer-events-none"
      >
        {tip}
        <div className="absolute bottom-full z-20 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 bg-[#122868] rotate-45"></div>
      </div>
    </div>
  );
};

export default HoverTipLink;
