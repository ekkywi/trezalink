// src/app/dashboard/payment-links/page.tsx
import { getCurrentMerchant } from "@/lib/auth-service";
import prisma from "@/lib/neon";
import { redirect } from "next/navigation";
import { CreateLinkButton } from "@/components/dashboard/CreateLinkButton";
import { LinkTable } from "@/components/dashboard/LinkTable";

export default async function PaymentLinksPage() {
  const merchant = await getCurrentMerchant();
  if (!merchant) redirect("/login");

  const links = await prisma.transaction.findMany({
    where: { merchantId: merchant.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold dark:text-white text-gray-800">Payment Links</h2>
          <p className="text-xs text-gray-500">Create and manage no-code payment links for your customers.</p>
        </div>
        <CreateLinkButton merchantId={merchant.id} />
      </div>

      <LinkTable links={links} />
    </div>
  );
}