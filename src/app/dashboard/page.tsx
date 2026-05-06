"use client";

import { useState } from "react";
import { 
  LayoutDashboard, CreditCard, Key, Settings, 
  Search, Bell, ArrowUpRight, ArrowDownRight, 
  Activity, Clock, ChevronRight
} from "lucide-react";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

// Mock Data Transaksi ala "Order Book"
const recentTransactions = [
  { id: "TX-9921", time: "12:41:05", type: "Payment", amount: "Rp 450.000", status: "Success", trend: "up" },
  { id: "TX-9920", time: "12:38:12", type: "Withdraw", amount: "Rp 1.200.000", status: "Pending", trend: "down" },
  { id: "TX-9919", time: "12:15:00", type: "Payment", amount: "Rp 85.000", status: "Success", trend: "up" },
  { id: "TX-9918", time: "11:59:22", type: "Payment", amount: "Rp 2.100.000", status: "Success", trend: "up" },
  { id: "TX-9917", time: "11:05:10", type: "Fee", amount: "Rp 4.500", status: "Deducted", trend: "down" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    // Background dibuat flat abu-abu sangat terang (Light) atau Charcoal pekat (Dark) ala Stockbit
    <div className="flex h-screen overflow-hidden bg-[#F4F5F7] dark:bg-[#121212] text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      
      {/* SIDEBAR - Sangat slim, fungsional, tanpa gradien */}
      <aside className="w-56 flex flex-col bg-white dark:bg-[#1E1E1E] border-r border-gray-200 dark:border-[#2A2A2A] z-20">
        <div className="h-14 flex items-center px-4 border-b border-gray-200 dark:border-[#2A2A2A]">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-2">
            <span className="text-white font-bold text-xs">K</span>
          </div>
          <span className="font-bold text-sm tracking-tight dark:text-white">KIRUPAY PRO</span>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {[
            { id: "overview", label: "Portfolio", icon: <LayoutDashboard size={16}/> },
            { id: "payments", label: "Transactions", icon: <Activity size={16}/> },
            { id: "api", label: "API Console", icon: <Key size={16}/> },
            { id: "settings", label: "Settings", icon: <Settings size={16}/> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
                activeTab === item.id 
                  ? "bg-blue-50 dark:bg-[#2A2D35] text-blue-600 dark:text-blue-400" 
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] dark:text-gray-400"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER Ticker - Ramping (h-14), persis seperti top bar platform trading */}
        <header className="h-14 bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-[#2A2A2A] flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-gray-500 dark:text-gray-400 uppercase tracking-wider">Market Status</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-green-600 dark:text-green-400">Solana Network Operational</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search TXID..." 
                className="bg-[#F4F5F7] dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-md py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:border-blue-500 transition-colors w-48"
              />
            </div>
            <ThemeToggle />
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-[#2A2A2A] text-gray-500">
               <Bell size={16} />
            </button>
          </div>
        </header>

        {/* DASHBOARD GRID - Padding ketat, meminimalkan white space */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
            
            {/* KOLOM KIRI: PORTFOLIO WIDGET (Lebar 3/12 atau 4/12) */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Balance Card - Ala Stockbit Portfolio */}
              <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-5">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium uppercase tracking-wider">Merchant Balance</p>
                <h2 className="text-3xl font-bold dark:text-white tracking-tight">Rp 14.205.000</h2>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex items-center text-green-600 dark:text-green-500 text-xs font-semibold bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded">
                    <ArrowUpRight size={12} className="mr-0.5" /> +Rp 1.450.000 (11.3%)
                  </span>
                  <span className="text-xs text-gray-400">Today</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-colors">
                    Collect Payment
                  </button>
                  <button className="py-2 bg-gray-100 dark:bg-[#2A2D35] hover:bg-gray-200 dark:hover:bg-[#343842] dark:text-white rounded text-xs font-semibold transition-colors border border-transparent dark:border-[#3A3F4A]">
                    Withdraw
                  </button>
                </div>
              </div>

              {/* Asset Allocation / Mini Stats */}
              <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-4">
                <h3 className="text-xs font-semibold mb-4 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Asset Holding</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">IDR (Rupiah)</span>
                    <span className="text-sm font-medium">10.050.000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">SOL (Solana)</span>
                    <div className="text-right">
                      <span className="text-sm font-medium block">42.50</span>
                      <span className="text-[10px] text-gray-400">≈ Rp 4.155.000</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* KOLOM KANAN: DATA & TRANSACTIONS (Lebar 8/12) */}
            <div className="lg:col-span-8 space-y-4 flex flex-col">
              
              {/* Mini Chart Area (Bisa diisi Recharts nanti) */}
              <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-4 h-48 flex flex-col">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Intraday Volume</h3>
                    <div className="flex gap-2">
                      {['1D', '1W', '1M', 'YTD'].map(tf => (
                        <button key={tf} className={`text-[10px] px-2 py-1 rounded font-semibold ${tf === '1D' ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2A2A2A]'}`}>
                          {tf}
                        </button>
                      ))}
                    </div>
                 </div>
                 <div className="flex-1 flex items-center justify-center border border-dashed border-gray-200 dark:border-[#2A2A2A] rounded bg-gray-50 dark:bg-[#121212]">
                    <Activity className="text-gray-300 dark:text-[#2A2A2A] w-8 h-8" />
                 </div>
              </div>

              {/* Transaction Order Book - Data Table pekat */}
              <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg flex-1 overflow-hidden flex flex-col min-h-[300px]">
                <div className="p-3 border-b border-gray-200 dark:border-[#2A2A2A] flex justify-between items-center">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recent Transactions</h3>
                  <button className="text-[10px] font-semibold text-blue-600 hover:underline flex items-center">View All <ChevronRight size={12}/></button>
                </div>
                
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-[#F4F5F7] dark:bg-[#1A1A1A] text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-[#2A2A2A]">
                  <div className="col-span-3">TXID / Time</div>
                  <div className="col-span-3">Type</div>
                  <div className="col-span-3 text-right">Amount</div>
                  <div className="col-span-3 text-right">Status</div>
                </div>

                {/* Table Body */}
                <div className="overflow-y-auto flex-1 p-2">
                  {recentTransactions.map((tx, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-4 px-2 py-2.5 hover:bg-gray-50 dark:hover:bg-[#252525] rounded transition-colors text-xs items-center cursor-pointer border-b border-gray-50 dark:border-[#222222] last:border-0">
                      <div className="col-span-3">
                        <span className="font-mono font-medium block dark:text-gray-200">{tx.id}</span>
                        <span className="text-[10px] text-gray-400 flex items-center mt-0.5"><Clock size={10} className="mr-1"/> {tx.time}</span>
                      </div>
                      <div className="col-span-3 font-medium text-gray-600 dark:text-gray-300">
                        {tx.type}
                      </div>
                      <div className={`col-span-3 text-right font-mono font-semibold ${tx.trend === 'up' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {tx.trend === 'up' ? '+' : '-'}{tx.amount}
                      </div>
                      <div className="col-span-3 text-right">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${tx.status === 'Success' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400' : 'bg-gray-100 text-gray-600 dark:bg-[#2A2A2A] dark:text-gray-400'}`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}