"use client";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = ({ onChange, value, active, setActive }: { onChange: (val: string) => void, value: string, active: boolean, setActive: (active: boolean) => void }) => {

  return (
    <div className="flex items-center justify-center h-fit group flex-1">
      <input
        type="search"
        name="search"
        id="search"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="bg-white  border-t-2 border-l-2 border-b-2 border-gray-600 rounded-l-full py-2 pl-4.5 sm:pr-11 h-12 w-full 
        focus:outline-none! focus:ring-2! focus:ring-offset-2! focus:ring-[#3b67d9]! focus:ring-offset-white! focus-visible:outline-none!"
        placeholder="Search for anything"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        autoComplete="off"
      />
      <button className="text-white rounded-r-full border-2 border-l-0 -ml-[1px] border-gray-600 flex items-center justify-center size-12">
        <div
          className={`p-1 rounded-full flex items-center justify-center cursor-pointer ${active
              ? "bg-primary rounded-l-none size-11"
              : "bg-primary group-hover:bg-primary-dark group-hover:rounded-l-none group-focus:rounded-l-none group-hover:size-11"
            } transition-all duration-200`}
        >
          <IoSearchOutline className="size-7" />
        </div>
      </button>
    </div>
  );
};

export default SearchInput;
