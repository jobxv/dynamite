"use client";
import Link from "next/link";
import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverColor?: string;
  ref?: React.RefObject<HTMLButtonElement | null>;
}

const AnimatedButton = ({
  children,
  onClick,
  className,
  hoverColor,
  ref
}: ButtonProps) => {
  return (
    <button
      className={`relative overflow-hidden cursor-pointer group rounded-full after:z-10 p-2 px-3 flex items-center justify-center h-fit ${className?.includes("w-") ? className : "w-fit"} focus-visible:outline-[#8ca6e9] focus:outline-[#8ca6e9]`}
      onClick={onClick}
      ref={ref}
    >
      <span
        className={`absolute inset-0 cursor-pointer ${
          hoverColor ? `bg-[#${hoverColor}]` : "bg-gray-100"
        } rounded-full scale-40 opacity-0  group-hover:scale-150 group-hover:opacity-100 transition-all duration-400 ease-out `}
      ></span>
      <span className={`relative z-10 self-center ${className}`}>{children}</span>
    </button>
  );
};

export default AnimatedButton;

export const AnimatedLink = ({
  children,
  className,
  hoverColor,
  href,
}: ButtonProps & { href: string }) => {
  return (
    <Link
      href={href}
      className={`relative overflow-hidden cursor-pointer group rounded-full after:z-10 p-2 px-3 ${
        className ?? ""
      }`}
    >
      <span
        className={`absolute inset-0 cursor-pointer ${
          hoverColor ? `bg-[#${hoverColor}]` : "bg-gray-100"
        } rounded-full scale-40 opacity-0  group-hover:scale-150 group-hover:opacity-100 transition-all duration-400 ease-out`}
      ></span>
      <span className={`relative z-10 ${className}`}>{children}</span>
    </Link>
  );
};

