"use client";
import { motion } from "framer-motion";
import { IconArrowUpRight, IconUsers, IconPhoto, IconTrendingUp } from "@tabler/icons-react";

const stats = [
  {
    name: "Total Uploads",
    value: "1,234",
    change: "+12.3%",
    icon: IconPhoto,
  },
  {
    name: "Portfolio Views",
    value: "12.5K",
    change: "+15.1%",
    icon: IconUsers,
  },
  {
    name: "Revenue",
    value: "$12,345",
    change: "+8.2%",
    icon: IconTrendingUp,
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-[#97ef39]/10">
                <stat.icon className="w-6 h-6 text-[#97ef39]" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-green-500 flex items-center">
                {stat.change}
                <IconArrowUpRight className="w-4 h-4 ml-1" />
              </span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Add your recent activity items here */}
          <p className="text-gray-600 dark:text-gray-400">No recent activity</p>
        </div>
      </motion.div>
    </div>
  );
}