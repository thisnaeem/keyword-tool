'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  IconSearch, 
  IconCalendar, 
  IconChartBar, 
  IconSettings, 
  IconHome,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    label: 'Research',
    items: [
      { name: 'Keywords', path: '/research/keywords', icon: IconSearch },
      { name: 'Events', path: '/research/events', icon: IconCalendar },
      { name: 'Niches', path: '/research/niches', icon: IconChartBar },
    ],
  },
  {
    label: 'Settings',
    items: [
      { name: 'API Configuration', path: '/settings/api', icon: IconSettings },
    ],
  },
];

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!collapsed && (
              <Link href="/" className="flex items-center space-x-3">
                <IconHome className="w-6 h-6 text-[#97ef39]" />
                <span className="font-semibold">Content Planner</span>
              </Link>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg hover:bg-[#97ef39]/10 text-[#97ef39]"
            >
              {collapsed ? <IconChevronRight size={20} /> : <IconChevronLeft size={20} />}
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
                      className={`flex items-center px-4 py-2.5 mb-1 text-sm rounded-lg transition-colors ${
                        pathname === item.path
                          ? 'bg-[#97ef39]/10 text-[#97ef39] dark:bg-[#97ef39]/20'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-[#97ef39]/5 dark:hover:bg-[#97ef39]/10'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${pathname === item.path ? 'text-[#97ef39]' : ''}`} />
                      {!collapsed && <span className="ml-3">{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}