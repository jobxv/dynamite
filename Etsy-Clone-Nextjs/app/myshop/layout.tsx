import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Shop Manager | Dynamite Clone",
  description: "Manage your Dynamite shop, products, orders, and more",
}

export default function ShopManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-1">Shop Manager</h2>
          <p className="text-gray-500 text-sm">Manage your shop</p>
        </div>

        <nav className="space-y-1">
          <Link href="/myshop" className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium">
            Dashboard
          </Link>
          <Link
            href="/myshop/products"
            className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium"
          >
            Products
          </Link>
          <Link
            href="/myshop/orders"
            className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium"
          >
            Orders
          </Link>
          <Link
            href="/myshop/reviews"
            className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium"
          >
            Reviews
          </Link>
          <Link
            href="/myshop/settings"
            className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  )
}
