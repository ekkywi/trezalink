// src/components/dashboard/StatCard.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatProps {
  label: string;
  value: string;
  icon: ReactNode;
  trend: string;
  trendUp?: boolean;
  description?: string;
}

export const StatCard = ({ label, value, icon, trend, trendUp, description = "vs last period" }: StatProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="p-5 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl transition-all shadow-sm hover:shadow-md group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-[#151515] flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
        {icon}
      </div>
      <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">
        {label}
      </p>
    </div>
    
    <div className="space-y-1">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight font-mono">
        {value}
      </h3>
      
      <div className="flex items-center gap-1.5">
        <div className={`flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
          trendUp 
            ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
            : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {trendUp ? '▲' : '▼'} {trend}
        </div>
        <span className="text-[10px] text-gray-400 font-medium">
          {description}
        </span>
      </div>
    </div>
  </motion.div>
);