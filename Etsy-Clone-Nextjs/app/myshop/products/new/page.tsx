"use client";
import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/shop/ProductForm";
import { addProduct, AddProductPayload } from "@/app/api";
import { toast } from "sonner";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function NewProductPage() {
  const router = useRouter();
  const { user } = useCurrentUser();

  const handleSubmit = (
    data: Omit<AddProductPayload, "user_id">,
    images: FileList | null
  ) => {
    if (!images) return;
    const response = addProduct({ ...data, user_id: user!.id }, images);
    toast.promise(response, {
      loading: "Adding product...",
      success: "Product added successfully!",
      error: "An error occurred while adding the product.",
    });
    router.push("/myshop/products");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={() => router.back()}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-medium">Add New Product</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
