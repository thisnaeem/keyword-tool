"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { IconHome, IconSearch, IconCalendar, IconChartBar, IconMessage, IconSettings, IconCode, IconBrandGithub, IconUser, IconLogout, IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const menuItems = [
  {
    title: "RESEARCH",
    items: [
      {
        name: "Dashboard",
        icon: IconHome,
        href: "/dashboard",
      },
      {
        name: "Keywords",
        icon: IconSearch,
        href: "/dashboard/keywords",
        badge: "New"
      },
      {
        name: "Events",
        icon: IconCalendar,
        href: "/dashboard/events",
      },
      {
        name: "Niches",
        icon: IconChartBar,
        href: "/dashboard/niches",
      },
    ],
  },
  {
    title: "ABOUT",
    items: [
      {
        name: "Feedback",
        icon: IconMessage,
        href: "/dashboard/feedback",
      },
      {
        name: "API Configuration",
        icon: IconSettings,
        href: "/dashboard/api-config",
      },
      {
        name: "Developer",
        icon: IconCode,
        href: "/dashboard/developer",
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  // Hide sidebar on landing page or when not authenticated
  if (pathname === '/' || status !== "authenticated") {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 border-r border-white/5 w-64">
      {/* Logo */}
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
            <IconBrandGithub className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Earnlyzer
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-6 px-2 py-4 overflow-y-auto">
        {menuItems.map((section) => (
          <div key={section.title}>
            <div className="px-4 mb-2">
              <span className="text-xs font-medium text-gray-400">{section.title}</span>
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={cn(
                        "relative flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200",
                        "hover:bg-white/5",
                        isActive && "bg-white/5"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute left-0 w-1 h-6 bg-emerald-400 rounded-full"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                      <item.icon
                        className={cn(
                          "w-5 h-5 transition-colors",
                          isActive ? "text-emerald-400" : "text-gray-400"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors",
                          isActive ? "text-white" : "text-gray-400"
                        )}
                      >
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-emerald-400/10 text-emerald-400 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 mt-4 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-lg font-bold text-white">Csvgen</h2>
        <p className="text-gray-400">A software to generate metadata for microstock.</p>
        <a 
          href="https://csvgen-xi.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-2 inline-block px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors transform hover:scale-105"
        >
          Download
        </a>
      </div>

      {/* User Profile with Dropdown */}
      <div className="p-4 border-t border-white/5">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center gap-3 px-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
            <span className="text-sm font-medium text-white">NA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Naeem Anjum</p>
            <p className="text-xs text-gray-400 truncate">@naemanjum076</p>
          </div>
          <IconChevronDown className={cn(
            "w-4 h-4 text-gray-400 transition-transform duration-200",
            isDropdownOpen && "transform rotate-180"
          )} />
        </button>

        {/* Dropdown Menu */}
        <div className={cn(
          "mt-2 py-2 px-2 space-y-1",
          isDropdownOpen ? "block" : "hidden"
        )}>
          <Link 
            href="/dashboard/profile" 
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <IconUser className="w-4 h-4" />
            Profile
          </Link>
          <Link 
            href="/dashboard/settings" 
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <IconSettings className="w-4 h-4" />
            Settings
          </Link>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors"
          >
            <IconLogout className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 