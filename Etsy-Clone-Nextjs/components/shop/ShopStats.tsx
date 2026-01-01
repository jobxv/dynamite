"use client";
import { getSellerStats } from "@/app/api";
import { SellerStat } from "@/data/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ShopStats() {
  const [stats, setStats] = useState<SellerStat[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await getSellerStats();

      if (response.success && response.data) {
        setStats(response.data);
      } else toast.error("Error Fetcing activities");
    };
    fetchStats().finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading && <div className="animate-pulse">loading...</div>}
      {!loading &&
        stats &&
        stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">{stat.name}</div>
            <div className="text-2xl font-medium mt-1">
              {stat.type === "currency" && "$"}
              {stat.value}
            </div>
            <div
              className={`text-sm mt-2 ${
                stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.type === "currency" && "$"}
              {stat.change} from last month
            </div>
          </div>
        ))}
    </div>
  );
}
