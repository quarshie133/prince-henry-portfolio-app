"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export default function DashboardTopbar() {
  const pathname = usePathname();

  // Simple title generator based on route
  const getRouteTitle = () => {
    if (pathname === '/dashboard') return 'Overview';
    if (pathname.includes('/poetry')) return 'Poetry Posts';
    if (pathname.includes('/stories')) return 'Short Stories';
    if (pathname.includes('/settings')) return 'Settings';
    return 'Writer\'s Dashboard';
  };

  return (
    <header className="h-16 bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 transition-colors">
      <div className="text-sm text-gray-500 font-medium hidden md:block">{getRouteTitle()}</div>
      {/* Mobile Title */}
      <div className="text-sm font-bold md:hidden">Admin Panel</div>
      
      <div className="flex items-center gap-3 md:gap-4">
        <a href="/" target="_blank" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
          View Site
        </a>
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-800"></div>
        <ThemeToggle />
      </div>
    </header>
  );
}
