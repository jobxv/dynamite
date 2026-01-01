"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Dialog, DialogFooter, DialogTitle } from "../ui/Dialog";
import ButtonLink from "../ui/ButtonLink";
import { Label, Textarea } from "../ui/Form";

interface ReviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => Promise<void>;
  product: {
    id: number;
    title: string;
    image: string | null;
  };
}

export function ReviewDialog({
  isOpen,
  onOpenChange,
  onClose,
  onSubmit,
  product,
}: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (comment.trim().length < 5) {
      setError("Please enter a comment (minimum 5 characters).");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(rating, comment);

      setSuccessMessage("Review submitted successfully!");

      setRating(0);
      setComment("");
    } catch (error: any) {
      console.error("Error submitting review:", error);
      setError(error.message || "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setComment("");
      setHoveredRating(0);
      setError("");
      setSuccessMessage("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogTitle>Write a Review</DialogTitle>

      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="ml-3">
            <h3 className="font-medium">{product.title}</h3>
          </div>
        </div>

        {/* Review Form */}
        {!successMessage ? (
          <form onSubmit={handleSubmit}>
            {/* Rating Input */}
            <div className="mb-4">
              <Label>Rating</Label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        (hoveredRating ? star <= hoveredRating : star <= rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Input */}
            <div className="mb-4">
              <Label htmlFor="comment">Your Review</Label>
              <Textarea
                id="comment"
                rows={4}
                placeholder="Share your experience with this product..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {/* Error Message */}
            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

            {/* Dialog Footer with Buttons */}
            <DialogFooter className="flex justify-end gap-3">
              <ButtonLink
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onClose();
                }}
                disabled={isSubmitting}
                btnClassName="text-black border border-gray-300 bg-white hover:bg-gray-100"
                small
              >
                Cancel
              </ButtonLink>
              <ButtonLink
                type="submit"
                disabled={
                  isSubmitting || rating === 0 || comment.trim().length < 5
                }
                small
                btnClassName="bg-blue-600 text-white hover:bg-blue-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </ButtonLink>
            </DialogFooter>
          </form>
        ) : (
          <div className="text-center py-8 text-green-600">
            <p className="text-lg font-medium">{successMessage}</p>
            <ButtonLink
              onClick={() => {
                onOpenChange(false);
                onClose();
              }}
              small
              btnClassName="mt-4 bg-blue-600 text-white hover:bg-blue-700"
            >
              Close
            </ButtonLink>
          </div>
        )}
      </div>
    </Dialog>
  );
}
