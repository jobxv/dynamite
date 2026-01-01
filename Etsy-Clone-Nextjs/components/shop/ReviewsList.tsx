import { SellerReview } from "@/data/types";

interface ReviewsListProps {
  reviews: SellerReview[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{review.product_title}</h3>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    {i < review.rating ? "★" : "☆"}
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Review ID: {review.review_id}
            </div>
          </div>

          <div className="mt-3">
            <p className="text-gray-700">
              {review.comment || "No comment provided."}
            </p>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              From: {review.reviewer_username}
            </div>

            <div className="flex space-x-2">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Reply
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Report
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
