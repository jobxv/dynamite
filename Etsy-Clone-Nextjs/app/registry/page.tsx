"use client";
import React, { useState } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import AnimatedButton from "@/components/ui/AnimatedButton";
import Link from "next/link";
import { BookIcon, PaintBrushIcon, PotIcon, QuestionsIcon } from "@/components/Icons";
const registryData = [
  {
    image: "/wedding-banner.png",
    title: "Wedding Registry",
    text: "Start your new life together with personalized pieces, well-crafted housewares, and more.",
  },
  {
    image: "/baby-banner.png",
    title: "Baby Registry",
    text: "Welcome your little one to the world with custom items and the cutest, cuddliest creations.",
  },
  {
    image: "/gift-banner.png",
    title: "Gift Registry",
    text: "Celebrate any occasion with a wishlist of incredible items for every budget—straight from independent sellers.",
  },
];
const resons = [
  {
    icon: <PaintBrushIcon />,
    title: "Finds for every occasion",
    text: "Get something special for any occasion! From weddings to new babies, holidays to housewarming parties, discover gifts for every style and every budget.",
  },
  {
    icon: <PotIcon />,
    title: "Plenty of unique presents",
    text: "From personalized pieces to custom creations, the independent sellers on Dynamite make it easy to find extraordinary gifts.",
  },
  {
    icon: <BookIcon />,
    title: "Tips and inspiration",
    text: "Our experts will spark some fresh ideas for your registry with new trends, gifting roundups, and more.",
  },
];
const FAQData = [
  {
    id: "1",
    question: "How do I add items to an Dynamite registry?",
    answer:
      "The process for adding items to your Dynamite Registry is simple, and it's the same no matter if you're adding gifts to your Wedding, Baby, or Gift registry. When you find an item you'd like to add to your registry, click the icon that looks like a gift or click the 'Add to registry' button. You'll find this button just below the 'Add to cart' button, but only if you've already created an Dynamite Registry. Personalizing your registry gifts is easy, too. Any specific customization or personalization details you request before adding items to your registry will be pulled through and saved to your registry as well. You can also add customizations right from your registry page, too. Note, you can only create one of each type of registry.",
  },
  {
    id: "2",
    question: "How do I find an Dynamite registry?",
    answer:
      "To find an Dynamite Registry, simply click on “Find a registry” at the top of this page. This will direct you to a search page, where you can enter the names of your friends, family, and loved ones to find the registry they've created. Once you find the names you're looking for, simply click on that result and you'll be taken to their Dynamite Registry, where you can browse the gifts they've selected and buy them something special!",
  },
  {
    id: "3",
    question: "How do I access my registry?",
    answer:
      "To access your Dynamite Registry, scroll to the top of the page and click on your account picture. You will be presented with a dropdown, and in that dropdown you'll see Dynamite Registry next to an icon of a gift. Click on Dynamite Registry to access your registry page, where you can add gifts, share your registry with friends, family, and loved ones, and more.",
  },
  {
    id: "4",
    question: "Is an Dynamite Registry free?",
    answer: "Yes! Creating an Dynamite Registry is totally free of charge.",
  },
  {
    id: "5",
    question: "What can you register for on Etsy?",
    answer:
      "The possibilities are endless for Dynamite Registry! If you're getting married, create an Dynamite wedding registry and fill it with items like personalized gifts, housewares, and more. If you're expecting parents ready to welcome a new child, you can create an Dynamite baby registry and add personalized presents, toys, nursery decor, and more. And you can celebrate occasions like birthdays, new homes, and anniversaries with special presents by creating an Dynamite gift registry. No matter what kind of Dynamite Registry you create, you'll be able to fill it with extraordinary items straight from independent sellers.",
  },
];
const page = () => {
  return (
    <div className="">
      <div className="bg-[#1a3b38] text-white py-15 space-y-10">
        <div className="flex flex-col items-center justify-center gap-4 ">
          <h1
            className={`font-g md:text-[42px] sm:text-3xl text-xl font-light text-center`}
          >
            Dynamite Registry
          </h1>
          <p className="text-center sm:text-lg font-medium">
            Make every milestone meaningful with extra-special gifts.
          </p>
          <ButtonLink
            outline
            btnClassName={"text-white"}
            className="border-white border"
          >
            Find a registry
            <ArrowRight size={18} className="ml-3" />
          </ButtonLink>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1200] gap-5 justify-between md:px-5 sm:px-10 px-2 mx-auto flex-col md:flex-row">
          {registryData.map((item, index) => (
            <RegistryCard
              key={index}
              image={item.image}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row h-fit bg-[#fffbd8] lg:pl-3">
        <div
          className="md:w-1/2 md:h-[600] sm:h-[400] h-[300]"
          style={{
            backgroundImage: `url(${"/registry-bg.png"})`,
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="md:w-1/2 lg:py-15 py-8 lg:px-20 px-15 gap-5 flex flex-col lg:h-[600]">
          <h3
            className={`text-center text-3xl font-light font-g`}
          >
            Reasons to love Dynamite Registry
          </h3>
          <div className="flex flex-col lg:gap-10 gap-5 h-full">
            {resons.map((item, index) => (
              <div
                className="flex flex-col items-center justify-center md:flex-row"
                key={index}
              >
                <span className="size-20 m-3 mr-6 flex fill-[#2f766d] ">
                  {item.icon}
                </span>
                <div className="">
                  <h4 className="text-lg font-medium mb-1 text-center md:text-left">
                    {item.title}
                  </h4>
                  <p className="text-base font-light leading-6.5 text-gray-600 text-center md:text-left">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 pt-10 max-w">
        <div className="bg-[#eaeaea] fill-gray-800 rounded-full p-5 flex size-fit">
          <QuestionsIcon />
        </div>
        <h3
          className={`text-center text-2xl font-light pb-2 font-g`}
        >
          Questions? We&apos;ve got answers
        </h3>
        {FAQData.map((faq) => (
          <React.Fragment key={faq.id}>
            <FAQCard {...faq} />
            <div className="border-t border-gray-200 px-30 w-[97%]"></div>
          </React.Fragment>
        ))}
        <div className="md:pt-10 pt-5 font-medium text-lg">
          Still have questions? Visit our{" "}
          <Link className="underline!" href="#">
            registry help center
          </Link>
        </div>
      </div>
    </div>
  );
};

const FAQCard = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full">
      <AnimatedButton
        className="w-full flex justify-between items-center py-1.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""
            }`}
        />
      </AnimatedButton>

      {
        <div
          className={`space-y-4 px-4 ${isOpen ? "max-h-200 pt-4" : "max-h-0"
            } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <p className="text-base font-light leading-6.5">{answer}</p>
        </div>
      }
    </div>
  );
};

const RegistryCard = ({
  image,
  title,
  text,
}: {
  image: string;
  title: string;
  text: string;
}) => {
  return (
    <div className="bg-white rounded-md overflow-hidden grid grid-cols-1 content-start h-full">
      <div className="relative w-full h-full min-h-[100]">
        <Image src={image} alt={"text"} fill className=" object-cover" />
      </div>
      <div className="p-3 flex flex-col gap-2 text-black text-center">
        <h4
          className={`text-2xl font-g font-light text-center`}
        >
          {title}
        </h4>
        <p className="text-[13px] text-gray-600">{text}</p>
        {/* <div className="grid-item col-span-1 mt-2 px-2">
          <div>
            <p
              className={`text-2xl font-g font-light text-center`}
            >
              <a className="text--600 hover:underline">Wedding Registry</a>
            </p>
            <p className="text-sm text-gray-600 text-center">
              Start your new life together with personalized pieces,
              well-crafted housewares, and more.
            </p>
          </div>
        </div> */}
        <div className="w-full flex justify-center lg:px-10 px-5 py-2 pb-5">
          <ButtonLink outline className="w-full flex-1" small>
            Get Started
          </ButtonLink>
        </div>
        {/* <div className="mt-2 mb-2 col-span-1 w-8/12 md:w-6/12 lg:w-9/12 mx-auto">
          <button
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" // Standard Tailwind button styling
          >
            Get started
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default page;
