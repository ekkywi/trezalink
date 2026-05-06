"use client";

import { useState } from "react";
import { Search, Bell, User, LogOut, Settings } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useRouter } from "next/navigation";

interface TopNavProps {
  merchant: {
    businessName: string;
    email: string;
  } | null;
}

export function TopNav({ merchant }: TopNavProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <header className="h-14 bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-[#2A2A2A] flex items-center justify-between px-4">
      <div className="flex items-center gap-4 text-xs font-medium">
        <span className="text-gray-500 dark:text-gray-400 uppercase tracking-wider">Network</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-green-600 dark:text-green-400">Solana Operational</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input type="text" placeholder="Search..." className="bg-[#F4F5F7] dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-md py-1.5 pl-8 pr-3 text-xs w-48" />
        </div>
        
        <ThemeToggle />
        
        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
          >
            <User size={16} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg shadow-xl py-1 animate-in fade-in zoom-in duration-150">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-[#2A2A2A]">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Merchant Account</p>
                <p className="text-xs font-bold dark:text-white truncate">
                  {merchant?.email || "admin@tokokripto.com"}
                </p>
              </div>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#2A2A2A]">
                <Settings size={14} /> Settings
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}