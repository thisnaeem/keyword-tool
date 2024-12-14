"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconSearch,
  IconCalendar,
  IconChartBar,
  IconSettings,
  IconHome,
  IconChevronLeft,
  IconChevronRight,
  IconCode,
  IconLogin,
  IconBulb,
  IconLayoutDashboard,
  IconMessage,
  IconTools,
  IconShield,
} from "@tabler/icons-react";
import ProfileMenu from "./ProfileMenu";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    label: "Research",
    items: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: IconHome,
      },
      {
        name: "Keywords",
        path: "/dashboard/keywords",
        icon: IconSearch,
        badge: {
          text: "New",
          color: "bg-primary text-xs px-2 py-0.5 font-medium ml-2"
        }
      },
      {
        name: "Events",
        path: "/dashboard/events",
        icon: IconCalendar,
      },
      {
        name: "Niches",
        path: "/dashboard/niches",
        icon: IconChartBar,
      },
    ],
  },
  {
    label: "About",
    items: [
      { 
        name: "Feedback", 
        path: "/dashboard/feedback", 
        icon: IconMessage 
      },
      {
        name: "API Configuration",
        path: "/dashboard/settings",
        icon: IconTools,
      },
      { 
        name: "Developer", 
        path: "/dashboard/developer", 
        icon: IconCode 
      },
    ],
  },
];

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        <aside
          className={`${
            collapsed ? "w-16" : "w-64"
          } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!collapsed && (
              <Link href="/" className="flex items-center space-x-3">
                <IconHome className="w-6 h-6 text-[#97ef39]" />
                <span className="font-semibold">Earnlyzer</span>
              </Link>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 hover:bg-[#97ef39]/10 text-[#97ef39]"
            >
              {collapsed ? (
                <IconChevronRight size={20} />
              ) : (
                <IconChevronLeft size={20} />
              )}
            </button>
          </div>

          <nav className="h-full px-3 py-4 overflow-y-auto">
            {navItems.map((section) => (
              <div key={section.label} className="mb-6">
                {!collapsed && (
                  <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {section.label}
                  </h3>
                )}
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center px-4 py-2.5 mb-1 text-sm transition-colors ${
                        pathname === item.path
                          ? "bg-[#97ef39]/10 text-[#97ef39] dark:bg-[#97ef39]/20"
                          : "text-gray-700 dark:text-gray-300 hover:bg-[#97ef39]/5 dark:hover:bg-[#97ef39]/10"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          pathname === item.path ? "text-[#97ef39]" : ""
                        }`}
                      />
                      {!collapsed && (
                        <>
                          <span className="ml-3">{item.name}</span>
                          {item.badge && (
                            <span className={item.badge.color}>
                              {item.badge.text}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}

            {session?.user?.role === "ADMIN" && (
              <div className="mb-6">
                {!collapsed && (
                  <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Admin
                  </h3>
                )}
                <Link
                  href="/admin"
                  className={`flex items-center px-4 py-2.5 mb-1 text-sm transition-colors ${
                    pathname === "/admin"
                      ? "bg-[#97ef39]/10 text-[#97ef39] dark:bg-[#97ef39]/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-[#97ef39]/5 dark:hover:bg-[#97ef39]/10"
                  }`}
                >
                  <IconShield className={`w-5 h-5 ${pathname === "/admin" ? "text-[#97ef39]" : ""}`} />
                  {!collapsed && <span className="ml-3">Admin Panel</span>}
                </Link>
              </div>
            )}
          </nav>

          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            {session ? (
              <ProfileMenu />
            ) : (
              <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <IconLogin className="w-5 h-5" />
                {!collapsed && <span>Sign In</span>}
              </button>
            )}
          </div>
        </aside>

        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
