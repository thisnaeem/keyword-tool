import { IconDashboard, IconUsers, IconSettings, IconChartBar, IconChevronLeft, IconMessage, IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  
  const menuItems = [
    { title: "Dashboard", icon: IconDashboard, path: "/admin" },
    { title: "Users", icon: IconUsers, path: "/admin/users" },
    { title: "Analytics", icon: IconChartBar, path: "/admin/analytics" },
    { title: "Settings", icon: IconSettings, path: "/admin/settings" },
    { title: "Feedback", icon: IconMessage, path: "/admin/feedbacks" },
    { title: "Go to Dashboard", icon: IconDashboard, path: "/dashboard", },
    { title: "Go to Home", icon: IconHome, path: "/", },
  ];

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 
      dark:border-gray-700 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xl font-semibold">Admin Panel</span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
        >
          <IconChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center px-4 py-2.5 text-sm transition-colors ${
              pathname === item.path
                ? "bg-[#97ef39]/10 text-[#97ef39]"
                : "text-gray-700 dark:text-gray-300 hover:bg-[#97ef39]/5"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
