"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatProps {
  label: string;
  value: string;
  icon: ReactNode;
  trend: string;
  trendUp?: boolean;
}

export const StatCard = ({ label, value, icon, trend, trendUp }: StatProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="relative p-6 bg-white dark:bg-[#11151D] border border-gray-100 dark:border-white/10 rounded-[2rem] overflow-hidden transition-all shadow-sm dark:shadow-none"
  >
    {/* Glow Effect */}
    <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-600/5 dark:bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all"></div>
    
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">
        {icon}
      </div>
      <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${trendUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
        {trend}
      </span>
    </div>
    
    <div className="relative z-10">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter italic italic">
        {value}
      </h3>
    </div>
  </motion.div>
);