// src/app/dashboard/page.tsx
import { StatCard } from "@/components/dashboard/StatCard";
import { WalletOverview } from "@/components/dashboard/WalletOverview";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { getCurrentMerchant } from "@/lib/auth-service";
import prisma from "@/lib/neon";
import { redirect } from "next/navigation";
import { Activity, CreditCard, CheckCircle2 } from "lucide-react";
import SetupGatekeeper from "@/components/dashboard/SetupGatekeeper";

export default async function DashboardPage() {
  const merchant = await getCurrentMerchant();
  if (!merchant) redirect("/login");

  const isWalletDummyEmail = merchant.email.includes("@wallet.auth");
  const isUnverified = merchant.emailVerified === false;

  if (isWalletDummyEmail || isUnverified) {
    return <SetupGatekeeper merchantId={merchant.id} currentEmail={merchant.email} isWalletUser={isWalletDummyEmail} />;
  }

  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [
    recentTransactions,
    thisMonthRevAgg,
    lastMonthRevAgg,
    totalTxCount,
    paidTxCount,
    last7DaysTx 
  ] = await Promise.all([
    prisma.transaction.findMany({ where: { merchantId: merchant.id }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.transaction.aggregate({ where: { merchantId: merchant.id, status: "PAID", createdAt: { gte: startOfThisMonth } }, _sum: { amount: true } }),
    prisma.transaction.aggregate({ where: { merchantId: merchant.id, status: "PAID", createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } }, _sum: { amount: true } }),
    prisma.transaction.count({ where: { merchantId: merchant.id } }),
    prisma.transaction.count({ where: { merchantId: merchant.id, status: "PAID" } }),
    prisma.transaction.findMany({ 
      where: { merchantId: merchant.id, status: "PAID", createdAt: { gte: sevenDaysAgo } },
      select: { amount: true, createdAt: true }
    }),
  ]);

  const thisMonthRev = thisMonthRevAgg._sum.amount || 0;
  const lastMonthRev = lastMonthRevAgg._sum.amount || 0;
  let revenueTrend = 0;
  if (lastMonthRev > 0) revenueTrend = ((thisMonthRev - lastMonthRev) / lastMonthRev) * 100;
  else if (thisMonthRev > 0) revenueTrend = 100;
  const successRate = totalTxCount > 0 ? (paidTxCount / totalTxCount) * 100 : 0;

  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      date: d.toLocaleDateString('en-US', { weekday: 'short' }),
      amount: 0,
      fullDateString: d.toDateString()
    };
  });

  last7DaysTx.forEach(tx => {
    const txDateStr = new Date(tx.createdAt).toDateString();
    const dayIndex = chartData.findIndex(d => d.fullDateString === txDateStr);
    if (dayIndex !== -1) {
      chartData[dayIndex].amount += tx.amount;
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold dark:text-white text-gray-900">Dashboard Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Welcome back, <strong className="text-gray-700 dark:text-gray-300">{merchant.businessName || "Merchant"}</strong></p>
      </div>

      {/* Baris 1: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Revenue (This Month)" value={`${thisMonthRev.toFixed(2)} SOL`} icon={<Activity size={18} />} trend={`${revenueTrend > 0 ? '+' : ''}${revenueTrend.toFixed(1)}%`} trendUp={revenueTrend >= 0} description="vs last month" />
        <StatCard label="Total Transactions" value={totalTxCount.toString()} icon={<CreditCard size={18} />} trend="All time" trendUp={true} description="total volume" />
        <StatCard label="Success Rate" value={`${successRate.toFixed(1)}%`} icon={<CheckCircle2 size={18} />} trend="Paid vs Failed" trendUp={successRate >= 50} description="conversion rate" />
      </div>

      {/* Baris 2: Chart (Kiri) dan Wallet (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kiri: Revenue Chart mengambil ruang lebih luas (8 Kolom) agar grafik tidak terjepit */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-6">Revenue Trajectory (Last 7 Days)</h3>
          <RevenueChart data={chartData} />
        </div>

        {/* Kanan: Wallet Overview mengambil ruang sisa (4 Kolom) */}
        <div className="lg:col-span-4 space-y-6">
          <WalletOverview initialWallet={merchant.walletAddress} />
        </div>
      </div>

      {/* Baris 3: Tabel Transaksi (Full Width / 12 Kolom) */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">Recent Transactions</h3>
          <a href="/dashboard/payments" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors">
            View All
          </a>
        </div>
        <TransactionTable transactions={recentTransactions} totalPages={1} />
      </div>

    </div>
  );
}