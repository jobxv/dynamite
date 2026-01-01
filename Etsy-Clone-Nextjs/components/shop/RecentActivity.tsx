"use client";
import { getRecentData as getRecentSellerData } from "@/app/api";
import { SellerActivity } from "@/data/types";
import { Eye, Package, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function RecentActivity() {
  const [activities, setActivities] = useState<SellerActivity[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchActivities = async () => {
      const response = await getRecentSellerData();

      if (response.success && response.data) {
        setActivities(response.data);
      } else toast.error("Error Fetcing activities");
    };
    fetchActivities().finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">Recent Activity</h2>

      {loading && (
        <div>
          <p>Loading...</p>
        </div>
      )}

      {!loading && (
        <div className="space-y-4">
          {activities?.length && activities.length > 0 ? (
            activities?.map((activity, index) => (
              <div
                key={index}
                className="flex items-start border-b border-gray-100 pb-3 last:border-0"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    activity.type === "order_no_price"
                      ? "bg-blue-100 text-blue-600"
                      : activity.type === "review_no_price"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {activity.type === "order_no_price" ? (
                    <Package />
                  ) : activity.type === "review_no_price" ? (
                    <Star />
                  ) : (
                    <Eye />
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-medium">{activity.text}</div>
                  <div className="text-sm text-gray-500">
                    {activity.time_ago}
                  </div>
                </div>

                {activity.price && (
                  <div className="text-sm font-medium">{activity.price}</div>
                )}
              </div>
            ))
          ) : (
            <div>
              <p>No Activities to show.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
