"use client";

import { useState } from "react";
import { 
  LayoutDashboard, CreditCard, Key, Settings, 
  BarChart3, Wallet, Bell, Search, Plus 
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { WalletOverview } from "@/components/dashboard/WalletOverview";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] dark:bg-[#0B0E14] transition-colors duration-500">
      
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-72 flex-col bg-white dark:bg-[#0B0E14] border-r border-gray-100 dark:border-white/5 h-screen sticky top-0 transition-colors">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 rotate-3">
              <span className="text-white font-black text-xl italic">K</span>
            </div>
            <span className="font-black text-2xl tracking-tighter italic dark:text-white">KIRUPAY</span>
          </div>

          <nav className="space-y-3">
            {[
              { id: "overview", label: "Dashboard", icon: <LayoutDashboard size={18}/> },
              { id: "payments", label: "Payments", icon: <CreditCard size={18}/> },
              { id: "api", label: "Developers", icon: <Key size={18}/> },
              { id: "settings", label: "Settings", icon: <Settings size={18}/> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-sm font-bold transition-all ${
                  activeTab === item.id 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20" 
                    : "text-gray-400 hover:text-blue-600 dark:hover:text-white"
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-24 px-8 flex items-center justify-between sticky top-0 bg-[#FDFDFD]/80 dark:bg-[#0B0E14]/80 backdrop-blur-xl z-50 border-b border-gray-100 dark:border-white/5">
          <div>
            <h2 className="text-2xl font-black tracking-tight dark:text-white uppercase italic">{activeTab}</h2>
            <p className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mt-1">Kirupay Core Engine</p>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-500 hover:text-blue-600">
               <Bell size={18} />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-sm font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all">
              <Plus size={18} /> <span className="hidden sm:inline italic">Collect</span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard label="Net Revenue" value="IDR 82.4M" trend="+14.2%" trendUp icon={<BarChart3 />} />
            <StatCard label="Success Rate" value="99.2%" trend="+0.4%" trendUp icon={<CreditCard />} />
            <StatCard label="Gas Savings" value="IDR 1.2M" trend="+5.2%" trendUp icon={<Wallet />} />
            <StatCard label="Active APIs" value="12" trend="Stable" trendUp icon={<Key />} />
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1">
              <WalletOverview />
            </div>
            <div className="xl:col-span-2">
              <div className="bg-white dark:bg-[#11151D] border border-gray-100 dark:border-white/10 rounded-[2.5rem] p-8 h-full">
                <h3 className="text-xl font-black dark:text-white italic mb-6">Recent Activity</h3>
                <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                  <BarChart3 size={48} className="opacity-10 mb-4" />
                  <p className="text-sm font-bold uppercase tracking-widest">Awaiting Transactions...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}