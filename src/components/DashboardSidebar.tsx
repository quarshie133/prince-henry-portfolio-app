"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  LogOut,
  Settings,
  User,
  PanelLeftClose,
  Menu,
  Users,
  MessageSquare
} from "lucide-react";
import { useState } from "react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // For mobile sidebar

  const handleLogout = () => {
    signOut({ callbackUrl: '/dashboard/login' });
  };

  const SidebarLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
    const isActive = href === '/dashboard'
      ? pathname === href
      : pathname.startsWith(href);

    return (
      <Link
        href={href}
        onClick={() => setIsOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${isActive
            ? "bg-black text-white dark:bg-white dark:text-black shadow-md placeholder-hover"
            : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
          }`}
      >
        {icon}
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 p-4 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-xl"
      >
        <Menu size={24} />
      </button>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#111] border-r border-gray-200 dark:border-gray-800 flex flex-col z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
          <Link href="/dashboard" className="font-serif text-xl font-medium tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center text-sm">W</span>
            Admin Panel
          </Link>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 hover:text-black dark:hover:text-white">
            <PanelLeftClose size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-8 flex flex-col gap-8">
          {/* User Profile Summary */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-sm font-medium">
                PH
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">Nibenang P. Henry</p>
                <p className="text-xs text-gray-500 truncate">Administrator</p>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <SidebarLink href="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          </div>

          <div className="space-y-1">
            <div className="px-3 mb-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Content
            </div>
            <SidebarLink href="/dashboard/poetry" icon={<BookOpen size={18} />} label="Poetry Posts" />
            <SidebarLink href="/dashboard/stories" icon={<FileText size={18} />} label="Short Stories" />
            <SidebarLink href="/dashboard/subscribers" icon={<Users size={18} />} label="Subscribers" />
            <SidebarLink href="/dashboard/messages" icon={<MessageSquare size={18} />} label="Messages" />
          </div>

          <div className="space-y-1">
            <div className="px-3 mb-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Site Settings
            </div>
            <SidebarLink href="/dashboard/settings/hero" icon={<LayoutDashboard size={18} />} label="Hero Section" />
            <SidebarLink href="/dashboard/settings/appearance" icon={<LayoutDashboard size={18} />} label="Appearance" />
            <SidebarLink href="/dashboard/settings/about" icon={<User size={18} />} label="About Page" />
            <SidebarLink href="/dashboard/settings/socials" icon={<Settings size={18} />} label="Social Links" />
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all font-medium text-sm group">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
