"use client";

import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { LuHeartHandshake } from "react-icons/lu";
import { AiFillTag } from "react-icons/ai";
import { FaLeaf } from "react-icons/fa";
import CartItemCard from "@/components/cart/CartItemCard";
import ButtonLink from "@/components/ui/ButtonLink";
import {
  GooglePayIcon,
  MastercardIcon,
  PaypalIcon,
  VisaIcon,
} from "@/components/Icons";
import { toast } from "sonner";
import { removeFromCart, updateCart } from "../api";
import { CartItem, OrderData } from "@/data/types";

import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import useProducts from "@/hooks/useProducts";
import { getImageUrl } from "@/utils/image";
import { CheckoutDialog } from "@/components/cart/CheckoutDialog";
import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
export const paymentIcons = {
  visa: (
    <div className="space-x-2 h-full  flex items-center">
      <VisaIcon />
      <MastercardIcon />
    </div>
  ),
  paypal: (
    <div className="flex items-center">
      <PaypalIcon />
    </div>
  ),
  googlePay: (
    <div className="flex items-center">
      <GooglePayIcon />
    </div>
  ),
};

interface PaymentOptionProps {
  id: string;
  name: string;
  logo: React.ReactNode;
  selected: boolean;
  onSelect: (id: string) => void;
}

/**
 * Represents a single payment option with a radio button and logo.
 */
const PaymentOption: React.FC<PaymentOptionProps> = ({
  id,
  name,
  logo,
  selected,
  onSelect,
}) => {
  return (
    <div className="flex items-center mb-2">
      <div
        className={`size-7 rounded-full border flex items-center justify-center cursor-pointer ${selected ? "bg-gray-500" : "bg-white"
          }`}
        aria-label={name}
        onClick={() => onSelect(id)}
      >
        {selected && <div className="size-3 bg-white rounded-full"></div>}
      </div>
      <div className="ml-2 h-full">{logo}</div>
    </div>
  );
};

/**
 * The main component for displaying the user's shopping cart.
 */
