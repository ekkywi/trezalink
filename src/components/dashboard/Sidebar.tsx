// src/components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Activity, Terminal, Settings, LinkIcon, BarChart3 } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { href: "/dashboard", label: "Portfolio", icon: <LayoutDashboard size={16}/> },
    { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 size={16}/> },
    { href: "/dashboard/payments", label: "Transactions", icon: <Activity size={16}/> },
    { href: "/dashboard/payment-links", label: "Payment Links", icon: <LinkIcon size={16}/> },
    { href: "/dashboard/developers", label: "Developers", icon: <Terminal size={16}/> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings size={16}/> },
  ];

  return (
    <aside className="w-56 flex flex-col bg-white dark:bg-[#1E1E1E] border-r border-gray-200 dark:border-[#2A2A2A] z-20">
      <div className="h-14 flex items-center px-4 border-b border-gray-200 dark:border-[#2A2A2A]">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-2">
          <span className="text-white font-bold text-xs">T</span>
        </div>
        <span className="font-bold text-sm tracking-tight dark:text-white italic">TREZALINK</span>
      </div>
      
      <nav className="flex-1 py-4 space-y-1 px-2">
        {menu.map((item) => {
          const isActive = item.href === '/dashboard' 
            ? pathname === item.href 
            : pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.href} 
              href={item.href}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
                isActive 
                  ? "bg-blue-50 dark:bg-[#2A2D35] text-blue-600 dark:text-blue-400" 
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-[#2A2A2A]"
              }`}
            >
              {item.icon} {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}