"use client";
import { fetchSellerOrders } from "@/app/api";
import { OrderList } from "@/components/shop/OrderList";
import { SellerOrder } from "@/data/types";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState<SellerOrder[]>([]); // State to hold fetched orders
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage errors

  // Effect to fetch orders when the component mounts
  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null); // Clear any previous errors

      try {
        // Call the external fetching function
        const fetchedOrders = await fetchSellerOrders();
        setOrders(fetchedOrders); // Update state with fetched orders
      } catch (err: any) {
        setError(err.message || "An error occurred while loading orders.");
        setOrders([]); // Clear orders on error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadOrders(); // Call the async function inside useEffect
  }, []); // Empty dependency array means this effect runs only once on mount

   // Filter orders based on the selected filter state
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") {
      return true; // Show all orders
    }
    return order.status.toLowerCase() === filter.toLowerCase(); // Filter by status
  });


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">Orders</h1>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="mb-4 flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full text-sm ${filter === "all" ? "bg-black text-white" : "bg-gray-100"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${filter === "processing" ? "bg-black text-white" : "bg-gray-100"}`}
            onClick={() => setFilter("processing")}
          >
            Processing
          </button>
          <button
             // Note: Your backend query doesn't explicitly return 'Shipped' status,
             // adjust this filter or backend query if 'Shipped' is a distinct status.
             // For now, this button will filter based on the status returned by the API.
            className={`px-3 py-1 rounded-full text-sm ${filter === "shipped" ? "bg-black text-white" : "bg-gray-100"}`}
            onClick={() => setFilter("shipped")}
          >
            Shipped
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${filter === "completed" ? "bg-black text-white" : "bg-gray-100"}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {/* Display loading, error, or the order list */}
        {loading && <div className="text-center py-8 text-gray-500">Loading orders...</div>}
        {error && <div className="text-center py-8 text-red-500">Error: {error}</div>}
        {!loading && !error && <OrderList orders={filteredOrders} />}

      </div>
    </div>
  );
}
