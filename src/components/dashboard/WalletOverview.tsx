"use client";
import { ArrowUpRight, Wallet, TrendingUp, History } from "lucide-react";

export const WalletOverview = () => (
  <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-5 flex flex-col justify-between shadow-sm transition-colors">
    <div className="flex justify-between items-start mb-6">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1">Estimated Portfolio Value</p>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight font-mono">
          Rp 14.205.000
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded flex items-center">
            <ArrowUpRight size={12} className="mr-0.5" /> +11.3%
          </span>
          <span className="text-[10px] text-gray-400 font-medium">Today's P/L</span>
        </div>
      </div>
      <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600">
        <TrendingUp size={20} />
      </div>
    </div>

    <div className="space-y-3 mb-6">
      <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-[#262626]">
        <span className="text-xs text-gray-500 font-medium">Solana Balance</span>
        <span className="text-xs font-bold font-mono">42.50 SOL</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-[#262626]">
        <span className="text-xs text-gray-500 font-medium">Rupiah Cash</span>
        <span className="text-xs font-bold font-mono">Rp 10.050.000</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <button className="flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-[11px] font-bold uppercase tracking-wider transition-all">
        <Wallet size={14} /> Deposit
      </button>
      <button className="flex items-center justify-center gap-2 py-2.5 bg-gray-100 dark:bg-[#2A2A2A] hover:bg-gray-200 dark:hover:bg-[#333333] text-gray-700 dark:text-gray-300 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all border border-gray-200 dark:border-[#3A3A3A]">
        <History size={14} /> History
      </button>
    </div>
  </div>
);