export default function CartPage() {
  const { cartItems, isLoadingCart, error, fetchCart, addItemToCart } =
    useCart();

  const { products } = useProducts();

  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [isGift, setIsGift] = useState(false);
  const shipTo = "Ethiopia";
  const { isAuthenticatedState } = useAppStore();
  if (!isAuthenticatedState) window.location.href = "/";
  else console.log("user authenticated");

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.product_stock) {
      toast.error(
        `Cannot add more than available stock (${item.product_stock})`
      );
      return;
    }

    setIsUpdating(true);

    const result = await updateCart(item.product_id, newQuantity);
    setIsUpdating(false);
    console.log("Update result:", result);

    if (result.success) {
      fetchCart();
    } else {
      alert(`Failed to update quantity: ${result.data.message}`);
    }
  };

  const handleDeleteItem = async (product_id: number) => {
    setIsDeleting(true);

    console.log("Deleting item with ID:", product_id);

    const result = await removeFromCart(product_id);
    setIsDeleting(false);

    if (result.success) {
      toast.success("Item removed from cart");
      fetchCart();
    } else {
      alert(`Failed to delete item: ${result.error}`);
    }
  };

  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.cart_quantity,
    0
  );

  const subtotal = itemsTotal;
  const shipping = 0;
  const total = subtotal + shipping;

  const canCompletePayment = cartItems.length > 0;
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);

  if (isLoadingCart) {
    return <div className="max-w mx-auto px-4 py-8">Loading cart...</div>;
  }

  if (error) {
    return (
      <div className="max-w mx-auto px-4 py-8 text-red-600">
        Error loading cart: {error}
      </div>
    );
  }

  return (
    <div className="max-w mx-auto px-4 py-8">
      <CheckoutDialog
        open={isCheckoutDialogOpen}
        onOpenChange={setIsCheckoutDialogOpen}
      />
      <h1 className="text-2xl font-medium mb-6">Your cart</h1>
      <div className="flex">
        <ButtonLink href="/my-orders">Purchased Products</ButtonLink>
      </div>

      {/* Purchase Protection Banner */}
      <div className="flex items-start gap-3 mb-6 py-4 bg-white rounded-md">
        <div className="flex-shrink-0 mt-1">
          <LuHeartHandshake size={40} className="fill-[#d7e6f5]" />
        </div>
        <div>
          <p className="font-light">
            <span className="font-medium">Buy confidently</span> with
            Dynamite&apos;s Purchase Protection program for buyers, get a full
            refund in the rare case your item doesn&apos;t arrive, arrives
            damaged, or isn&apos;t as described.
            <Link href="/purchase-protection" className="underline!">
              See eligibility
            </Link>
          </p>
        </div>
      </div>

      {/* Cart Items and Summary Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="lg:w-2/3 flex flex-col gap-8">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-600">Your cart is empty.</div>
          ) : (
            cartItems.map((item) => (
              <CartItemCard
                key={item.product_id}
                item={item}
                onUpdateQuantity={(item: CartItem, quantity: number) => {
                  handleQuantityChange(item, quantity);
                }}
                onDelete={handleDeleteItem}
              />
            ))
          )}

          {/* Carbon Offset Info */}
          <div className="flex items-center gap-2 mt-6 text-sm">
            <FaLeaf size={16} />
            <span>Dynamite offsets carbon emissions from every delivery</span>
          </div>

          <h2 className="text-2xl md:text-5xl mt-20 font-bold">
            Browse More Prodcts
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.slice(0, 3).map((pr) => (
              <div
                key={pr.id}
                className="group relative flex flex-col rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                {/* Product Image Container */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={getImageUrl(pr.images[0])}
                    alt={pr.title}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Quick add to cart button (appears on hover) */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addItemToCart(pr.id);
                    }}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-sm font-medium py-2 px-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-50 whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                    {pr.title}
                  </h3>
                  <div className="mt-auto pt-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addItemToCart(pr.id);
                      }}
                      className="w-full py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors md:hidden"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary and Payment */}
        <div className="lg:w-1/3">
          <div
            className={clsx(
              "border border-gray-200 rounded-md p-6",
              !canCompletePayment && "opacity-70 pointer-events-none"
            )}
          >
            <h2 className="text-lg font-medium mb-4">How you&apos;ll pay</h2>

            {/* Payment Options */}
            <div className="mb-6">
              <PaymentOption
                id="visa"
                name="Visa"
                logo={paymentIcons.visa}
                selected={selectedPayment === "visa"}
                onSelect={setSelectedPayment}
              />
              <PaymentOption
                id="paypal"
                name="PayPal"
                logo={paymentIcons.paypal}
                selected={selectedPayment === "paypal"}
                onSelect={setSelectedPayment}
              />
              <PaymentOption
                id="googlePay"
                name="Google Pay"
                logo={paymentIcons.googlePay}
                selected={selectedPayment === "googlePay"}
                onSelect={setSelectedPayment}
              />
            </div>

            {/* Order Totals */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Item(s) total</span>
                <span>USD {itemsTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>USD {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <div>
                  <span className="text-gray-600">Shipping</span>
                  <div className="text-xs text-gray-500">
                    (To <span className="underline">{shipTo}</span>)
                  </div>
                </div>
                <span>USD {shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200 font-medium">
                <span>Total ({cartItems.length} items)</span>{" "}
                {/* Display actual item count */}
                <span>USD {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Gift Option */}
            <div className="flex items-center mb-6">
              <div
                className={`w-5 h-5 border ${isGift ? "bg-white" : "bg-white"
                  } rounded flex items-center justify-center cursor-pointer`}
                onClick={() => setIsGift(!isGift)}
              >
                {isGift && <div className="w-3 h-3 bg-black rounded-sm"></div>}
              </div>
              <label
                className="ml-2 text-sm cursor-pointer"
                onClick={() => setIsGift(!isGift)}
              >
                Mark order as a gift
              </label>
              <Link
                href="/gift-info"
                className="ml-4 text-sm decoration-dashed! underline-offset-3 underline!"
              >
                Learn more
              </Link>
            </div>

            {/* Checkout and Coupon Buttons */}
            <div className="flex flex-col gap-4 pb-5">
              <ButtonLink
                btnClassName={`w-full pointer-events-auto ${!canCompletePayment && "cursor-not-allowed"
                  }`}
                className="bg-gray-500 hover:bg-gray-600"
                disabled={!canCompletePayment}
                onClick={() => setIsCheckoutDialogOpen(true)}
              >
                Proceed to checkout
              </ButtonLink>

              <span>
                <ButtonLink
                  btnClassName={clsx("border-none", "text-black", "gap-5")}
                  className={clsx("bg-gray-200")}
                >
                  <AiFillTag className="text-green-800 size-6" />
                  <span className="text-sm font-medium">Apply coupon code</span>
                </ButtonLink>
              </span>
            </div>

            {/* Tax Information */}
            <div className="text-sm text-gray-600">
              <p>Local taxes included (where applicable)</p>
              <p className="mt-2">
                *{" "}
                <Link href="/tax-info" className="underline">
                  Learn more
                </Link>{" "}
                about additional taxes, duties, and fees that may apply
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
