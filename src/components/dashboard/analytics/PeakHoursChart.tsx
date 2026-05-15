// src/components/analytics/PeakHoursChart.tsx
"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function PeakHoursChart({ data }: { data: any[] }) {
  return (
    <div className="w-full">
      {/* Ubah height="100%" menjadi height={300} */}
      <ResponsiveContainer width="100%" height={300} minWidth={0} minHeight={0}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.3} />
          <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
          <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#2A2A2A', borderRadius: '12px' }} itemStyle={{ color: '#f59e0b', fontWeight: 'bold' }} labelFormatter={(label) => `${label}:00`} formatter={(value: number) => [`${value} Transactions`, 'Volume']} />
          <Area type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}