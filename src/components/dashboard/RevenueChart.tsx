// src/components/dashboard/RevenueChart.tsx
"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

interface RevenueChartProps {
  data: { date: string; amount: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">
        No transaction data available yet.
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {/* Efek Gradien Keren */}
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          {/* Garis Grid Horizontal (Tipis) */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.3} />
          
          {/* Sumbu X (Hari) */}
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#888' }} 
            dy={10} 
          />
          
          {/* Sumbu Y (Angka SOL) */}
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#888' }} 
            tickFormatter={(value) => `${value}`} 
          />
          
          {/* Tooltip saat di-hover */}
          <Tooltip 
            contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#2A2A2A', borderRadius: '12px', color: '#fff' }}
            itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
            formatter={(value: number) => [`${value.toFixed(2)} SOL`, 'Revenue']}
          />
          
          {/* Area Grafiknya */}
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorAmount)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}