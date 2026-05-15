// src/app/dashboard/developers/page.tsx
import { DeveloperView } from "@/components/dashboard/developers/DeveloperView";
import { getCurrentMerchant } from "@/lib/auth-service";
import { View } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DevelopersPage() {
  const merchant = await getCurrentMerchant();
  if (!merchant) redirect("/login");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold dark:text-white text-gray-800">API Console</h2>
          <p className="text-xs text-gray-500">Access your API key and find code snippets to integrate Trezalink into your application.</p>
        </div>
      </div>
      <DeveloperView merchant={merchant} />
    </div>
  );
}

