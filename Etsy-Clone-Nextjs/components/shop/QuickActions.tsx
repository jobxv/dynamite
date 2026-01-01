import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      label: "Add New Product",
      href: "/myshop/products/new",
      icon: "➕",
    },
    {
      label: "Process Orders",
      href: "/myshop/orders",
      icon: "📦",
    },
    {
      label: "Update Shop Settings",
      href: "/myshop/settings",
      icon: "⚙️",
    },
    {
      label: "View Shop Analytics",
      href: "/myshop/analytics",
      icon: "📊",
    },
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">Quick Actions</h2>

      <div className="space-y-2">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="flex items-center p-3 rounded-md hover:bg-gray-50 transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              {action.icon}
            </span>
            <span>{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
