import { useAppStore } from "@/store/store";
import { useEffect } from "react";

export const useCart = () => {
  const cartItems = useAppStore((state) => state.cartItems);
  const cartItemsAmount = useAppStore((state) => state.cartItemsAmount);
  const isLoadingCart = useAppStore((state) => state.isLoadingCart);
  const error = useAppStore((state) => state.error);
  const fetchCart = useAppStore((state) => state.fetchCart);
  const addItemToCart = useAppStore((state) => state.addItemToCart);
  const totalPrice = cartItems
    ? cartItems.reduce(
        (accumulator, item) => accumulator + parseFloat(item.price),
        0
      )
    : 0;

  useEffect(() => {
    fetchCart();
  }, []);

  return {
    cartItems,
    cartItemsAmount,
    isLoadingCart,
    error,
    fetchCart,
    addItemToCart,
    totalPrice,
  };
};

export default useCart;
