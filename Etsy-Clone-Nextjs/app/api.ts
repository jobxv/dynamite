import {
  Category,
  Product,
  PurchasedItem,
  SellerOrder,
  SellerReview,
  User,
} from "@/data/types";
import { useAppStore } from "@/store/store";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

// --- 1. Configuration and Constants ---
export const API_BASE_URL = "http://localhost:8000/api";

export const AUTH_TOKEN_COOKIE_NAME = "authToken";

// --- 2. Data Interfaces and Types ---
export interface SignInResponse {
  success: boolean;
  message: string;
  user: {
    id: number;
    username: string;
  };
  token: string;
  expires_at: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  is_seller?: boolean;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SubmitReviewPayload {
  rating: number;
  comment?: string;
}

export interface AddProductPayload {
  user_id: number;
  title: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: number;
}

export interface UpdateProductPayload {
  title?: string;
  description?: string;
  price?: number;
  stock_quantity?: number;
  category_id?: number;
}

// --- 3. Authentication and User Management ---

/**
 * Sets the authentication token in a cookie.
 * @param token - The authentication token.
 * @param expiresAt - The expiration date/time string from the sign-in response.
 */
const setAuthTokenCookie = (token: string, expiresAt: string) => {
  const expiresDate = new Date(expiresAt);

  Cookies.set(AUTH_TOKEN_COOKIE_NAME, token, {
    expires: expiresDate,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
  });
};

/**
 * Gets the authentication token from the cookie.
 * @returns The authentication token string or undefined if not found.
 */
export const getAuthTokenCookie = (): string | undefined => {
  return Cookies.get(AUTH_TOKEN_COOKIE_NAME);
};

/**
 * Removes the authentication token cookie.
 */
export const removeAuthTokenCookie = () => {
  Cookies.remove(AUTH_TOKEN_COOKIE_NAME);
  console.log("removed cookie");
};

/**
 * Registers a new user. Does NOT require authentication.
 * @param userData - User registration data (e.g., username, email, password).
 * @returns Promise resolving with the API response.
 */
export const register = async (
  userData: RegisterPayload
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data
        : "An unknown error occurred",
    };
  }
};

/**
 * Signs in a user, stores the token in a cookie, and returns authentication token.
 * @param credentials - User sign-in credentials (e.g., email/username, password).
 * @returns Promise resolving with the sign-in response including the token.
 */
