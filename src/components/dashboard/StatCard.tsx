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
    className="p-4 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg transition-all shadow-sm"
  >
    <div className="flex justify-between items-start mb-2">
      <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {label}
      </p>
      <div className="text-gray-400 dark:text-gray-500">
        {icon}
      </div>
    </div>
    
    <div className="flex items-end justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight font-mono">
          {value}
        </h3>
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`text-[11px] font-bold ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trendUp ? '▲' : '▼'} {trend}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">vs yesterday</span>
        </div>
      </div>
    </div>
  </motion.div>
);