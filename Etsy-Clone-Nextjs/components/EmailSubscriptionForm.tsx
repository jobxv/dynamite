"use client";
import React, { useState } from "react";
import { GlobeOnHandIcon } from "./Icons";

const EmailSubscriptionForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted email:", email);
    // setEmail('');
  };

  return (
    <>
      <div className="flex justify-center bg-[#ccebff] pt-9 px-6 md:pb-5">
        <div className="w-full ">
          <p className="text-center text-base mt-0 mb-4">
            Yes! Send me exclusive offers, unique gift ideas, and personalized
            tips for shopping and selling on Dynamite.
          </p>
          <form onSubmit={handleSubmit} className="m-0 h-[98px]">
            <div className="flex justify-center group ">
              <label htmlFor="email-list-email" className="sr-only">
                Enter Your email
              </label>
              <input
                className="h-12 w-full sm:w-[25rem] pl-5 border border-gray-300 border-r-0 bg-white rounded-l-[24px] font-sans text-base
                  focus:outline-none! focus:ring-2! focus:ring-offset-3! focus:ring-[#3b67d9]! focus:ring-offset-white! focus-visible:outline-none!"
                type="email"
                name="email-list-email"
                placeholder="Enter Your email"
                id="email-list-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="
                  py-3 px-[15px] pr-[21px] h-12 border border-gray-300
                  border-l-0 rounded-r-[24px] bg-white text-base font-normal
                  transition-colors duration-100 cursor-pointer 
                  hover:bg-black hover:text-white hover:font-medium 
                  group-focus-within:bg-black group-focus-within:text-white group-focus-within:font-medium
                "
                type="submit"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <RenewableEnergyBadge />
    </>
  );
};

export default EmailSubscriptionForm;

const RenewableEnergyBadge = () => {
  return (
    <div className="flex justify-evenly py-6 bg-[#3b67d9] cursor-help group">
      <div
        className="relative flex flex-col sm:flex-row gap-2 items-center border-none fill-white text-white bg-transparent cursor-help"
        aria-describedby="renewable-explanation"
      >
        <GlobeOnHandIcon />
        <span className="underline decoration-dashed underline-offset-2 ">
          Dynamite is powered by 100% renewable electricity.
        </span>

        <div
          role="tooltip"
          className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 hover:opacity-100 group-hover:opacity-100 
          opacity-0 pointer-events-none w-64 p-3 bg-white text-gray-800 text-xs rounded shadow-lg cursor-default text-center"
        >
          Dynamite&apos;s 100% renewable electricity commitment includes the electricity
          used by the data centers that host Dynamite.com, the Sell on Dynamite app, and
          the Dynamite app, as well as the electricity that powers Dynamite&apos;s global
          offices and employees working remotely from home in the US.
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -mb-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white"></div>
        </div>
      </div>
    </div>
  );
};
