import { auth } from "@/auth";

import {
  IconSearch,
  IconCalendar,
  IconChartBar,
  IconArrowRight,
  IconBrandGoogle,
  IconRocket,
  IconBrain,
  IconTrendingUp,
} from "@tabler/icons-react";
import Link from "next/link";
import FaqSection from "@/components/landing/Faq";
import Hero from "@/components/landing/Hero";

const features = [
  {
    icon: IconSearch,
    title: "Keyword Research",
    description:
      "Find profitable keywords and analyze search trends across multiple stock platforms.",
  },
  {
    icon: IconCalendar,
    title: "Event Planning",
    description:
      "Plan your content around upcoming events, holidays, and seasonal trends.",
  },
  {
    icon: IconChartBar,
    title: "Niche Analysis",
    description:
      "Discover trending niches and untapped opportunities in the stock market.",
  },
];

const benefits = [
  {
    icon: IconRocket,
    title: "Boost Your Sales",
    description:
      "Optimize your content with high-performing keywords that buyers are searching for.",
  },
  {
    icon: IconBrain,
    title: "AI-Powered Insights",
    description:
      "Leverage advanced AI to identify emerging trends and market opportunities.",
  },
  {
    icon: IconTrendingUp,
    title: "Track Performance",
    description:
      "Monitor keyword performance and adjust your strategy for maximum impact.",
  },
];

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      <Hero session={session} />
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Powerful Features for Content Creators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-[#97ef39]/10 flex items-center justify-center mb-4">
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

      {/* Benefits Section */}
      <div className="bg-white dark:bg-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-[#97ef39]/10 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#97ef39]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to know about the platform
            </p>
          </div>

          <FaqSection />

          <div className="text-center mt-16">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Still have questions?
            </p>
            <Link href="/dashboard/feedback">
              <button className="inline-flex items-center px-6 py-3 text-black bg-[#97ef39] hover:bg-[#88d633] transition-all duration-200 shadow-md hover:shadow-lg rounded-lg">
                Contact Support
                <IconArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
