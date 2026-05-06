// src/app/dashboard/page.tsx
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { WalletOverview } from "@/components/dashboard/WalletOverview";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { getCurrentMerchant } from "@/lib/auth-service";
import { Activity, Users, CreditCard } from "lucide-react";

export default async function DashboardPage() {
  // Ambil data langsung dari database Neon via server
  const merchant = await getCurrentMerchant();

  return (
    <DashboardShell merchant={merchant}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* KOLOM KIRI: Fokus pada Portfolio & Stats */}
        <div className="lg:col-span-4 space-y-4">
          <StatCard 
            label="Total Revenue" 
            value="Rp 42.500.000" 
            icon={<Activity size={18} />} 
            trend="+12.5%" 
            trendUp={true} 
          />
          <WalletOverview />
        </div>

        {/* KOLOM KANAN: Fokus pada Visualisasi Data & Tabel */}
        <div className="lg:col-span-8 space-y-4 flex flex-col">
          {/* Chart Area: Dibuat bersih tanpa border radius berlebih */}
          <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-4 h-56 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Revenue Streams</h3>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-sm bg-blue-500"></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">SOL</span>
              </div>
            </div>
            <div className="flex-1 border border-dashed border-gray-100 dark:border-[#333] rounded bg-gray-50/50 dark:bg-[#151515] flex items-center justify-center">
               <span className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">Chart visualization ready</span>
            </div>
          </div>

          <TransactionTable />
        </div>
        
      </div>
    </DashboardShell>
  );
}