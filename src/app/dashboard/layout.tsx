// src/app/dashboard/layout.tsx
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getCurrentMerchant } from "@/lib/auth-service";
import prisma from "@/lib/neon";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const merchant = await getCurrentMerchant();

  if (!merchant) {
    redirect("/login");
  }

  const transactions = await prisma.transaction.findMany({
    where: { merchantId: merchant.id },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = transactions
    .filter((tx) => tx.status === "PAID")
    .reduce((acc, tx) => acc + (tx.amount || 0), 0);

  return (
    <DashboardShell 
      merchant={merchant} 
      transactions={transactions}
      totalRevenue={totalRevenue}
    >
      {children}
    </DashboardShell>
  );
}