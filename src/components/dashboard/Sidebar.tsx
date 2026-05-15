// src/components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Activity, 
  Terminal, 
  Settings, 
  LinkIcon, 
  BarChart3,
  ShieldAlert,
  UserCog,
  Wrench
} from "lucide-react";

interface SidebarProps {
  role?: string;
}

// Definisikan tipe untuk struktur menu
type MenuItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

type MenuCategory = {
  title: string;
  items: MenuItem[];
};

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  // 1. Definisikan Kategori Menu Standar (Merchant)
  const menuCategories: MenuCategory[] = [
    {
      title: "OVERVIEW",
      items: [
        { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={16}/> },
        { href: "/analytics", label: "Analytics", icon: <BarChart3 size={16}/> },
      ]
    },
    {
      title: "OPERATIONS",
      items: [
        { href: "/payments", label: "Transactions", icon: <Activity size={16}/> },
        { href: "/payment-links", label: "Payment Links", icon: <LinkIcon size={16}/> },
      ]
    },
    {
      title: "MANAGEMENT",
      items: [
        { href: "/developers", label: "Developers", icon: <Terminal size={16}/> },
        { href: "/settings", label: "Settings", icon: <Settings size={16}/> },
      ]
    }
  ];

  // 2. Injeksi Kategori Khusus Admin (Hanya muncul jika Role = ADMIN)
  if (role === "ADMIN") {
  menuCategories.push({
    title: "ADMINISTRATION",
    items: [
      { href: "/admin/overview", label: "Overview", icon: <LayoutDashboard size={16}/> },
      { href: "/admin/merchants", label: "Merchant List", icon: <UserCog size={16}/> },
      { href: "/admin/maintenance", label: "Maintenance", icon: <Wrench size={16}/> },
    ]
  });
}

  return (
    <aside className="w-64 flex flex-col bg-white dark:bg-[#1E1E1E] border-r border-gray-200 dark:border-[#2A2A2A] z-20">
      {/* Brand Header */}
      <div className="h-14 flex items-center px-6 border-b border-gray-200 dark:border-[#2A2A2A]">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-2 shadow-sm">
          <span className="text-white font-bold text-xs">T</span>
        </div>
        <span className="font-bold text-sm tracking-tight dark:text-white italic">TREZALINK</span>
      </div>
      
      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto py-6 space-y-6 px-3 custom-scrollbar">
        {menuCategories.map((category, index) => (
          <div key={index} className="space-y-1">
            {/* Category Title */}
            <h4 className="px-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
              {category.title}
            </h4>
            
            {/* Category Items */}
            <div className="space-y-0.5">
              {category.items.map((item) => {
                // Logika aktif yang akurat
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                
                // Pembeda warna khusus untuk rute Admin agar terlihat eksklusif
                const isAdminRoute = item.href.startsWith("/admin");
                
                return (
                  <Link
                    key={item.href} 
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive 
                        ? isAdminRoute
                          ? "bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400"
                          : "bg-blue-50 dark:bg-[#2A2D35] text-blue-600 dark:text-blue-400" 
                        : "text-gray-500 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {item.icon} {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}