import { create } from "zustand";
import axios from "axios";

import {
  getMe,
  getAllProducts,
  getCategories,
  getCart,
  addToCart,
  isAuthenticated,
  removeAuthTokenCookie,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  ApiResponse,
  SignInPayload,
  signIn,
} from "@/app/api";

import { Category, Product, User, CartItem, DiscProduct } from "@/data/types";
import { toast } from "sonner";

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

interface AppState {
  user: User | null;
  products: Product[];
  categories: Category[];
  cartItems: CartItem[];
  cartItemsAmount: number;
  favorites: DiscProduct[];

  isAuthenticatedState: boolean;
  isAuthenticating: boolean;

  isLoadingUser: boolean;
  isLoadingProducts: boolean;
  isLoadingCategories: boolean;
  isLoadingCart: boolean;
  isLoadingFavorites: boolean;

  error: string | null;
}

interface AppActions {
  fetchUser: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchCart: () => Promise<void>;
  addItemToCart: (productId: number, quantity?: number) => Promise<void>;
  logout: () => void;
  signIn: ({ email, password }: SignInPayload) => Promise<any>;
  checkAuthStatus: () => Promise<void>;

  fetchFavorites: () => Promise<void>;
  addFavorite: (productId: number) => Promise<void>;
  removeFavorite: (productId: number) => Promise<void>;
}

