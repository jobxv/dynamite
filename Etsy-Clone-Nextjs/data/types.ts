export interface Product {
  id: number;
  seller_id: number;
  title: string;
  description?: string;
  price: number;
  original_price?: number;
  stock_quantity: number;
  category_id: number;
  created_at: string;
  images: string[];
  video?: string;
}

export interface DiscProduct extends Omit<Product, "images"> {
  image_url: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  subtitle: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  is_seller: boolean;
}

export interface Review {
  product_id: number;
  rating: number;
  comment: string;
  created_at: string;
  username: string;
}

export interface SellerInfo {
  user_id: number;
  username: string;
  is_seller: boolean;
  seller_id: number;
  bio: string | null;
  join_date: string;
  rating: number | null;
}

export interface CartItem {
  product_id: number;
  cart_quantity: number;
  product_name: string;
  price: string;
  product_stock: number;
  product_description: string;
  category_name: string;
  product_image_url: string;
  seller_username: string;
}

export interface OrderData {
  id: number;
  buyer_id: number;
  total_price: number;
  status: string;
  shipping_address: string;
  billing_address?: string | null;
  contact_phone: string;
  notes?: string | null;
}

export interface SellerActivity {
  text: string;
  time_ago: string;
  type: "order_with_price" | "review_no_price" | "order_no_price";
  price?: string;
}

export interface SellerStat {
  name: string;
  value: number;
  type: "count" | "currency";
  change: string;
}

export interface SellerOrderItem {
  product_id: number;
  title: string;
  quantity: number;
  price_at_order: number;
  current_price: number;
  description: string;
}

export interface SellerOrder {
  id: number;
  customer: string;
  date: string;
  total: number;
  status: string;
  notes: string | null;
  buyer_email: string;
  items: SellerOrderItem[];
}


export interface SellerReview {
  id: number;
  review_id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  reviewer_username: string;
  product_id: number;
  product_title: string;
}



export interface PurchasedItem {
  id: number; 
  quantity: number;
  price: number;
  purchaseDate: string;
  status: string;
  product_id: number;
  product_title: string;
  product_image: string;
  seller_id: number;
  seller_name: string;
  reviewed: boolean;
}
