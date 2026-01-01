"use client"

import { useState } from "react"
import { ShopSettingsForm } from "@/components/shop/ShopSettingsForm"

// Mock shop data
const mockShopData = {
  name: "Handcrafted Treasures",
  description: "Unique handmade items crafted with love and care. Specializing in ceramics, woodwork, and textiles.",
  banner: "/placeholder.svg?height=300&width=1200",
  logo: "/placeholder.svg?height=200&width=200",
  policies: {
    returns: "Returns accepted within 14 days of delivery.",
    shipping: "Items ship within 3-5 business days. International shipping available.",
    additional: "All items are handmade and may have slight variations, which adds to their unique charm.",
  },
  socialMedia: {
    instagram: "handcrafted_treasures",
    facebook: "HandcraftedTreasures",
    pinterest: "hc_treasures",
  },
}

export default function SettingsPage() {
  const [shopData, setShopData] = useState(mockShopData)

  const handleSubmit = (updatedData: any) => {
    // In a real app, this would send data to an API
    console.log("Shop settings to update:", updatedData)
    setShopData(updatedData)

    // Show success message
    alert("Shop settings updated successfully!")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">Shop Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <ShopSettingsForm initialData={shopData} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
