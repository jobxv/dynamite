"use client"

import { useEffect, useState } from "react"
import { ReviewsList } from "@/components/shop/ReviewsList"
import { fetchSellerReviews } from "@/app/api";
import { SellerReview } from "@/data/types";

export default function ReviewsPage() {
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [reviews, setReviews] = useState<SellerReview[]>([]); // State to hold fetched reviews
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage errors

  // Effect to fetch reviews when the component mounts
  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null); // Clear any previous errors

      try {
        // Call the external fetching function
        const fetchedReviews = await fetchSellerReviews();
        setReviews(fetchedReviews); // Update state with fetched reviews
      } catch (err: any) {
        setError(err.message || "An error occurred while loading reviews.");
        setReviews([]); // Clear reviews on error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadReviews(); // Call the async function inside useEffect
  }, []); // Empty dependency array means this effect runs only once on mount

   // Filter reviews based on the selected rating filter state
  const filteredReviews = reviews.filter((review) => {
    if (ratingFilter === null) {
      return true; // Show all reviews
    }
    return review.rating === ratingFilter; // Filter by rating
  });


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">Customer Reviews</h1>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="mb-4 flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full text-sm ${ratingFilter === null ? "bg-black text-white" : "bg-gray-100"}`}
            onClick={() => setRatingFilter(null)}
          >
            All Ratings
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              className={`px-3 py-1 rounded-full text-sm ${ratingFilter === rating ? "bg-black text-white" : "bg-gray-100"}`}
              onClick={() => setRatingFilter(rating)}
            >
              {rating} ★
            </button>
          ))}
        </div>

        {/* Display loading, error, or the reviews list */}
        {loading && <div className="text-center py-8 text-gray-500">Loading reviews...</div>}
        {error && <div className="text-center py-8 text-red-500">Error: {error}</div>}
        {!loading && !error && <ReviewsList reviews={filteredReviews} />}

      </div>
    </div>
  );
}
