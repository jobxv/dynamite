"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import useCategories from "@/hooks/useCategories";
import { Select, SelectItem } from "../ui/Select";
import { Label } from "../ui/Form";
import { AddProductPayload } from "@/app/api";
import { toast } from "sonner";

interface ProductFormProps {
  initialData?: Omit<AddProductPayload, "user_id">;
  onSubmit: (
    data: Omit<AddProductPayload, "user_id">,
    images: FileList | null
  ) => void;
}

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<Omit<AddProductPayload, "user_id">>(
    initialData
      ? {
          title: initialData.title || "",
          description: initialData.description || "",
          price: initialData.price || 0,
          stock_quantity: initialData.stock_quantity || 0,
          category_id: initialData.category_id || 0,
        }
      : {
          title: "",
          description: "",
          price: 0,
          stock_quantity: 0,
          category_id: 0,
        }
  );

  const { categories, isLoadingCategories, error } = useCategories();
  console.log(categories);

  const [images, setImages] = useState<FileList | null>(null);

  const [previewImage, setPreviewImage] = useState(
    "/placeholder.svg?height=300&width=300"
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stock_quantity" || name === "category_id"
          ? Number(value)
          : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImages(files);

    if (files && files.length > 0) {
      const firstFile = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(firstFile);
    } else {
      setPreviewImage("/placeholder.svg?height=300&width=300");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!images || !formData.title || !formData.description || !formData.price || !formData.stock_quantity || !formData.category_id) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const payload: Omit<AddProductPayload, "user_id"> = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      stock_quantity: formData.stock_quantity,
      category_id: formData.category_id,
    };

    onSubmit(payload, images);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min="0.01"
                step="0.01"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.price == 0 ? "" : formData.price}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="stock_quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Inventory * {/* Label still says Inventory for user */}
              </label>
              <input
                type="number"
                id="stock_quantity"
                name="stock_quantity"
                min="0"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                value={
                  formData.stock_quantity == 0 ? "" : formData.stock_quantity
                }
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category_id">Category *</Label>
            <Select
              id="category_id"
              className=""
              value={formData.category_id?.toString() || ""}
              onValueChange={(value) =>
                setFormData({ ...formData, category_id: Number(value) })
              }
              placeholder="Select a category"
            >
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id.toString()}
                  className="bg-white hover:bg-gray-50"
                >
                  {category.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Tags section removed */}
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>{" "}
            {/* Changed label to plural */}
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <div className="mx-auto h-40 w-40 relative">
                  {/* Display multiple image previews if available, otherwise the single preview */}
                  {images && images.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-2">
                      {Array.from(images).map((file, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`Product preview ${index + 1}`}
                          className="object-cover h-16 w-16 rounded-md"
                        />
                      ))}
                    </div>
                  ) : (
                    <Image
                      src={previewImage || "/placeholder.svg"}
                      alt="Product preview"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                      multiple
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB each
                </p>{" "}
                {images && images.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {images.length} file(s) selected
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}
