// src/app/dashboard/page.tsx
import { StatCard } from "@/components/dashboard/StatCard";
import { WalletOverview } from "@/components/dashboard/WalletOverview";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { getCurrentMerchant } from "@/lib/auth-service";
import prisma from "@/lib/neon";
import { Activity } from "lucide-react";
import SetupGatekeeper from "@/components/dashboard/SetupGatekeeper";

export default async function DashboardPage() {
  const merchant = await getCurrentMerchant();

  if (!merchant) {
    return null;
  }

  const transactions = await prisma.transaction.findMany({
    where: { merchantId: merchant.id },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = transactions
    .filter((tx) => tx.status === "PAID")
    .reduce((acc, tx) => acc + (tx.amount || 0), 0);

  const isWalletDummyEmail = merchant.email.includes("@wallet.auth");
  const isUnverified = merchant.emailVerified === false;
  const needsSetup = isWalletDummyEmail || isUnverified;

  if (needsSetup) {
    return (
      <SetupGatekeeper 
        merchantId={merchant.id} 
        currentEmail={merchant.email} 
        isWalletUser={isWalletDummyEmail} 
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-4 space-y-4">
        <StatCard 
          label="Total Revenue" 
          value={`${totalRevenue.toFixed(2)} SOL`} 
          icon={<Activity size={18} />} 
          trend="+100%" 
          trendUp={true} 
        />
        <WalletOverview initialWallet={merchant.walletAddress} />
      </div>

      <div className="lg:col-span-8 space-y-4 flex flex-col">
        <TransactionTable transactions={transactions.slice(0, 5)} />
      </div>
    </div>
  );
}