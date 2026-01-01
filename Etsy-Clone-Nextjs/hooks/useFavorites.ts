"use client";
import { useEffect, useCallback } from "react";
import { useAppStore } from "@/store/store";
import { DiscProduct } from "@/data/types";

type FavoritesData = DiscProduct[];

interface UseFavoritesHook {
  favorites: FavoritesData;
  isLoading: boolean;
  error: string | null;
  addFavorite: (productId: number) => Promise<void>;
  removeFavorite: (productId: number) => Promise<void>;
  isFavorite: (productId: number) => boolean;
}

const useFavorites = (): UseFavoritesHook => {
  const favorites = useAppStore((state) => state.favorites);
  const isLoadingFavorites = useAppStore((state) => state.isLoadingFavorites);

  const storeError = useAppStore((state) => state.error);
  const isAuthenticatedState = useAppStore(
    (state) => state.isAuthenticatedState
  );

  const fetchFavorites = useAppStore((state) => state.fetchFavorites);
  const addFavoriteAction = useAppStore((state) => state.addFavorite);
  const removeFavoriteAction = useAppStore((state) => state.removeFavorite);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites, isAuthenticatedState]);

  const addFavorite = useCallback(
    async (productId: number) => {
      await addFavoriteAction(productId);
    },
    [addFavoriteAction]
  );

  const removeFavorite = useCallback(
    async (productId: number) => {
      await removeFavoriteAction(productId);
    },
    [removeFavoriteAction]
  );

  const isFavorite = useCallback(
    (productId: number): boolean => {
      return favorites.some((item) => item.id === productId);
    },
    [favorites]
  );

  return {
    favorites,
    isLoading: isLoadingFavorites,
    error: storeError,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};

export default useFavorites;
