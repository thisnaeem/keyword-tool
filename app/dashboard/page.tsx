"use client";

import { IconSearch, IconCalendar, IconBulb, IconArrowUpRight, IconDownload } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stats = [
  {
    name: "Keywords Tool",
    value: "1M+",
    label: "Searchable Keywords",
    link: "/dashboard/keywords",
    icon: IconSearch,
    color: "from-emerald-400/10 to-emerald-400/5",
    accentColor: "text-emerald-400"
  },
  {
    name: "Events Calendar",
    value: "365",
    label: "Days of Events",
    link: "/dashboard/events",
    icon: IconCalendar,
    color: "from-blue-400/10 to-blue-400/5",
    accentColor: "text-blue-400"
  },
  {
    name: "Market Trends",
    value: "50+",
    label: "Trending Niches",
    link: "/dashboard/niches",
    icon: IconBulb,
    color: "from-purple-400/10 to-purple-400/5",
    accentColor: "text-purple-400"
  }
];

const tools = [
  {
    name: "Keyword Research",
    description: "Find high-performing keywords with search volume and competition metrics",
    icon: IconSearch,
    link: "/dashboard/keywords",
    color: "group-hover:text-emerald-400"
  },
  {
    name: "Events Calendar",
    description: "Stay ahead with upcoming events, holidays, and celebrations",
    icon: IconCalendar,
    link: "/dashboard/events",
    color: "group-hover:text-blue-400"
  },
  {
    name: "Niche Analysis",
    description: "Discover trending niches and market opportunities",
    icon: IconBulb,
    link: "/dashboard/niches",
    color: "group-hover:text-purple-400"
  }
];

const updates = [
  {
    title: "CSV Generator Tool Launched",
    description: "Generate CSV files for batch uploading to stock platforms",
    icon: IconDownload,
    date: "New"
  },
  {
    title: "Enhanced Keyword Research",
    description: "Added search volume trends and competition metrics",
    icon: IconSearch,
    date: "Updated"
  },
  {
    title: "Events Calendar",
    description: "Now includes international holidays and observances",
    icon: IconCalendar,
    date: "Updated"
  }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-2xl font-bold">Welcome to Earnlyzer</h1>
          <p className="text-gray-400">Your all-in-one platform for stock content research and market analysis</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
              variants={fadeInUp}
            >
              <Link href={stat.link} className="block">
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${stat.color} p-6 border border-white/5 hover:border-white/10 transition-colors`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-black/20">
                      <stat.icon className={`w-6 h-6 ${stat.accentColor}`} />
                    </div>
                    <IconArrowUpRight className={`w-5 h-5 ${stat.accentColor}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`text-3xl font-bold ${stat.accentColor}`}>{stat.value}</h3>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tools Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Available Tools</h2>
            <div className="grid gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2 + index * 0.1 }}
                  variants={fadeInUp}
                >
                  <Link href={tool.link} className="group">
                    <div className="rounded-xl bg-gray-800/50 border border-white/5 p-6 hover:bg-gray-800/70 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-black/20">
                          <tool.icon className={`w-6 h-6 transition-colors ${tool.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{tool.name}</h3>
                            <IconArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="mt-1 text-sm text-gray-400">{tool.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Updates Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
            <div className="rounded-xl bg-gray-800/50 border border-white/5 p-6">
              <div className="space-y-6">
                {updates.map((update, index) => (
                  <motion.div
                    key={update.title}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.3 + index * 0.1 }}
                    variants={fadeInUp}
                    className="flex gap-4"
                  >
                    <div className="p-2 rounded-lg bg-black/20 h-fit">
                      <update.icon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{update.title}</h3>
                        <span className="px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-xs">
                          {update.date}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">{update.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}