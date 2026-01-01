"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

interface ShopSettingsFormProps {
  initialData: any
  onSubmit: (data: any) => void
}

export function ShopSettingsForm({ initialData, onSubmit }: ShopSettingsFormProps) {
  const [formData, setFormData] = useState(initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Shop Information</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Shop Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Shop Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Shop Appearance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shop Banner</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <div className="mx-auto h-32 w-full relative">
                  <Image src={formData.banner || "/placeholder.svg"} alt="Shop banner" fill className="object-cover" />
                </div>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="banner-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                  >
                    <span>Upload a banner</span>
                    <input id="banner-upload" name="banner-upload" type="file" className="sr-only" />
                  </label>
                </div>
                <p className="text-xs text-gray-500">Recommended size: 1200 x 300 pixels</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shop Logo</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <div className="mx-auto h-32 w-32 relative">
                  <Image
                    src={formData.logo || "/placeholder.svg"}
                    alt="Shop logo"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="logo-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                  >
                    <span>Upload a logo</span>
                    <input id="logo-upload" name="logo-upload" type="file" className="sr-only" />
                  </label>
                </div>
                <p className="text-xs text-gray-500">Recommended size: 200 x 200 pixels</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Shop Policies</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="policies.returns" className="block text-sm font-medium text-gray-700 mb-1">
              Return Policy
            </label>
            <textarea
              id="policies.returns"
              name="policies.returns"
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.policies.returns}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="policies.shipping" className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Policy
            </label>
            <textarea
              id="policies.shipping"
              name="policies.shipping"
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.policies.shipping}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="policies.additional" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Policies
            </label>
            <textarea
              id="policies.additional"
              name="policies.additional"
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.policies.additional}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Social Media</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="socialMedia.instagram" className="block text-sm font-medium text-gray-700 mb-1">
                Instagram Username
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  @
                </span>
                <input
                  type="text"
                  id="socialMedia.instagram"
                  name="socialMedia.instagram"
                  className="flex-1 p-2 border border-gray-300 rounded-r-md"
                  value={formData.socialMedia.instagram}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="socialMedia.facebook" className="block text-sm font-medium text-gray-700 mb-1">
                Facebook Username
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  facebook.com/
                </span>
                <input
                  type="text"
                  id="socialMedia.facebook"
                  name="socialMedia.facebook"
                  className="flex-1 p-2 border border-gray-300 rounded-r-md"
                  value={formData.socialMedia.facebook}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="socialMedia.pinterest" className="block text-sm font-medium text-gray-700 mb-1">
                Pinterest Username
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  pinterest.com/
                </span>
                <input
                  type="text"
                  id="socialMedia.pinterest"
                  name="socialMedia.pinterest"
                  className="flex-1 p-2 border border-gray-300 rounded-r-md"
                  value={formData.socialMedia.pinterest}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800"
        >
          Save Settings
        </button>
      </div>
    </form>
  )
}
