"use client";

import { IconPhoto, IconEye, IconTrendingUp, IconBulb, IconSearch, IconCalendar } from "@tabler/icons-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Welcome to Earnlyzer
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your all-in-one platform for stock content research and market analysis
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Keywords Tool */}
        <div className="bg-white dark:bg-gray-800 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Keywords Tool</p>
              <h3 className="text-2xl font-bold mt-1">1M+</h3>
              <p className="text-sm text-[#97ef39] mt-1">Searchable Keywords</p>
            </div>
            <div className="bg-[#97ef39]/10 p-3">
              <IconSearch className="w-6 h-6 text-[#97ef39]" />
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/keywords"
              className="text-sm text-[#97ef39] hover:text-[#97ef39]/80 font-medium flex items-center gap-1"
            >
              Try Keyword Research
              <IconTrendingUp className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Events Calendar */}
        <div className="bg-white dark:bg-gray-800 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Events Calendar</p>
              <h3 className="text-2xl font-bold mt-1">365</h3>
              <p className="text-sm text-[#97ef39] mt-1">Days of Events</p>
            </div>
            <div className="bg-[#97ef39]/10 p-3">
              <IconCalendar className="w-6 h-6 text-[#97ef39]" />
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/events"
              className="text-sm text-[#97ef39] hover:text-[#97ef39]/80 font-medium flex items-center gap-1"
            >
              View Events Calendar
              <IconTrendingUp className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Market Trends */}
        <div className="bg-white dark:bg-gray-800 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Market Trends</p>
              <h3 className="text-2xl font-bold mt-1">50+</h3>
              <p className="text-sm text-[#97ef39] mt-1">Trending Niches</p>
            </div>
            <div className="bg-[#97ef39]/10 p-3">
              <IconBulb className="w-6 h-6 text-[#97ef39]" />
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/niches"
              className="text-sm text-[#97ef39] hover:text-[#97ef39]/80 font-medium flex items-center gap-1"
            >
              Explore Niches
              <IconTrendingUp className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-white dark:bg-gray-800 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Available Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <IconSearch className="w-5 h-5 text-[#97ef39]" />
              <span className="font-medium">Keyword Research</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Find high-performing keywords with search volume and competition metrics
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <IconCalendar className="w-5 h-5 text-[#97ef39]" />
              <span className="font-medium">Events Calendar</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Stay ahead with upcoming events, holidays, and celebrations
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <IconBulb className="w-5 h-5 text-[#97ef39]" />
              <span className="font-medium">Niche Analysis</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Discover trending niches and market opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-white dark:bg-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Recent Updates
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-[#97ef39]/10 p-2">
              <IconTrendingUp className="w-4 h-4 text-[#97ef39]" />
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                CSV Generator Tool Launched
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Generate CSV files for batch uploading to stock platforms
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-[#97ef39]/10 p-2">
              <IconTrendingUp className="w-4 h-4 text-[#97ef39]" />
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Enhanced Keyword Research
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Added search volume trends and competition metrics
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-[#97ef39]/10 p-2">
              <IconTrendingUp className="w-4 h-4 text-[#97ef39]" />
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Events Calendar
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Now includes international holidays and observances
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}