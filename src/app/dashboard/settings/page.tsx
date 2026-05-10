// src/app/dashboard/settings/page.tsx
import { WebhookSettings } from "@/components/dashboard/WebhookSettings";
import { getCurrentMerchant } from "@/lib/auth-service";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const merchant = await getCurrentMerchant();
  if (!merchant) redirect("/login");

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-xl font-bold dark:text-white text-gray-800">Merchant Settings</h2>
      <WebhookSettings merchant={merchant} />
    </div>
  );
}