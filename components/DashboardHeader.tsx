"use client";

import { IconSearch, IconDownload, IconBrandPatreon, IconBulb } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface DashboardHeaderProps {
  onSearch?: () => void;
  isLoading?: boolean;
}

export function DashboardHeader() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.includes("/keywords")) return "Keyword Research";
    if (pathname.includes("/events")) return "Upcoming Events";
    if (pathname.includes("/niches")) return "Trending Niches";
    return "Dashboard";
  };

  return (
    <>
      <div className="bg-[#97ef39]/10 border-b border-[#97ef39]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-3 text-sm">
            <IconBulb className="w-5 h-5 text-[#97ef39]" />
            <span className="text-gray-700 dark:text-gray-200">
              We&apos;re continuously improving Earnlyzer! 
              <Link 
                href="/dashboard/feedback" 
                className="text-[#97ef39] hover:text-[#97ef39]/80 font-medium ml-1 underline-offset-4 hover:underline"
              >
                Share your feedback
              </Link>
              {" "}to help shape our upcoming features.
            </span>
          </div>
        </div>
      </div>
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {getPageTitle()}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.patreon.com/earnlyzer"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#FF424D] hover:bg-[#FF424D]/90 text-white
                transition-colors duration-300 flex items-center gap-2 relative overflow-hidden group"
              >
                <IconBrandPatreon className="w-5 h-5 text-white relative z-10" />
                <span className="text-white font-medium relative z-10">Support on Patreon</span>
                <div className="absolute inset-0 bg-black/20 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <a
                href="https://csvgen-xi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white
                transition-colors duration-300 flex items-center gap-2 relative overflow-hidden group"
              >
                <IconDownload className="w-5 h-5 text-white relative z-10" />
                <span className="text-white font-medium relative z-10">CSV Generator</span>
                <div className="absolute inset-0 bg-black/20 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-300" />
                <span className="absolute -top-2.5 -right-2.5 bg-[#97ef39] text-[10px] px-1.5 py-0.5 font-medium">
                  NEW
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
} 