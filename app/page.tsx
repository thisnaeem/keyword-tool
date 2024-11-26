'use client';

import { SignInButton } from "@clerk/nextjs";
import {
  IconSearch,
  IconCalendar,
  IconChartBar,
  IconArrowRight,
  IconBrandGoogle,
} from "@tabler/icons-react";

const features = [
  {
    icon: IconSearch,
    title: "Keyword Research",
    description: "Find profitable keywords and analyze search trends across multiple stock platforms.",
  },
  {
    icon: IconCalendar,
    title: "Event Planning",
    description: "Plan your content around upcoming events, holidays, and seasonal trends.",
  },
  {
    icon: IconChartBar,
    title: "Niche Analysis",
    description: "Discover trending niches and untapped opportunities in the stock market.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#97ef39] to-[#7bc62d]">
                Microstock Content Planner
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Your all-in-one platform for researching, planning, and optimizing your microstock content strategy across multiple platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignInButton mode="modal">
                <button className="inline-flex items-center px-6 py-3 text-white bg-[#97ef39] hover:bg-[#88d633]  transition-all duration-200 shadow-md hover:shadow-lg">
                  Get Started
                  <IconArrowRight className="ml-2 w-5 h-5" />
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="inline-flex items-center px-6 py-3 text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 transition-all duration-200">
                  <IconBrandGoogle className="mr-2 w-5 h-5 text-red-500" />
                  Continue with Google
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800  shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-[#97ef39]/10  flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#97ef39]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>


      {/* CSS for Background Pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #97ef3920 1px, transparent 1px),
            linear-gradient(to bottom, #97ef3920 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
    </div>
  );
}
