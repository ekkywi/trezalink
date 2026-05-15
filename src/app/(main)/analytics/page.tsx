// src/app/dashboard/analytics/page.tsx
import { getCurrentMerchant } from "@/lib/auth-service";
import prisma from "@/lib/neon";
import { redirect } from "next/navigation";
import { StatusDonutChart } from "@/components/dashboard/analytics/StatusDonutChart";
import { TopCustomersTable } from "@/components/dashboard/analytics/TopCustomersTable";
import { RevenueSourceChart } from "@/components/dashboard/analytics/RevenueSourceChart";
import { HistoricalVolumeChart } from "@/components/dashboard/analytics/HistoricalVolumeChart";
import { PeakHoursChart } from "@/components/dashboard/analytics/PeakHoursChart";
import { BarChart3, Users, Target, ShieldAlert } from "lucide-react";

export default async function AnalyticsPage() {
  const merchant = await getCurrentMerchant();
  if (!merchant) redirect("/login");

  const [
    statusDistribution, 
    topCustomers, 
    totalStats,
    historicalRaw,
    peakHoursRaw,
    sourceDistribution 
  ] = await Promise.all([
    // 1. Distribusi Status (Donut Chart)
    prisma.transaction.groupBy({
      by: ['status'],
      where: { merchantId: merchant.id },
      _count: { id: true },
    }),

    // 2. Pelanggan Teratas (Leaderboard)
    prisma.transaction.groupBy({
      by: ['customerEmail', 'buyerWallet'], 
      where: { merchantId: merchant.id, status: 'PAID' },
      _sum: { amount: true },
      _count: { id: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 5,
    }),

    // 3. Statistik Kartu Atas (UBAH KE NET AMOUNT & HANYA YANG PAID)
    prisma.transaction.aggregate({
      where: { merchantId: merchant.id },
      _count: { id: true },
      _sum: { netAmount: true }, 
    }),

    // 4. Raw Query: Historical Volume
    prisma.$queryRaw`
      SELECT 
        to_char("createdAt", 'Mon YYYY') as month, 
        status, 
        COUNT(id) as count 
      FROM "Transaction" 
      WHERE "merchantId" = ${merchant.id} 
      GROUP BY 1, 2 
      ORDER BY MIN("createdAt") ASC
    `,

    // 5. Raw Query: Peak Buying Hours
    prisma.$queryRaw`
      SELECT 
        EXTRACT(HOUR FROM "createdAt") as hour, 
        COUNT(id) as count 
      FROM "Transaction" 
      WHERE "merchantId" = ${merchant.id} AND status = 'PAID'
      GROUP BY 1 
      ORDER BY 1 ASC
    `,
    
    // 6. Query Baru: Revenue by Source
    prisma.transaction.groupBy({
      by: ['source'],
      where: { merchantId: merchant.id, status: 'PAID' },
      _count: { id: true }
    })
  ]);

  const donutData = statusDistribution.map(item => ({
    name: item.status,
    value: item._count.id
  }));

  const sourceData = sourceDistribution.map(item => ({
    name: item.source === "API" ? "API Integration" : "Payment Links",
    value: Number(item._count.id)
  }));

  const formattedTopCustomers = topCustomers.map(c => ({
    ...c,
    displayName: c.customerEmail || (c.buyerWallet ? `${c.buyerWallet.slice(0, 6)}...${c.buyerWallet.slice(-4)}` : "Anonymous Wallet"),
  }));

  const historyMap = new Map();
  (historicalRaw as any[]).forEach(row => {
    const month = row.month;
    if (!historyMap.has(month)) historyMap.set(month, { month, PAID: 0, PENDING: 0, FAILED: 0 });
    historyMap.get(month)[row.status] = Number(row.count);
  });
  const historicalData = Array.from(historyMap.values());

  const peakHoursData = Array.from({ length: 24 }).map((_, i) => ({
    hour: i.toString().padStart(2, '0'),
    count: 0
  }));
  (peakHoursRaw as any[]).forEach(row => {
    const hourIdx = Number(row.hour);
    peakHoursData[hourIdx].count = Number(row.count);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div>
        <h2 className="text-2xl font-bold dark:text-white text-gray-900 flex items-center gap-2">
          <BarChart3 className="text-blue-500" /> Advanced Analytics
        </h2>
        <p className="text-sm text-gray-500 mt-1">In-depth insights into your business performance and customer behavior.</p>
      </div>

      {/* Row 1: Metrik Rata-rata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KARTU 1 DIUBAH MENJADI TOTAL NET REVENUE */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border border-gray-200 dark:border-[#2A2A2A]">
          <Users className="text-purple-500 mb-2" size={20} />
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Net Revenue</p>
          <h3 className="text-xl font-bold dark:text-white font-mono text-green-500">
            {(totalStats._sum.netAmount || 0).toFixed(4)} SOL
          </h3>
          <p className="text-[9px] text-gray-500 mt-1 font-medium">After 0.3% platform fee</p>
        </div>
        
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border border-gray-200 dark:border-[#2A2A2A]">
          <Target className="text-green-500 mb-2" size={20} />
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Orders</p>
          <h3 className="text-xl font-bold dark:text-white font-mono">{totalStats._count.id}</h3>
        </div>
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border border-gray-200 dark:border-[#2A2A2A]">
          <ShieldAlert className="text-red-500 mb-2" size={20} />
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Abandoned Rate</p>
          <h3 className="text-xl font-bold dark:text-white font-mono">
            {totalStats._count.id > 0 
              ? ((donutData.find(d => d.name === 'PENDING')?.value || 0) / totalStats._count.id * 100).toFixed(1) 
              : 0}%
          </h3>
        </div>
      </div>

      {/* Row 2: Distribusi Status & Revenue Source */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-6">Transaction Success Ratio</h3>
          <StatusDonutChart data={donutData} />
        </div>
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-6">Revenue by Source</h3>
          <RevenueSourceChart data={sourceData} />
        </div>
      </div>

      {/* Row 3: Historical Volume (Full Width) */}
      <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">Historical Volume & Drop-off</h3>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Status Comparison</span>
        </div>
        <HistoricalVolumeChart data={historicalData} />
      </div>

      {/* Row 4: Peak Hours & Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-6">Peak Buying Hours (24H)</h3>
          <PeakHoursChart data={peakHoursData} />
        </div>
        <div className="lg:col-span-5 bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-6">Top Spending Customers</h3>
          <TopCustomersTable customers={formattedTopCustomers} />
        </div>
      </div>
    </div>
  );
}