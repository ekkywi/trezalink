// src/app/dashboard/settings/page.tsx
import { getCurrentMerchant } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { SettingsView } from "@/components/dashboard/settings/SettingsView";
import { Settings } from "lucide-react";

export default async function SettingsPage() {
  const merchant = await getCurrentMerchant();
  if (!merchant) redirect("/login");

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold dark:text-white text-gray-900 flex items-center gap-2">
          <Settings className="text-blue-500" /> Settings
        </h2>
        <p className="text-sm text-gray-500 mt-1">Manage your business profile, payouts, and integrations.</p>
        <div className="mt-2 border-b border-gray-200 dark:border-gray-700" />
      </div>
      <SettingsView merchant={merchant} />
    </div>
  );
}