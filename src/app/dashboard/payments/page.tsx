// src/app/dashboard/payments/page.tsx
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { getCurrentMerchant } from "@/lib/auth-service";
import prisma from "@/lib/neon";
import { redirect } from "next/navigation";

export default async function PaymentsPage() {
  const merchant = await getCurrentMerchant();
  if (!merchant) redirect("/login");

  const transactions = await prisma.transaction.findMany({
    where: { merchantId: merchant.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold dark:text-white text-gray-800">Transaction History</h2>
          <p className="text-xs text-gray-500">View and manage your transaction history.</p>
        </div>
      </div>
      <TransactionTable transactions={transactions} />
    </div>
  );
}

    