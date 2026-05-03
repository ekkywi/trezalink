"use client";
import { Wallet, Fingerprint, ArrowUpRight } from "lucide-react";

export const WalletOverview = () => (
  <div className="relative p-8 rounded-[2.5rem] overflow-hidden min-h-[380px] flex flex-col justify-between bg-white dark:bg-[#11151D] border border-gray-100 dark:border-white/10 shadow-2xl">
    {/* Gradient Layer */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 opacity-100 dark:opacity-90"></div>
    
    {/* Decorative Mesh */}
    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-400/30 rounded-full blur-[80px] animate-pulse"></div>

    <div className="relative z-10">
      <div className="flex justify-between items-center mb-12">
        <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-50">Solana Network</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <Fingerprint size={20} className="text-white/70" />
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-blue-100/70 italic">Total Merchant Balance</p>
        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter italic leading-none">
          IDR 14.205.000
        </h2>
        <div className="flex items-center gap-2 pt-2">
           <span className="text-xs font-bold text-blue-200">42.50 SOL</span>
           <ArrowUpRight size={14} className="text-green-400" />
        </div>
      </div>
    </div>

    <div className="relative z-10 grid grid-cols-2 gap-4">
      <button className="py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl text-[10px] font-black uppercase tracking-widest text-white border border-white/10 transition-all">
        Withdraw
      </button>
      <button className="py-4 bg-white text-blue-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all">
        Quick Swap
      </button>
    </div>
  </div>
);