export const signIn = async (
  credentials: SignInPayload
): Promise<SignInResponse | ApiResponse> => {
  try {
    const response = await axios.post<SignInResponse>(
      `${API_BASE_URL}/signin`,
      credentials
    );

    if (
      response.data.success &&
      response.data.token &&
      response.data.expires_at
    ) {
      setAuthTokenCookie(response.data.token, response.data.expires_at);
    }

    return response.data;
  } catch (error) {
    console.error("Error during sign-in:", error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

/**
 * Checks if the user is authenticated based on the presence of the auth token cookie.
 * @returns boolean - True if authenticated, false otherwise.
 */

export const isAuthenticated = async () => {
  const token = getAuthTokenCookie();
  const client = getApiClient();

  console.log("found token", token ? "Yes" : "No");

  if (!token) {
    console.log("No token found, user is not authenticated.");
    return false;
  }

  try {
    const response = await client.get("/get_me");

    if (response.data && response.data.success) {
      console.log("Backend verified token, user is authenticated.");
      return true;
    } else {
      console.warn("Backend verification failed (not explicitly successful).");
      removeAuthTokenCookie();
      return false;
    }
  } catch (error) {
    console.error("Error during authentication verification:", error);

    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        console.log("Received 401 Unauthorized. Token is invalid/expired.");
        removeAuthTokenCookie();
        return false;
      } else {
        console.error(
          `Axios error occurred with status ${
            error.response ? error.response.status : "unknown"
          }. Cannot confirm authentication.`
        );

        return false;
      }
    } else {
      console.error(
        "Non-Axios error occurred during authentication verification."
      );

      return false;
    }
  }
};

/**
 * Gets the current authenticated user's details. Requires authentication.
 * @returns Promise resolving with the API response containing user data.
 */
export const getMe = async (): Promise<ApiResponse<User>> => {
  const client = getApiClient();
  try {
    const response = await client.get("/get_me");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

// --- 4. API Client Configuration ---

/**
 * Creates an Axios instance, optionally including the authentication token in the header
 * if a token is available in the cookie. Used for JSON requests.
 * @returns Axios instance configured with or without the auth header.
 */
const getApiClient = () => {
  const token = getAuthTokenCookie();
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = token;
  }

  return axios.create({
    baseURL: API_BASE_URL,
    headers: headers,
  });
};

/**
 * Creates an Axios instance for sending form data (e.g., file uploads),
 * optionally including the authentication token. Sets Content-Type to multipart/form-data.
 * @returns Axios instance configured for form data with or without the auth header.
 */
const getFormApiClient = () => {
  const token = getAuthTokenCookie();
  const headers: { [key: string]: string } = {
    "Content-Type": "multipart/form-data",
  };

  if (token) {
    headers["Authorization"] = token;
  }

  return axios.create({
    baseURL: API_BASE_URL,
    headers: headers,
  });
};

// --- 5. Product and Category Data Fetching (Public) ---

/**
 * Gets products belonging to a specific category. Does NOT require authentication.
 * @param categoryId - The ID of the category.
 * @returns Promise resolving with the API response containing product data.
 */
export const getProductsByCategory = async (
  categoryId: number
): Promise<ApiResponse> => {
  const client = getApiClient();
  try {
    const response = await client.get(`/products?category=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching products for category "${categoryId}":`,
      error
    );
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

/**
 * Gets a list of all categories. Does NOT require authentication.
 * @returns Promise resolving with the API response containing category list data.
 */
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  const client = getApiClient();
  try {
    const response = await client.get("/category");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

export const getCategoriyById = async (
  id: number
): Promise<ApiResponse<Category[]>> => {
  const client = getApiClient();
  try {
    const response = await client.get(`/category/${id}`);
    console.log("getCategoriyById", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

/**
 * Gets a list of all products. Does NOT require authentication.
 * @returns Promise resolving with the API response containing product list data.
 */
export const getAllProducts = async (): Promise<ApiResponse> => {
  const client = getApiClient();
  try {
    const response = await client.get("/products");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

export const getDiscountedProducts = async (): Promise<ApiResponse> => {
  const client = getApiClient();
  try {
    const response = await client.get("/products/discounted");
    console.log("products/discounted", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

/**
 * Gets details for a single product. Does NOT require authentication.
 * @param productId - The ID of the product.
 * @returns Promise resolving with the API response containing product details.
 */
export const getProductDetails = async (
  productId: number
): Promise<ApiResponse<Product>> => {
  const client = getApiClient();
  try {
    const response = await client.get(`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product details for ID ${productId}:`, error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

/**
 * External function to fetch purchased products for the authenticated user.
 * Handles API call and returns the data or throws an error.
 * @returns A Promise that resolves with the fetched PurchasedItem data array.
 * @throws An error if the API request fails or returns an unsuccessful response.
 */
export const getPurchasedProducts = async (): Promise<PurchasedItem[]> => {
  try {
    const apiClient = getApiClient();
    const response = await apiClient.get("/products/purchased");

    console.log("/products/purchased", response.data);
    

    if (response.data.success) {
      const itemsWithReviewedFlag = response.data.data.map(
        (item: PurchasedItem) => ({
          ...item,
          reviewed: false,
        })
      );
      return itemsWithReviewedFlag;
    } else {
      throw new Error(
        response.data.message || "Failed to fetch purchased products."
      );
    }
  } catch (err: any) {
    console.error("Error in fetchPurchasedProducts:", err);
    throw new Error(
      err.message || "An error occurred while fetching purchased products."
    );
  }
};

/**
 * Gets details for a seller. Does NOT require authentication.
 * @param sellerId - The ID of the seller.
 * @returns Promise resolving with the API response containing seller details.
 */
export const getSellerDetails = async (
  sellerId: number
): Promise<ApiResponse> => {
  const client = getApiClient();
  try {
    const response = await client.get(`/seller/${sellerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching seller details for ID ${sellerId}:`, error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

// --- 6. Cart Management (Requires Authentication) ---

/**
 * Adds a product to the cart. Requires authentication.
 * @param productId - The ID of the product to add.
 * @param quantity - The quantity to add (assuming the handler expects this, adjust if needed).
 * @returns Promise resolving with the API response.
 */
export const addToCart = async (
  productId: number,
  quantity: number = 1
): Promise<ApiResponse> => {
  const client = getApiClient();
  try {
    const response = await client.post(`/cart/add/${productId}`, { quantity });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error adding product ${productId} to cart:`, error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

export const updateCart = async (
  productId: number,
  quantity: number = 1
): Promise<ApiResponse> => {
  const client = getApiClient();
  try {
    const response = await client.put(`/cart/add/${productId}`, { quantity });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error adding product ${productId} to cart:`, error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

/**
 * Gets the current user's cart items. Requires authentication.
 * @returns Promise resolving with the API response containing cart data.
 */
export const getCart = async (): Promise<ApiResponse> => {
  const client = getApiClient();
  try {
    const response = await client.get("/cart");
    console.log("cart", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

/**
 * Removes a product from the cart. Requires authentication.
 * @param productId - The ID of the product to remove.
 * @returns Promise resolving with the API response.
 */
export const removeFromCart = async (
  productId: number
): Promise<ApiResponse> => {
  const client = getApiClient();
  try {
    const response = await client.delete(`/cart/remove/${productId}`);
    console.log(`removing product ` + productId + "result", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error removing product ${productId} from cart:`, error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

// --- 7. Reviews (Requires Authentication) ---

/**
 * Adds a review for a product. Requires authentication.
 * @param productId - The ID of the product to review.
 * @param reviewData - Review data (e.g., rating, comment).
 * @returns Promise resolving with the API response.
 */
export const submitReview = async (
  productId: number,
  reviewData: SubmitReviewPayload
): Promise<ApiResponse> => {
  const client = getApiClient();
  try {
    const response = await client.post(`/review/add/${productId}`, reviewData);
    return response.data;
  } catch (error) {
    console.error(`Error adding review for product ${productId}:`, error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

/**
 * Gets reviews for a specific product. Requires authentication (based on user's requirement, though PHP router didn't explicitly check).
 * @param productId - The ID of the product to get reviews for.
 * @returns Promise resolving with the API response containing review data.
 */
export const getProductReviews = async (
  productId: number
): Promise<ApiResponse> => {
  const client = getApiClient();
  try {
    const response = await client.get(`/reviews/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

// --- 8. Favorites (Requires Authentication) ---

/**
 * Gets the current user's favorite products. Requires authentication.
 * @returns Promise resolving with the API response containing favorite product data.
 */

export const getFavorites = async (): Promise<ApiResponse> => {
  const client = getApiClient();
  try {
    const response = await client.get("/favorite");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

export const addToFavorites = async (
  productId: number
): Promise<ApiResponse> => {
  if (productId <= 0) {
    return {
      success: false,
      error: "Invalid product ID",
    };
  }

  const client = getApiClient();
  try {
    const response = await client.post(`/favorite/${productId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(`Error adding product ${productId} to favorites:`, error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

export const removeFromFavorites = async (
  productId: number
): Promise<ApiResponse> => {
  if (productId <= 0) {
    return {
      success: false,
      error: "Invalid product ID",
    };
  }

  const client = getApiClient();
  try {
    const response = await client.delete(`/favorite/${productId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(`Error removing product ${productId} from favorites:`, error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

// --- 9. Seller Product Management (Requires Seller Privileges and Authentication) ---

/**
 * Adds a new product (requires seller privileges and authentication).
 * @param data - Data for the new product.
 * @param images - FileList of images to upload for the product.
 * @returns Promise resolving with the API response.
 */
export const addProduct = async (
  data: AddProductPayload,
  images: FileList
): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  formData.append("stock_quantity", data.stock_quantity.toString());
  formData.append("category_id", data.category_id.toString());
  if (images) {
    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }
  }
  const client = getFormApiClient();
  try {
    const response = await client.post("/product/add", formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

/**
 * Updates an existing product (requires seller privileges and authentication).
 * @param productId - The ID of the product to update.
 * @param productData - Updated data for the product.
 * @returns Promise resolving with the API response.
 */
export const updateProduct = async (
  productId: number,
  productData: UpdateProductPayload
): Promise<ApiResponse> => {
  const client = getApiClient();
  try {
    const response = await client.put(
      `/product/update/${productId}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${productId}:`, error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

/**
 * Deletes a product (requires seller privileges and authentication).
 * @param productId - The ID of the product to delete.
 * @returns Promise resolving with the API response.
 */
export const deleteProduct = async (
  productId: number
): Promise<ApiResponse> => {
  const client = getApiClient();
  try {
    const response = await client.delete(`/products/delete/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product ${productId}:`, error);
    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred",
    };
  }
};

// --- 10. Plaing order
interface OrderPayload {
  id: number;
  buyer_id: number;
  total_price: number;
  status: string;
  shipping_address: string;
  billing_address?: string | null;
  contact_phone: string;
  notes?: string | null;
  payment_method: string;
}

/**
 * Sends a request to the /buy API endpoint to place an order.
 * @param orderPayload - The data payload for the order.
 * @returns A Promise resolving with the API response data.
 * @throws An error if the API request fails or returns an error status.
 */
export const placeOrder = async (
  orderPayload: Partial<OrderPayload>
): Promise<any> => {
  const apiClient = getApiClient();
  try {
    const response = await apiClient.post("/buy", orderPayload);
    if (response.data.success) return response.data;
    else toast.error("An error occured when ordering");
  } catch (error) {
    console.error("Error in placeOrderApi:", error);
    throw error;
  }
};

// --- 11. API for seller

export const getRecentData = async (): Promise<any> => {
  const apiClient = getApiClient();
  try {
    const response = await apiClient.get("/recent");
    if (response.data.success) return response.data;
    else toast.error("An error occured while fetching recent activity");
  } catch (error) {
    console.error("Error in recent:", error);
    throw error;
  }
};

export const getProductsBySeller = async (user_id: number): Promise<any> => {
  const apiClient = getApiClient();
  try {
    const response = await apiClient.get(`/products?seller=${user_id}`);

    if (response.data.success) return response.data;
    else toast.error("An error occured while fetching recent activity");
  } catch (error) {
    console.error("Error in seller products:", error);
    throw error;
  }
};

export const getSellerStats = async () => {
  const apiClient = getApiClient();
  try {
    const response = await apiClient.get("/stats");

    if (response.data.success) return response.data;
    else toast.error("An error occured while fetching seller stats.");
  } catch (error) {
    console.error("Error in seller stats:", error);
    throw error;
  }
};

export const fetchSellerOrders = async (): Promise<SellerOrder[]> => {
  try {
    const apiClient = getApiClient();
    const response = await apiClient.get("/orders");
    console.log("res", response.data);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch orders.");
    }
  } catch (err: any) {
    console.error("Error in fetchSellerOrders:", err);
    throw new Error(err.message || "An error occurred while fetching orders.");
  }
};

export const fetchSellerReviews = async (): Promise<SellerReview[]> => {
  try {
    const apiClient = getApiClient();
    const response = await apiClient.get("/reviews");

    if (response.data.success) {
      console.log("reviews f", response.data.data);

      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch reviews.");
    }
  } catch (err: any) {
    console.error("Error in fetchSellerReviews:", err);
    throw new Error(err.message || "An error occurred while fetching reviews.");
  }
};
