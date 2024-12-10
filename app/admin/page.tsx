"use client";

import { motion } from "framer-motion";
import { IconUsers, IconPhoto, IconTrendingUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface DashboardStats {
  totalUsers: number;
  userGrowth: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const dashboardStats = [
    {
      name: "Total Users",
      value: loading ? "..." : stats?.totalUsers.toLocaleString(),
      change: loading ? "..." : stats?.userGrowth,
      icon: IconUsers,
    },
    {
      name: "Content Items",
      value: "12.5K",
      change: "+15.1%",
      icon: IconPhoto,
    },
    {
      name: "Revenue",
      value: "$12,345",
      change: "+8.2%",
      icon: IconTrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardStats.map((stat) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-[#97ef39]/10">
                <stat.icon className="w-6 h-6 text-[#97ef39]" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-[#97ef39]">{stat.change}</span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">
                vs last month
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
