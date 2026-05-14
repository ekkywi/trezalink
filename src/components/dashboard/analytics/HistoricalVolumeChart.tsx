// src/components/dashboard/analytics/HistoricalVolumeChart.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function HistoricalVolumeChart({ data }: { data: any[] }) {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.3} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#2A2A2A', borderRadius: '12px' }}
            cursor={{ fill: '#2A2A2A', opacity: 0.4 }}
          />
          <Legend verticalAlign="top" height={36} />
          {/* Stacked Bars: Hijau untuk sukses, Kuning untuk Pending, Merah untuk Gagal */}
          <Bar dataKey="PAID" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} />
          <Bar dataKey="PENDING" stackId="a" fill="#eab308" />
          <Bar dataKey="FAILED" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}