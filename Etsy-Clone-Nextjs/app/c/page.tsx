"use client";
import useCategories from "@/hooks/useCategories";
import Link from "next/link";

export default function CategoryIndexPage() {
  const { categories } = useCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-medium mb-8 text-center">
        Browse Categories
      </h1>

      <div className="grid gap-4 max-w-md mx-auto">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/c/${category.id}`}
            className="bg-gray-100 hover:bg-gray-200 text-center py-4 px-6 rounded-lg transition-colors"
          >
            <span className="text-lg font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
