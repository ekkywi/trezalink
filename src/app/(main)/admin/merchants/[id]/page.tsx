// src/app/(main)/admin/merchants/[id]/page.tsx
import prisma from "@/lib/neon";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Building2, 
  Mail, 
  Wallet, 
  Activity, 
  CalendarDays,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";

const formatSOL = (val: number | null | undefined) => val ? val.toFixed(4) : "0.0000";

export default async function MerchantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; // 1. UBAH TIPE PARAMS MENJADI PROMISE
}) {
  // 2. AWAIT PARAMS SEBELUM MENGAMBIL ID-NYA
  const resolvedParams = await params;
  const merchantId = resolvedParams.id;

  // 3. Gunakan merchantId untuk query
  const merchant = await prisma.merchant.findUnique({
    where: { id: merchantId },
  });

  if (!merchant) {
    notFound();
  }

  // 4. Pastikan menggunakan merchantId di semua query berikutnya
  const [stats, recentTransactions, totalTx] = await Promise.all([
    prisma.transaction.aggregate({
      where: { merchantId: merchantId, status: "PAID" },
      _sum: { amount: true, feeAmount: true }
    }),
    prisma.transaction.findMany({
      where: { merchantId: merchantId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.transaction.count({
      where: { merchantId: merchantId }
    })
  ]);

  const totalVolume = stats._sum.amount || 0;
  const totalFeesPaid = stats._sum.feeAmount || 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* NAVIGASI KEMBALI */}
      <Link href="/admin/merchants" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to Directory
      </Link>

      {/* HEADER PROFIL */}
      <div className="bg-white dark:bg-[#1E1E1E] p-6 lg:p-8 rounded-xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold font-mono shadow-lg shadow-blue-500/20 ring-4 ring-blue-50 dark:ring-[#151515]">
            {merchant.businessName ? merchant.businessName.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
              {merchant.businessName}
              <ShieldCheck size={18} className="text-green-500" title="Verified Entity" />
            </h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Mail size={14} /> {merchant.email}</span>
              <span className="flex items-center gap-1.5"><CalendarDays size={14} /> Joined {new Date(merchant.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Info Dompet Settlement */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-[#151515] rounded-lg border border-gray-200 dark:border-[#2A2A2A] w-full md:w-auto text-left md:text-right">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 flex items-center md:justify-end gap-1.5">
            <Wallet size={12} /> Settlement Wallet
          </p>
          <p className="font-mono text-xs text-gray-900 dark:text-gray-300 break-all">
            {merchant.walletAddress || "Not configured yet"}
          </p>
        </div>
      </div>

      {/* STATISTIK KHUSUS MERCHANT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5 mb-3"><Activity size={14}/> Total Processed</p>
          <h3 className="text-3xl font-mono font-bold text-gray-900 dark:text-white">{formatSOL(totalVolume)} <span className="text-sm text-gray-400">SOL</span></h3>
        </div>
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5 mb-3"><TrendingUp size={14} className="text-green-500"/> Fee Contributed (0.3%)</p>
          <h3 className="text-3xl font-mono font-bold text-green-600 dark:text-green-500">{formatSOL(totalFeesPaid)} <span className="text-sm text-gray-400">SOL</span></h3>
        </div>
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5 mb-3"><Building2 size={14}/> Total Transactions</p>
          <h3 className="text-3xl font-mono font-bold text-gray-900 dark:text-white">{totalTx} <span className="text-sm text-gray-400">TXs</span></h3>
        </div>
      </div>

      {/* MERCHANT LEDGER */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 dark:border-[#2A2A2A] bg-transparent">
          <h3 className="font-bold text-sm tracking-tight text-gray-900 dark:text-white">Recent Activity for this Merchant</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#151515] border-b border-gray-100 dark:border-[#2A2A2A] text-gray-400 font-black text-[10px] uppercase tracking-widest">
                <th className="p-5">Order Ref</th>
                <th className="p-5">Gross Vol</th>
                <th className="p-5">Fee Deducted</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Explorer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-[#2A2A2A]">
              {recentTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">No transactions recorded for this merchant.</td>
                </tr>
              )}
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors group">
                  <td className="p-5 font-mono text-[11px] text-gray-500">{tx.orderId}</td>
                  <td className="p-5 font-mono font-bold text-xs">{formatSOL(tx.amount)} SOL</td>
                  <td className="p-5 font-mono text-xs text-red-500">{tx.feeAmount ? `-${formatSOL(tx.feeAmount)}` : "0.0000"} SOL</td>
                  <td className="p-5">
                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${
                      tx.status === "PAID" 
                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400" 
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
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
                        tx.txSignature ? "text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10" : "text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}