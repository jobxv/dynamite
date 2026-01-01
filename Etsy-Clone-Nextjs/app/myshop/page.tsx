import { ShopStats } from "@/components/shop/ShopStats"
import { RecentActivity } from "@/components/shop/RecentActivity"
import { QuickActions } from "@/components/shop/QuickActions"

export default function ShopDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Shop Dashboard</h1>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
      </div>

      <ShopStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
