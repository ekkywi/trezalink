// src/app/dashboard/settings/page.tsx
import { getCurrentMerchant } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { SettingsView } from "@/components/dashboard/settings/SettingsView";

export default async function SettingsPage() {
  const merchant = await getCurrentMerchant();
  if (!merchant) redirect("/login");

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-bold dark:text-white text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your business profile, payouts, and integrations.</p>
      </div>
      
      <SettingsView merchant={merchant} />
    </div>
  );
}