// src/app/(main)/admin/overview/page.tsx
import prisma from "@/lib/neon";
import { 
  ShieldCheck, 
  Users, 
  Wallet, 
  Activity, 
  ArrowUpRight, 
  Clock,
  TrendingUp,
  Server
} from "lucide-react";

// Helper untuk format SOL yang konsisten
const formatSOL = (val: number | null | undefined) => val ? val.toFixed(4) : "0.0000";

export default async function AdminOverviewPage() {
  // Waktu untuk metrik 24 Jam Terakhir
  const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

  // DATA FETCHING
  const [globalStats, dailyStats, merchantCount, recentTransactions] = await Promise.all([
    prisma.transaction.aggregate({
      where: { status: "PAID" },
      _sum: { feeAmount: true, amount: true }
    }),
    prisma.transaction.aggregate({
      where: { status: "PAID", createdAt: { gte: yesterday } },
      _sum: { amount: true, feeAmount: true }
    }),
    prisma.merchant.count(),
    prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { 
        merchant: { select: { businessName: true, email: true } } 
      }
    })
  ]);

  const totalFees = globalStats._sum.feeAmount || 0;
  const totalVolume = globalStats._sum.amount || 0;
  const dailyVolume = dailyStats._sum.amount || 0;
  const dailyFees = dailyStats._sum.feeAmount || 0;

  return (
    // PERBAIKAN: Menghapus p-4 lg:p-8 dan menyamakan wrapper dengan halaman Dashboard
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* SECTION: ENTERPRISE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/50">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Platform Overview</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">Global Network & Treasury Monitoring</p>
          </div>
        </div>
        
        {/* Server Status Badge */}
        <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-[#1E1E1E] rounded-full border border-gray-200 dark:border-[#2A2A2A] shadow-sm">
          <Server size={14} className="text-gray-400" />
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-300">Administrator Menu</span>
        </div>
      </div>

      {/* SECTION: GLOBAL METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Treasury (Total Fees) */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm relative overflow-hidden group hover:border-green-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Wallet size={80} />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
              <Wallet size={16} />
            </div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Platform Treasury</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-mono font-bold text-green-600 dark:text-green-500">{formatSOL(totalFees)}</h3>
            <span className="text-xs font-bold text-gray-400">SOL</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[#2A2A2A] flex items-center gap-2">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-xs text-gray-500 font-medium">+ {formatSOL(dailyFees)} SOL in last 24h</span>
          </div>
        </div>

        {/* Card 2: 24H Volume */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm relative overflow-hidden group hover:border-blue-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity size={80} />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
              <Activity size={16} />
            </div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Network Vol (24H)</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-500">{formatSOL(dailyVolume)}</h3>
            <span className="text-xs font-bold text-gray-400">SOL</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[#2A2A2A] flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">All-time vol: {formatSOL(totalVolume)} SOL</span>
          </div>
        </div>

        {/* Card 3: Merchant Base */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm relative overflow-hidden group hover:border-purple-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users size={80} />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
              <Users size={16} />
            </div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Merchants</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-mono font-bold text-gray-900 dark:text-white">{merchantCount}</h3>
            <span className="text-xs font-bold text-gray-400">Businesses</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[#2A2A2A] flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Total registered entities</span>
          </div>
        </div>
      </div>

      {/* SECTION: TRANSACTION LEDGER */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-[#2A2A2A] flex justify-between items-center bg-transparent">
          <div className="flex items-center gap-3">
            <Clock className="text-gray-500" size={18} />
            <h3 className="font-bold text-sm tracking-tight text-gray-900 dark:text-white">Global Live Ledger</h3>
          </div>
          <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-md ring-1 ring-blue-500/20">
            Real-Time • 10 Latest
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A] text-gray-400 font-black text-[10px] uppercase tracking-widest bg-gray-50/50 dark:bg-[#151515]">
                <th className="p-5">Merchant Entity</th>
                <th className="p-5">Order Ref</th>
                <th className="p-5">Gross Vol</th>
                <th className="p-5">Platform Fee</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Explorer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-[#2A2A2A]">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors group">
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 dark:text-white">{tx.merchant.businessName || "Unnamed"}</span>
                      <span className="text-[10px] text-gray-500 font-mono mt-0.5">{tx.merchant.email}</span>
                    </div>
                  </td>
                  <td className="p-5 font-mono text-[11px] text-gray-500">{tx.orderId}</td>
                  <td className="p-5 font-mono font-bold text-xs text-gray-900 dark:text-gray-300">
                    {formatSOL(tx.amount)} SOL
                  </td>
                  <td className="p-5 font-mono text-xs text-green-600 dark:text-green-500 font-medium">
                    {tx.feeAmount ? `+${formatSOL(tx.feeAmount)}` : "0.0000"} SOL
                  </td>
                  <td className="p-5">
                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${
                      tx.status === "PAID" 
                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 ring-1 ring-green-500/20" 
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400 ring-1 ring-yellow-500/20"
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <a 
                      href={tx.txSignature ? `https://explorer.solana.com/tx/${tx.txSignature}?cluster=devnet` : '#'} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex p-2 rounded-lg transition-all ${
                        tx.txSignature 
                          ? "text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400" 
                          : "text-gray-300 dark:text-[#2A2A2A] cursor-not-allowed"
                      }`}
                      title={tx.txSignature ? "View on Solana Explorer" : "No signature yet"}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {recentTransactions.length === 0 && (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="p-4 bg-gray-50 dark:bg-[#1A1A1A] rounded-full mb-4">
              <Activity className="text-gray-300 dark:text-[#333]" size={32} />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">No Network Activity</h4>
            <p className="text-xs text-gray-500 font-medium mt-1">Global transactions will appear here automatically.</p>
          </div>
        )}
      </div>

    </div>
  );
}