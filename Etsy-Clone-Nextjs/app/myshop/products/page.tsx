"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductList } from "@/components/shop/ProductList";
import { Product } from "@/data/types";
import { deleteProduct, getProductsBySeller } from "@/app/api";
import { toast } from "sonner";
import { useAppStore } from "@/store/store";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(false);

  const { user, isAuthenticatedState } = useAppStore();

  useEffect(() => {
    if (!isAuthenticatedState || !user) {
      console.log("no user");
      return;
    }
    setLoading(true);
    const fetchProducts = async () => {
      const response = await getProductsBySeller(user!.id);

      if (response.success && response.data) {
        setProducts(response.data);
        console.log("products fetched: ", response.data);
      } else toast.error("Error Fetcing Products");
    };
    fetchProducts().finally(() => setLoading(false));
  }, [user]);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDeleteProduct = async (id: number) => {
    const del = confirm(
      "Are you sure you want to delete procuct with id: " + id
    );
    if (del) {
      const response = await deleteProduct(id);
      if (response.success) {
        toast.success(response.message || "Product deleted successfully");
      } else {
        toast.error(response.error || "Error occured while deleting");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Your Products</h1>
        <Link
          href="/myshop/products/new"
          className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800"
        >
          Add new product
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        {products && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
        {loading && <div>Loading...</div>}

        {filteredProducts && (
          <ProductList onDelete={onDeleteProduct} products={filteredProducts} />
        )}
      </div>
    </div>
  );
}
