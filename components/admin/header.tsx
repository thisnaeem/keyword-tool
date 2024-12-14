import { IconMenu2, IconBell, IconUser } from "@tabler/icons-react";
import ProfileMenu from "@/components/ProfileMenu";

const Header = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 "
      >
        <IconMenu2 className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 ">
          <IconBell className="w-5 h-5" />
        </button>
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
