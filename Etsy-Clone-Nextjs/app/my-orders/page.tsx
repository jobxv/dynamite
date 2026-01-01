"use client";

import { ReviewDialog } from "@/components/shop/ReviewDialog";
import { PurchasedItem } from "@/data/types";
import { useEffect, useState } from "react";
import { getPurchasedProducts, submitReview } from "../api";
import Image from "next/image";
import { ShoppingBag, Star } from "lucide-react";
import { getImageUrl } from "@/utils/image";

export default function MyPurchasesPage() {
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<PurchasedItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPurchases = async () => {
      setLoading(true);
      setError(null);
      try {
        const items = await getPurchasedProducts();

        setPurchasedItems(items);
      } catch (err: any) {
        setError(err.message || "Failed to load your purchases.");
        setPurchasedItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadPurchases();
  }, []);

  const handleReviewClick = (item: PurchasedItem) => {
    setSelectedItem(item);
    setIsReviewDialogOpen(true);
  };

  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!selectedItem) {
      console.error("No item selected for review.");
      return;
    }

    try {
      const response = await submitReview(selectedItem.product_id, {
        rating: rating,
        comment: comment,
      });

      console.log("Review submitted successfully:", response.message);

      setPurchasedItems((prevItems) =>
        prevItems.map((item) =>
          item.id === selectedItem.id ? { ...item, reviewed: true } : item
        )
      );

      setIsReviewDialogOpen(false);
      setSelectedItem(null);
    } catch (err: any) {
      console.error("Error submitting review:", err);

      alert(`Error submitting review: ${err.message}`);
    }
  };

  const completedItems = purchasedItems?.filter(
    (item) => item.status?.toLowerCase() === "completed"
  );
  const otherItems = purchasedItems?.filter(
    (item) => item.status?.toLowerCase() !== "completed"
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">My Purchases</h1>

      {loading && (
        <div className="text-center py-12 text-gray-500">
          Loading your purchases...
        </div>
      )}

      {error && (
        <div className="text-center py-12 text-red-500">Error: {error}</div>
      )}

      {!loading && !error && purchasedItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            No purchases yet
          </h2>
          <p className="text-gray-500">
            When you make purchases, they will appear here.
          </p>
        </div>
      ) : (
        !loading &&
        !error && (
          <div className="space-y-8">
            {completedItems.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Ready to Review</h2>
                <div className="space-y-4">
                  {completedItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 flex items-start"
                    >
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <Image
                          src={item.product_image || "/placeholder.svg"}
                          alt={item.product_title}
                          fill
                          className="object-cover rounded-md"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium text-lg">
                          {item.product_title}
                        </h3>{" "}
                        {/* Use product_title */}
                        <p className="text-sm text-gray-500 mb-1">
                          Purchased on{" "}
                          {new Date(item.purchaseDate).toLocaleDateString()}{" "}
                          {/* Format date */}• ${item.price.toFixed(2)} • Qty:{" "}
                          {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500 mb-3">
                          Sold by{" "}
                          <span className="underline">{item.seller_name}</span>{" "}
                          {/* Use seller_name */}
                        </p>
                        {item.reviewed ? (
                          <div className="flex items-center text-green-600">
                            <Star className="h-4 w-4 fill-current mr-1" />
                            <span className="text-sm">Reviewed</span>
                          </div>
                        ) : (
                          item.status?.toLowerCase() === "completed" && (
                            <button
                              onClick={() => handleReviewClick(item)}
                              className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
                            >
                              Write a Review
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {otherItems.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Other Purchases</h2>
                <div className="space-y-4">
                  {otherItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 flex items-start"
                    >
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <Image
                          src={getImageUrl(item.product_image) || "/placeholder.svg"}
                          alt={item.product_title}
                          fill
                          className="object-cover rounded-md"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium text-lg">
                          {item.product_title}
                        </h3>{" "}
                        {/* Use product_title */}
                        <p className="text-sm text-gray-500 mb-1">
                          Purchased on{" "}
                          {new Date(item.purchaseDate).toLocaleDateString()}{" "}
                          {/* Format date */}• ${item.price.toFixed(2)} • Qty:{" "}
                          {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500 mb-3">
                          Sold by{" "}
                          <span className="underline">{item.seller_name}</span>{" "}
                          {/* Use seller_name */}
                        </p>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            item.status.toLowerCase() === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : item.status.toLowerCase() === "processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : item.status.toLowerCase() === "pending"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}{" "}
                          {/* Display status */}
                        </span>
                        {/* Conditional message based on status */}
                        {item.status.toLowerCase() !== "completed" && (
                          <p className="text-sm text-gray-500 mt-2">
                            You can review this item once it's delivered
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      )}

      {/* Render the Review Dialog */}
      {selectedItem && (
        <ReviewDialog
          isOpen={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
          onClose={() => {
            setIsReviewDialogOpen(false);
            setSelectedItem(null);
          }}
          onSubmit={handleReviewSubmit}
          product={{
            id: selectedItem.product_id,
            title: selectedItem.product_title,
            image: selectedItem.product_image || "/placeholder.svg",
          }}
        />
      )}
    </div>
  );
}
