// src/app/(main)/admin/revenue/page.tsx
import prisma from "@/lib/neon";
import { 
  Landmark, 
  Banknote, 
  CalendarDays, 
  ArrowDownToLine, 
  TrendingUp,
  Receipt
} from "lucide-react";

const formatSOL = (val: number | null | undefined) => val ? val.toFixed(5) : "0.00000";

export default async function AdminRevenuePage() {
  // Setup batasan waktu untuk query
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // DATA FETCHING: Agregasi Pendapatan
  const [totalStats, monthStats, dayStats, recentFees] = await Promise.all([
    // 1. Total Pendapatan Sepanjang Waktu
    prisma.transaction.aggregate({ 
      where: { status: "PAID" }, 
      _sum: { feeAmount: true } 
    }),
    // 2. Pendapatan Bulan Ini
    prisma.transaction.aggregate({ 
      where: { status: "PAID", createdAt: { gte: startOfMonth } }, 
      _sum: { feeAmount: true } 
    }),
    // 3. Pendapatan Hari Ini
    prisma.transaction.aggregate({ 
      where: { status: "PAID", createdAt: { gte: startOfDay } }, 
      _sum: { feeAmount: true } 
    }),
    // 4. Riwayat setoran fee terbaru
    prisma.transaction.findMany({
      where: { status: "PAID", feeAmount: { gt: 0 } },
      orderBy: { createdAt: "desc" },
      take: 15,
      include: { merchant: { select: { businessName: true } } }
    })
  ]);

  const totalRevenue = totalStats._sum.feeAmount || 0;
  const monthRevenue = monthStats._sum.feeAmount || 0;
  const dayRevenue = dayStats._sum.feeAmount || 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-200 dark:border-[#2A2A2A]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-700 text-white rounded-2xl shadow-lg shadow-green-500/20 ring-1 ring-green-500/50">
            <Landmark size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Treasury & Revenue</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">Platform earnings from 0.3% transaction fees</p>
          </div>
        </div>
        
        {/* Tombol Simulasi Withdraw */}
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
          <ArrowDownToLine size={16} />
          Withdraw to Cold Wallet
        </button>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Hari Ini */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 rounded-lg">
              <Banknote size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Today</span>
          </div>
          <h3 className="text-2xl font-mono font-bold text-gray-900 dark:text-white">{formatSOL(dayRevenue)} <span className="text-sm text-gray-400">SOL</span></h3>
          <p className="text-xs text-gray-500 mt-2 font-medium">Earnings since 00:00</p>
        </div>

        {/* Bulan Ini */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-500 rounded-lg">
              <CalendarDays size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">This Month</span>
          </div>
          <h3 className="text-2xl font-mono font-bold text-gray-900 dark:text-white">{formatSOL(monthRevenue)} <span className="text-sm text-gray-400">SOL</span></h3>
          <p className="text-xs text-gray-500 mt-2 font-medium">Earnings this current month</p>
        </div>

        {/* Total Sepanjang Waktu (Treasury Balance) */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-[#111C15] dark:to-[#162B1D] p-6 rounded-xl border border-green-200 dark:border-green-900/30 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-500 text-white rounded-lg shadow-sm shadow-green-500/20">
              <Landmark size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-700 dark:text-green-500">Total Treasury</span>
          </div>
          <h3 className="text-3xl font-mono font-bold text-green-700 dark:text-green-400">{formatSOL(totalRevenue)} <span className="text-sm font-bold opacity-70">SOL</span></h3>
          <p className="text-xs text-green-600 dark:text-green-500 mt-2 font-medium flex items-center gap-1">
            <TrendingUp size={12} /> All-time collected fees
          </p>
        </div>
      </div>

      {/* FEE LEDGER */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-[#2A2A2A] flex justify-between items-center bg-transparent">
          <div className="flex items-center gap-3">
            <Receipt className="text-gray-500" size={18} />
            <h3 className="font-bold text-sm tracking-tight text-gray-900 dark:text-white">Recent Fee Deposits</h3>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A] text-gray-400 font-black text-[10px] uppercase tracking-widest bg-gray-50/50 dark:bg-[#151515]">
                <th className="p-5">Time</th>
                <th className="p-5">Source Merchant</th>
                <th className="p-5">Order ID</th>
                <th className="p-5">Base Gross</th>
                <th className="p-5 text-right text-green-600 dark:text-green-500">Fee Earned (0.3%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-[#2A2A2A]">
              {recentFees.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors">
                  <td className="p-5 text-xs text-gray-500 font-medium">
                    {new Date(tx.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit' })}
                  </td>
                  <td className="p-5 font-bold text-gray-900 dark:text-white">
                    {tx.merchant.businessName || "Unnamed"}
                  </td>
                  <td className="p-5 font-mono text-[11px] text-gray-500">
                    {tx.orderId}
                  </td>
                  <td className="p-5 font-mono text-xs text-gray-500">
                    {formatSOL(tx.amount)} SOL
                  </td>
                  <td className="p-5 text-right font-mono font-bold text-xs text-green-600 dark:text-green-400">
                    +{formatSOL(tx.feeAmount)} SOL
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {recentFees.length === 0 && (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="p-4 bg-gray-50 dark:bg-[#1A1A1A] rounded-full mb-4">
              <Landmark className="text-gray-300 dark:text-[#333]" size={32} />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Treasury is Empty</h4>
            <p className="text-xs text-gray-500 font-medium mt-1">No fees have been collected yet.</p>
          </div>
        )}
      </div>

    </div>
  );
}