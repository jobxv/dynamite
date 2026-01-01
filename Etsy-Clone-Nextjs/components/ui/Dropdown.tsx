import React, { useEffect, useRef, useState } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import clsx from "clsx";
import { FaCaretDown } from "react-icons/fa";
import { TickIcon } from "../Icons";

interface DropdownProps {
  buttonContent: React.ReactNode;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}
const DropDownItems = ({
  options,
  onSelect,
  selectedOption,
}: {
  options: string[];
  onSelect: (option: string) => void;
  selectedOption: string;
}) => {
  return (
    <div className="py-1 absolute z-40 top-0 w-full" role="none">
      <span className="min-h-7 w-full block py-1"> &nbsp;</span>
      <span className="absolute inset-0 bg-white -z-10 shadow-full rounded-xl"></span>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`flex justify-between items-center w-full text-left px-4 py-3 text-xsm ${
            selectedOption === option
              ? "outline-2 outline-[#3b67d9]"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          } rounded cursor-pointer text-nowrap w-fit`}
          role="menuitem"
        >
          {option}
          {selectedOption === option && (
            <TickIcon className="ml-2 inline-block h-4 w-4" />
          )}
        </button>
      ))}
    </div>
  );
};
const Dropdown = ({
  buttonContent,
  selectedOption,
  options,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={`relative min-w-[250px] justify-end items-end flex z-40`}
      ref={dropdownRef}
    >
      <span className="z-100">
        <ButtonLink
          onClick={toggleDropdown}
          className={`py-2 gap-5 z-100 ${
            isOpen ? " border-none shadow-none" : ""
          }`}
          small
          outline
        >
          {buttonContent}
          <div className="-mr-2 flex items-center pointer-events-none">
            <FaCaretDown size={13} />
          </div>
        </ButtonLink>
      </span>
      <div
        className={clsx(
          "absolute -top-1 left-0 w-full transition-all duration-200 transform z-20",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto translate-y-1"
            : "opacity-0 scale-95 pointer-events-none -translate-y-2"
        )}
      >
        <DropDownItems
          options={options}
          onSelect={(option) => {
            onSelect(option);
            setIsOpen(false);
          }}
          selectedOption={selectedOption}
        />
      </div>
    </div>
  );
};
export default Dropdown;