type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>((set, get) => ({
  user: null,
  products: [],
  categories: [],
  cartItems: [],
  cartItemsAmount: 0,
  favorites: [],

  isAuthenticatedState: true,
  isAuthenticating: false,

  isLoadingUser: false,
  isLoadingProducts: false,
  isLoadingCategories: false,
  isLoadingCart: false,
  isLoadingFavorites: false,

  error: null,

  /**
   * Checks the authentication status and updates the store state.
   * This should be called once when the application loads.
   */
  checkAuthStatus: async () => {
    set({ isAuthenticating: true, error: null });
    try {
      const authenticated = await isAuthenticated();
      set({ isAuthenticatedState: authenticated, isAuthenticating: false });

      if (authenticated) {
        await get().fetchUser();
        await get().fetchCart();
        await get().fetchFavorites();
      } else {
        set({ user: null, cartItems: [], cartItemsAmount: 0, favorites: [] });
      }
    } catch (err: any) {
      console.error("Error during authentication check:", err);

      set({
        isAuthenticatedState: false,
        isAuthenticating: false,
        error: "Failed to verify authentication status.",
      });
      removeAuthTokenCookie();
    }
  },

  /**
   * Fetches the current user data.
   * This action now relies on the isAuthenticatedState being true.
   */
  fetchUser: async () => {
    if (!get().isAuthenticatedState) {
      console.log("User not authenticated (store state), skipping user fetch.");
      set({ user: null });
      return;
    }

    set({ isLoadingUser: true, error: null });
    try {
      const response = await getMe();

      if (response && response.success && response.data) {
        set({ user: response.data, isLoadingUser: false });
      } else {
        console.warn(
          "getMe call failed or returned no data, assuming not authenticated."
        );
        set({
          user: null,
          isAuthenticatedState: false,
          isLoadingUser: false,
          error:
            response?.message ||
            response?.error ||
            "Failed to fetch user data.",
        });
        removeAuthTokenCookie();
      }
    } catch (err: any) {
      console.error("Error fetching user:", err);

      set({
        user: null,
        isAuthenticatedState: false,
        error: "Failed to fetch user: " + (err.message || "Unknown error"),
        isLoadingUser: false,
      });

      if (axios.isAxiosError(err) && err.response?.status === 401) {
        removeAuthTokenCookie();
      }
    }
  },

  /**
   * Fetches all products and randomizes them.
   * This action does NOT require authentication.
   */
  fetchProducts: async () => {
    set({ isLoadingProducts: true, error: null });
    try {
      const response = await getAllProducts();

      if (response && response.success && response.data) {
        const randomizedProducts = shuffleArray(response.data);
        set({
          products: randomizedProducts as Product[],
          isLoadingProducts: false,
        });
      } else {
        set({
          error:
            response?.message || response?.error || "Failed to fetch products.",
          isLoadingProducts: false,
        });
      }
    } catch (err: any) {
      console.error("Error fetching products:", err);
      set({
        error: "An error occurred while fetching products.",
        isLoadingProducts: false,
      });
    }
  },

  /**
   * Fetches all categories.
   * This action does NOT require authentication.
   */
  fetchCategories: async () => {
    set({ isLoadingCategories: true, error: null });
    try {
      const response = await getCategories();

      if (response && response.success && response.data) {
        set({ categories: response.data, isLoadingCategories: false });
      } else {
        set({
          error:
            response?.message ||
            response?.error ||
            "Failed to fetch categories.",
          isLoadingCategories: false,
        });
      }
    } catch (err: any) {
      console.error("Error fetching categories:", err);
      set({
        error: "An error occurred while fetching categories.",
        isLoadingCategories: false,
      });
    }
  },

  /**
   * Fetches the user's cart.
   * This action now relies on the isAuthenticatedState being true.
   */
  fetchCart: async () => {
    if (!get().isAuthenticatedState) {
      console.log("User not authenticated (store state), skipping cart fetch.");
      removeAuthTokenCookie();
      set({ cartItems: [], cartItemsAmount: 0 });
      return;
    }

    console.log("User is authenticated (store state), doing cart fetch.");

    set({ isLoadingCart: true, error: null });
    try {
      const response = await getCart();

      if (response && response.success) {
        const cartData = response.data || [];
        set({
          cartItems: cartData,
          cartItemsAmount: cartData.length,
          isLoadingCart: false,
        });
      } else {
        set({
          cartItems: [],
          cartItemsAmount: 0,
          error:
            response?.message || response?.error || "Failed to fetch cart.",
          isLoadingCart: false,
        });
      }
    } catch (err: any) {
      console.error("Error fetching cart:", err);

      set({
        cartItems: [],
        cartItemsAmount: 0,
        error: "An error occurred while fetching cart.",
        isLoadingCart: false,
      });

      if (axios.isAxiosError(err) && err.response?.status === 401) {
        console.warn("fetchCart received 401, updating auth state.");
        set({ isAuthenticatedState: false, user: null });
        removeAuthTokenCookie();
      }
    }
  },

  /**
   * Adds an item to the user's cart.
   * This action now relies on the isAuthenticatedState being true.
   * @param productId - The ID of the product to add.
   * @param quantity - The quantity to add (defaults to 1).
   */
  addItemToCart: async (productId: number, quantity: number = 1) => {
    if (!get().isAuthenticatedState) {
      console.error(
        "User not authenticated (store state), cannot add to cart."
      );
      toast.error("You must be logged in to Add item to cart");
      set({ error: "You must be logged in to add items to the cart." });
      return;
    }

    set({ isLoadingCart: true, error: null });
    try {
      const response = await addToCart(productId, quantity);

      if (response && response.success) {
        console.log("Item added to cart successfully.");
        toast.success("Item added to cart!");
        await get().fetchCart();
      } else {
        toast.error(
          response?.message || response?.error || "Failed to add item to cart."
        );
        set({
          error:
            response?.message ||
            response?.error ||
            "Failed to add item to cart.",
          isLoadingCart: false,
        });
      }
    } catch (err: any) {
      console.error("Error adding item to cart:", err);
      toast.error("An error occurred while adding item to cart.");
      set({
        error: "An error occurred while adding item to cart.",
        isLoadingCart: false,
      });

      if (axios.isAxiosError(err) && err.response?.status === 401) {
        console.warn("addItemToCart received 401, updating auth state.");
        set({ isAuthenticatedState: false, user: null });
        removeAuthTokenCookie();
      }
    }
  },

  /**
   * Fetches the current user's favorite products.
   * Requires authentication.
   */
  fetchFavorites: async () => {
    if (!get().isAuthenticatedState) {
      console.log(
        "User not authenticated (store state), skipping favorites fetch."
      );
      set({ favorites: [] });
      return;
    }

    set({ isLoadingFavorites: true, error: null });
    try {
      const response = await getFavorites();

      if (response && response.success && response.data !== undefined) {
        set({
          favorites: response.data as DiscProduct[],
          isLoadingFavorites: false,
        });
      } else {
        set({
          favorites: [],
          error:
            response?.message ||
            response?.error ||
            "Failed to fetch favorites.",
          isLoadingFavorites: false,
        });
      }
    } catch (err: any) {
      console.error("Error fetching favorites:", err);
      set({
        favorites: [],
        error: "An error occurred while fetching favorites.",
        isLoadingFavorites: false,
      });
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        console.warn("fetchFavorites received 401, updating auth state.");
        set({ isAuthenticatedState: false, user: null });
        removeAuthTokenCookie();
      }
    }
  },

  /**
   * Adds a product to the user's favorites.
   * Requires authentication.
   * @param productId - The ID of the product to add.
   */
  addFavorite: async (productId: number) => {
    if (!get().isAuthenticatedState) {
      console.error(
        "User not authenticated (store state), cannot add to favorites."
      );
      toast.error("You must be logged in to add items to favorites.");
      set({ error: "You must be logged in to add items to favorites." });
      return;
    }

    const currentFavorites = get().favorites;
    const existingFavorite = currentFavorites.find(
      (fav) => fav.id === productId
    );

    if (existingFavorite) {
      console.log(`Product ${productId} is already in favorites.`);
      toast.info("Product is already in your favorites.");
      return;
    }

    const optimisticProduct: DiscProduct = {
      id: productId,
      title: "Adding...",
      image_url: "/placeholder.svg",
      price: 0,
      description: "",
      seller_id: 0,
      stock_quantity: 0,
      category_id: 0,
      created_at: "",
    };

    set((state) => ({
      favorites: [...state.favorites, optimisticProduct],
      isLoadingFavorites: true,
      error: null,
    }));

    try {
      const response = await addToFavorites(productId);

      if (response && response.success) {
        console.log(`Product ${productId} added to favorites successfully.`);
        toast.success("Product added to favorites!");

        await get().fetchFavorites();
      } else {
        console.error(
          `Failed to add product ${productId} to favorites (API error).`
        );
        toast.error(
          response?.message ||
            response?.error ||
            `Failed to add product ${productId} to favorites.`
        );

        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== productId),
          isLoadingFavorites: false,
          error:
            response?.message ||
            response?.error ||
            `Failed to add product ${productId} to favorites.`,
        }));
      }
    } catch (err: any) {
      console.error(`Error adding product ${productId} to favorites:`, err);
      toast.error("An error occurred while adding product to favorites.");

      set((state) => ({
        favorites: state.favorites.filter((fav) => fav.id !== productId),
        isLoadingFavorites: false,
        error: "An error occurred while adding product to favorites.",
      }));
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        console.warn("addFavorite received 401, updating auth state.");
        set({ isAuthenticatedState: false, user: null });
        removeAuthTokenCookie();
      }
    }
  },

  /**
   * Removes a product from the user's favorites.
   * Requires authentication.
   * @param productId - The ID of the product to remove.
   */
  removeFavorite: async (productId: number) => {
    if (!get().isAuthenticatedState) {
      console.error(
        "User not authenticated (store state), cannot remove from favorites."
      );
      toast.error("You must be logged in to remove items from favorites.");
      set({ error: "You must be logged in to remove items from favorites." });
      return;
    }

    const currentFavorites = get().favorites;
    const existingFavorite = currentFavorites.find(
      (fav) => fav.id === productId
    );

    if (!existingFavorite) {
      console.log(`Product ${productId} is not in favorites.`);
      return;
    }

    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== productId),
      isLoadingFavorites: true,
      error: null,
    }));

    try {
      const response = await removeFromFavorites(productId);

      if (response && response.success) {
        console.log(
          `Product ${productId} removed from favorites successfully.`
        );
        toast.success("Product removed from favorites.");

        set({ isLoadingFavorites: false });
      } else {
        console.error(
          `Failed to remove product ${productId} from favorites (API error).`
        );
        toast.error(
          response?.message ||
            response?.error ||
            `Failed to remove product ${productId} from favorites.`
        );

        set((state) => ({
          favorites: [...state.favorites, existingFavorite],
          isLoadingFavorites: false,
          error:
            response?.message ||
            response?.error ||
            `Failed to remove product ${productId} from favorites.`,
        }));
      }
    } catch (err: any) {
      console.error(`Error removing product ${productId} from favorites:`, err);
      toast.error("An error occurred while removing product from favorites.");

      set((state) => ({
        favorites: [...state.favorites, existingFavorite],
        isLoadingFavorites: false,
        error: "An error occurred while removing product from favorites.",
      }));
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        console.warn("removeFavorite received 401, updating auth state.");
        set({ isAuthenticatedState: false, user: null });
        removeAuthTokenCookie();
      }
    }
  },

  /**
   * Logs out the user by clearing the user, cart, and favorites state
   * and removing the auth token cookie.
   * Also updates the isAuthenticatedState in the store.
   */
  logout: () => {
    console.log("Logging out...");
    removeAuthTokenCookie();
    set({
      user: null,
      cartItems: [],
      cartItemsAmount: 0,
      favorites: [],
      isAuthenticatedState: false,
      error: null,
    });
    window.location.href = "/";
  },
  signIn: async ({ email, password }: SignInPayload) => {
    const payload: SignInPayload = { email, password };
    const response = await signIn(payload);
    if (response.success) {
      toast.success("Signed in successfully");
      get()
        .checkAuthStatus()
        .then(() => get().fetchUser());
    } else {
      toast.error("Sign in failed. Please check your credentials.");
    }
  },
}));
