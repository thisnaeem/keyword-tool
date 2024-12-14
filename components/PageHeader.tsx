import { IconSearch, IconDownload, IconBrandPatreon } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

interface PageHeaderProps {
  title: string;
  onSearch?: () => void;
  isLoading?: boolean;
}

export function PageHeader({ title, onSearch, isLoading }: PageHeaderProps) {
  const pathname = usePathname();

  const getActionButton = () => {
    if (pathname.includes("/keywords")) {
      return null; // Keywords page has its own search input
    }

    const buttonText = pathname.includes("/events") 
      ? "Search Events" 
      : pathname.includes("/niches")
      ? "Find Trending Niches"
      : "";

    if (!buttonText) return null;

    return (
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="px-6 py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 
        transition-colors duration-300 flex items-center gap-2 relative overflow-hidden group"
      >
        <IconSearch className="w-5 h-5 text-white relative z-10" />
        <span className="text-white font-medium relative z-10">
          {isLoading ? "Searching..." : buttonText}
        </span>
        <div className="absolute inset-0 bg-black/20 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-300" />
      </button>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex items-center gap-4">
          {getActionButton()}
          <div className="flex items-center gap-2">
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
              href="/download-csv-tool"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white
              transition-colors duration-300 flex items-center gap-2 relative overflow-hidden group"
            >
              <IconDownload className="w-5 h-5 text-white relative z-10" />
              <span className="text-white font-medium relative z-10">Download CSV Tool</span>
              <div className="absolute inset-0 bg-black/20 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 