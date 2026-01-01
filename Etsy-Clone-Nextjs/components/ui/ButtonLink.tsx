import clsx from "clsx";
import Link from "next/link";
import React from "react";
// Assuming Link is imported from your routing library (e.g., next/link)

interface ButtonLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  outline?: boolean;
  small?: boolean;
  btnClassName?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const ButtonLink = ({
  children,
  onClick,
  href,
  outline,
  small,
  btnClassName,
  className,
  ...props
}: ButtonLinkProps) => {

  const buttonClasses = clsx(
    !btnClassName?.includes("text-") ? (outline ? "text-black" : "text-white") : "",
    !btnClassName?.includes("cursor-") && "cursor-pointer",
    small ? "text-xsm py-2 px-6" : "text-base py-3 px-4.5",
    "rounded-full relative flex items-center justify-center group z-0",
    btnClassName
  );

  const scaleClasses = clsx(
    outline
      ? [
        !className?.includes("bg-") && "bg-transparent",
        !className?.includes("border-") && "border-black border",
      ]
      : [!className?.includes("bg-") && "bg-primary"],
    small ? "group-hover:scale-105" : "group-hover:scale-102",
    !className?.includes("shadow-") && "group-hover:shadow-full",
    `absolute inset-0 rounded-full transition-all -z-1 duration-200 pointer-events-none`,
    className
  );

  const ScaleSpan = () => <span className={scaleClasses} />;

  return (
    <>
      {!href && (
        <button onClick={onClick} className={buttonClasses} {...props}>
          <ScaleSpan />
          {children}
        </button>
      )}
      {href && (
        <Link href={href} className={buttonClasses}>
          <ScaleSpan />
          {children}
        </Link>
      )}
    </>
  );
};
export default ButtonLink;
