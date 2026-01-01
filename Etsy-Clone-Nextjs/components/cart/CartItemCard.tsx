"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import { CartItem } from "@/data/types";
import { getImageUrl } from "@/utils/image";
import { addToCart, removeFromCart, updateCart } from "@/app/api";
import useCart from "@/hooks/useCart";
import { toast } from "sonner";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (product: CartItem, quantity: number) => void;
  onDelete: (productId: number) => void;
  isDeleting?: boolean;
  isUpdating?: boolean;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onDelete,
  isDeleting = false,
  isUpdating = false,
}) => {
  const [quantity, setQuantity] = useState(item.cart_quantity);

  useEffect(() => {
    setQuantity(item.cart_quantity);
  }, [item.cart_quantity]);

  //   const fetchCart = useCart();

  return (
    <div className="p-6 rounded-2xl border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 flex-shrink-0 relative">
          <Image
            src={getImageUrl(item.product_image_url) || "/placeholder.svg"}
            alt={item.product_name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-normal mb-2 line-clamp-2">
            {item.product_name}
          </h3>

          {/* Placeholder for Seller Name */}
          <div className="text-sm text-gray-700 mb-2">
            Seller: {item.seller_username}
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              {/* Quantity Select Dropdown */}
              <select
                value={quantity}
                onChange={(e) =>
                  onUpdateQuantity(item, Number(e.target.value))
                }
                className="appearance-none cursor-pointer bg-white border border-gray-300 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                disabled={isUpdating || isDeleting}
              >
                {/* Options for quantity up to stock, or a max of 5 + max stock option */}
                {[
                  ...Array(item.product_stock > 5 ? 5 : item.product_stock),
                ].map((_, index) => (
                  <option
                    key={index + 1}
                    value={index + 1}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </option>
                ))}
                {item.product_stock > 5 && (
                  <option value={item.product_stock}>
                    {item.product_stock} (Max)
                  </option>
                )}
              </select>
              {/* Custom dropdown arrow icon */}
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            {/* Remove Item Button */}
            <ButtonLink
              small
              btnClassName="text-sm border-none"
              className="group-hover:bg-gray-200"
              onClick={() => onDelete(item.product_id)}
              disabled={isUpdating || isDeleting}
            >
              {isDeleting ? "Removing..." : "Remove"}
            </ButtonLink>
          </div>
        </div>
        {/* Item Price Calculation */}
        <div className="flex flex-col items-end gap-1 px-4">
          <span className="font-medium">
            USD {(parseFloat(item.price) * quantity).toFixed(2)}
          </span>
          <span className="text-gray-600 text-sm">
            (USD {parseFloat(item.price).toFixed(2)} each)
          </span>
        </div>
      </div>

      {/* Shipping information */}
      {/* <div className="mt-4 flex items-center">
        <div className="text-sm text-gray-700 flex items-center">
          <span>
            Shipping: [Shipping Cost] (Standard)
          </span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
      </div> */}
    </div>
  );
};

export default CartItemCard;
