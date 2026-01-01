"use client";
import { productData } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Rating } from "./ImagesView";
import ButtonLink from "../ui/ButtonLink";
import AnimatedButton from "../ui/AnimatedButton";
import { Calendar, Package, MapPin, Heart, ChevronDown } from "lucide-react";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { HandShake, HandWave, Leaf, PartyHat, TickIcon } from "../Icons";
import { TbTruckDelivery } from "react-icons/tb";
import { MdEdit } from "react-icons/md";
import { Product, SellerInfo } from "@/data/types";
import useCart from "@/hooks/useCart";

const SideDetails = ({
  product: product,
  sellerInfo,
}: {
  product: Product;
  sellerInfo: SellerInfo;
}) => {
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isDidYouKnowOpen, setIsDidYouKnowOpen] = useState(false);
  const [isSellerOpen, setIsSellerOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart, fetchCart } = useCart();
  function onAddToCart() {
    addItemToCart(product.id, quantity);
  }

  return (
    <div className=" space-y-6">
      <div>
        <h2 className="text-2xl font-medium">USD {product.price}+</h2>
        <p className="text-sm text-gray-600">
          Local taxes included (where applicable)
        </p>
      </div>

      <h1 className="">{product.title}</h1>

      <div className="flex items-center space-x-1">
        <Link href="#" className="text-xsm font-medium hover:underline!">
          {sellerInfo.username}
        </Link>
        {sellerInfo.rating && <Rating rating={sellerInfo.rating} />}
      </div>

      <div className="flex items-center text-sm">
        <TickIcon className="w-4 h-4 mr-1 text-green-600" />
        <span>Returns & exchanges accepted</span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center">
            <label htmlFor="version" className="block font-medium">
              Version
            </label>
            <span className="text-red-500 ml-1">*</span>
          </div>
          <div className="relative mt-1">
            <select
              id="version"
              className="block w-full p-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#1967d2]"
              required
            >
              <option value="">Select an option</option>
              <option value="1">Standard</option>
              <option value="2">Glossy</option>
              <option value="3">Matte</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="quantity" className="block font-medium">
            Quantity
          </label>
          <div className="relative mt-1">
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="block w-full p-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#1967d2]"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <ButtonLink btnClassName="w-full hover:scale-" onClick={onAddToCart}>
          Add to cart
        </ButtonLink>
      </div>
      {/* Item Details Section */}
      <div className="">
        <AnimatedButton
          className="w-full flex justify-between items-center py-1.5"
          onClick={() => setIsItemDetailsOpen(!isItemDetailsOpen)}
        >
          <h3 className="font-medium">Item details</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${isItemDetailsOpen ? "rotate-180" : ""
              }`}
          />
        </AnimatedButton>

        {isItemDetailsOpen && (
          <div className="py-4 space-y-6 px-4">
            <div className="space-y-3">
              <h4 className="font-medium">Highlights</h4>

              <div className="flex items-center gap-3">
                <span className="text-gray-700 size-6">
                  <HandWave />
                </span>
                <span>
                  Made by{" "}
                  <span className="font-medium">{sellerInfo.username}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-700 size-6">
                  <PartyHat />
                </span>
                <span>Party decor for gatherings and celebrations</span>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-gray-700 size-6">
                  <TfiRulerAlt2 className="size-5" />
                </span>
                <div>
                  <div>Width: 9.1 centimeters</div>
                  <div>Height: 13 centimeters</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {productData[0].itemDetails?.additionalDetail}
            </div>

            <button className="text-center w-full py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              Learn more about this item
            </button>
          </div>
        )}
      </div>

      {/* Shipping and Return Policies */}
      <div className="">
        <AnimatedButton
          className="w-full flex justify-between items-center py-1.5"
          onClick={() => setIsShippingOpen(!isShippingOpen)}
        >
          <h3 className="font-medium">Shipping and return policies</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${isShippingOpen ? "rotate-180" : ""
              }`}
          />
        </AnimatedButton>

        {isShippingOpen && (
          <div className="py-4 space-y-4 px-4">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <span>Order today to get by </span>
                <span className="font-medium underline underline-offset-4 decoration-dashed! ">
                  {productData[0].shippingInfo.estimatedDelivery}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Package className="w-5 h-5 mt-0.5 flex-shrink-0" />

              <div>
                <span className="underline decoration-dashed! underline-offset-4 font-medium">
                  Returns & exchanges accepted
                </span>
                <span> within 14 days</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <TbTruckDelivery className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <span>Cost to ship: </span>
                <span className="font-medium">
                  USD {productData[0].shippingInfo.cost}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <span>Ships from: </span>
                <span className="font-medium">
                  {productData[0].shippingInfo.countryFrom}
                </span>
              </div>
            </div>

            <AnimatedButton className="flex items-center gap-2 text-sm -ml-1">
              <span>Deliver to Ethiopia</span>
              <MdEdit className="size-4" />
            </AnimatedButton>
          </div>
        )}
      </div>

      {/* Did you know? Section */}
      <div className="">
        <AnimatedButton
          className="w-full flex justify-between items-center py-1.5"
          onClick={() => setIsDidYouKnowOpen(!isDidYouKnowOpen)}
        >
          <h3 className="font-medium">Did you know?</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${isDidYouKnowOpen ? "rotate-180" : ""
              }`}
          />
        </AnimatedButton>

        {isDidYouKnowOpen && (
          <div className="py-4 space-y-4 px-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center">
                <HandShake />
              </div>
              <div>
                <p className="font-medium">Dynamite Purchase Protection</p>
                <p className="text-sm">
                  Shop confidently on Dynamite knowing if something goes wrong with
                  an order, we&apos;ve got your back for all eligible purchases
                  —{" "}
                  <Link href="#" className="underline!">
                    see program terms
                  </Link>
                </p>
              </div>
            </div>

            <div className="bg-[#ccebff] p-3 rounded-md flex items-start space-x-3">
              <span className="size-6 mt-0.5 flex-shrink-0">
                <Leaf />
              </span>
              <p className="text-sm">
                Dynamite offsets carbon emissions from shipping and packaging on
                this purchase.
              </p>
            </div>

            <ButtonLink outline btnClassName="w-full">
              View additional shop policies
            </ButtonLink>
          </div>
        )}
      </div>

      {/* FAQs Section */}
      <FAQData />

      {/* Meet your seller Section */}
      <div className="">
        <AnimatedButton
          className="w-full flex justify-between items-center py-1.5"
          onClick={() => setIsSellerOpen(!isSellerOpen)}
        >
          <h3 className="font-medium">Meet your seller</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${isSellerOpen ? "rotate-180" : ""
              }`}
          />
        </AnimatedButton>

        {isSellerOpen && (
          <div className="py-4 space-y-4 px-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Josephin"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xl font-medium">{sellerInfo.username}</h4>
                <p className="text-sm">
                  Owner of{" "}
                  <Link href="#" className="hover:underline">
                    JarteaDesigns
                  </Link>
                </p>
              </div>
            </div>

            <button className="flex items-center justify-center space-x-2 w-full py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              <Heart className="w-4 h-4" />
              <span>Follow shop</span>
            </button>

            <button className="w-full py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              Message {sellerInfo.username}
            </button>

            <p className="text-sm text-center">
              This seller usually responds{" "}
              <span className="font-medium">within 24 hours</span>.
            </p>

            <Link href="#" className="block text-center text-sm underline">
              View seller details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideDetails;

export const FAQData = () => {
  const [isFaqsOpen, setIsFaqsOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (faqId: string) => {
    if (expandedFaq === faqId) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(faqId);
    }
  };
  return (
    <div className="">
      <AnimatedButton
        className="w-full flex justify-between items-center py-1.5"
        onClick={() => setIsFaqsOpen(!isFaqsOpen)}
      >
        <h3 className="font-medium">FAQs</h3>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isFaqsOpen ? "rotate-180" : ""
            }`}
        />
      </AnimatedButton>

      {isFaqsOpen && (
        <div className="py-4 space-y-2 px-4">
          {/* Missing Items FAQ */}
          <div className="">
            <AnimatedButton
              className="w-full flex justify-between items-center py-2"
              onClick={() => toggleFaq("problem")}
            >
              <span className="text-xsm font-medium text-left">
                There is a problem with my order (e.g. wrong or missing items
                etc.)
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expandedFaq === "problem" ? "rotate-180" : ""
                  }`}
              />
            </AnimatedButton>

            {expandedFaq === "problem" && (
              <div className="py-3 px-2 text-xsm text-gray-600">
                <p>
                  Please contact me and I will be able to send you the missing
                  items!
                </p>
              </div>
            )}
          </div>

          {/* Tracking Status FAQ */}
          <div className="">
            <AnimatedButton
              className="w-full flex justify-between items-center py-2"
              onClick={() => toggleFaq("tracking")}
            >
              <span className="text-xsm font-medium text-left">
                Tracking status &apos;Pre-Transit&apos;
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expandedFaq === "tracking" ? "rotate-180" : ""
                  }`}
              />
            </AnimatedButton>

            {expandedFaq === "tracking" && (
              <div className="py-3 px-2 text-xsm text-gray-600">
                <p>
                  Every order gets free Basis-Tracking. This is a free service
                  offered by Deutsche Post.
                </p>
                <p className="mt-2">
                  Domestic customers (Germany): Your order will be scanned at
                  the first and last sorting center.
                </p>
                <p className="mt-2">
                  International customers: Your order will be scanned at the
                  first sorting center and the last sorting center before
                  forwarded abroad. There will be no further tracking once the
                  letter/parcel leaves Germany.
                </p>
                <p className="mt-2">
                  Sometimes, the envelopes or parcels won&apos;t get scanned at
                  all, which results in the status &apos;Pre-Transit&apos;.
                  Don&apos;t worry, your order is on it&apos;s way to you!
                </p>
              </div>
            )}
          </div>

          {/* Order Never Arrived FAQ */}
          <div className="">
            <AnimatedButton
              className="w-full flex justify-between items-center py-2"
              onClick={() => toggleFaq("never-arrived")}
            >
              <span className="text-xsm font-medium text-left">
                My order never arrived
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expandedFaq === "never-arrived" ? "rotate-180" : ""
                  }`}
              />
            </AnimatedButton>

            {expandedFaq === "never-arrived" && (
              <div className="py-3 px-2 text-xsm text-gray-600">
                <p>
                  I&apos;m sorry if something happened to your order. Sometimes
                  orders take longer to arrive than anticipated. I would kindly
                  ask you to wait 1 week after the estimated delivery date for
                  your order to arrive. If the order still hasn&apos;t arrived,
                  please message me and I can either send the items again or
                  refund your order.
                </p>
                <p className="mt-2 font-semibold">
                  ❗ For US customers: please check your tracking information.
                  Registered mail might need a signature upon delivery. If you
                  were not home at that time, the order will be dropped off at a
                  post office near you. ❗
                </p>
              </div>
            )}
          </div>

          {/* Shipping Times FAQ */}
          <div className="">
            <AnimatedButton
              className="w-full flex justify-between items-center py-2"
              onClick={() => toggleFaq("shipping-times")}
            >
              <span className="text-xsm font-medium text-left">
                Estimated shipping times
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expandedFaq === "shipping-times" ? "rotate-180" : ""
                  }`}
              />
            </AnimatedButton>

            {expandedFaq === "shipping-times" && (
              <div className="py-3 px-2 text-xsm text-gray-600">
                <p>Germany (domestic): 1-3 business days</p>
                <p className="mt-1">
                  Europe: 2-14 business days, depending on the country
                </p>
                <p className="mt-1">Canada: 3-4 Weeks*</p>
                <p className="mt-1">United States: 2-4 Weeks*</p>
                <p className="mt-1">
                  Australia*, New Zealand and Oceania: 3-4 Weeks
                </p>
                <p className="mt-1">Asia Pacific: 3-4 Weeks</p>
              </div>
            )}
          </div>

          {/* Cancellations FAQ */}
          <div className="">
            <AnimatedButton
              className="w-full flex justify-between items-center py-2"
              onClick={() => toggleFaq("cancellations")}
            >
              <span className="text-xsm font-medium text-left">
                Cancellations
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expandedFaq === "cancellations" ? "rotate-180" : ""
                  }`}
              />
            </AnimatedButton>

            {expandedFaq === "cancellations" && (
              <div className="py-3 px-2 text-xsm text-gray-600">
                <p>
                  I will only accept cancelations shortly after the order has
                  been placed. Once the order has been dispatched by me, it can
                  no longer be canceled.
                </p>
              </div>
            )}
          </div>

          {/* Refund Policy FAQ */}
          <div className="">
            <AnimatedButton
              className="w-full flex justify-between items-center py-2"
              onClick={() => toggleFaq("refund-policy")}
            >
              <span className="text-xsm font-medium text-left">
                Refund & Reshipping Policy
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expandedFaq === "refund-policy" ? "rotate-180" : ""
                  }`}
              />
            </AnimatedButton>

            {expandedFaq === "refund-policy" && (
              <div className="py-3 px-2 text-xsm text-gray-600">
                <p className="font-semibold">
                  ❗This policy only applies to orders shipped via registered
                  mail.
                </p>
                <p className="mt-2">
                  If a package is returned due to the customer&apos;s failure to
                  pick it up or reschedule the delivery, the shipping fee is
                  non-refundable, as the shipping service was already provided.
                  A refund will be issued only for the product(s) cost.
                </p>
                <p className="mt-2">
                  If you would like the item to be reshipped, a new shipping fee
                  will apply. Please contact me to arrange reshipment.
                </p>
                <p className="mt-2 font-semibold">
                  ❗All customers are informed to track their USPS shipment and
                  that a signature is required upon delivery via the shipping
                  notification.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
