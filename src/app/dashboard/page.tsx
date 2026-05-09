// src/app/dashboard/page.tsx
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { WalletOverview } from "@/components/dashboard/WalletOverview";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { getCurrentMerchant } from "@/lib/auth-service";
import { Activity } from "lucide-react";
import SetupGatekeeper from "@/components/dashboard/SetupGatekeeper";

export default async function DashboardPage() {
  const merchant = await getCurrentMerchant();

  if (!merchant) {
    return <div className="p-8 text-center">Session expired or invalid. Please log in again.</div>;
  }

  // LOGIKA GATEKEEPER
  const isWalletDummyEmail = merchant.email.includes("@wallet.auth");
  const isUnverified = merchant.emailVerified === false;
  const needsSetup = isWalletDummyEmail || isUnverified;

  return (
    <DashboardShell merchant={merchant}>
      {/* JIKA needsSetup TRUE -> MUNCUL GATEKEEPER */}
      {needsSetup ? (
        <SetupGatekeeper 
          merchantId={merchant.id} 
          currentEmail={merchant.email} 
          isWalletUser={isWalletDummyEmail} 
        />
      ) : (
        /* JIKA needsSetup FALSE -> MUNCUL DASBOR UTAMA */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4 space-y-4">
            <StatCard 
              label="Total Revenue" 
              value="Rp 42.500.000" 
              icon={<Activity size={18} />} 
              trend="+12.5%" 
              trendUp={true} 
            />
            <WalletOverview initialWallet={merchant.walletAddress} />
          </div>

          <div className="lg:col-span-8 space-y-4 flex flex-col">
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
      )}
    </DashboardShell>
  );
}