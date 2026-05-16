// src/app/dashboard/developers/page.tsx
import { DeveloperView } from "@/components/dashboard/developers/DeveloperView";
import { getCurrentMerchant } from "@/lib/auth-service";
import { Terminal, View } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DevelopersPage() {
  const merchant = await getCurrentMerchant();
  if (!merchant) redirect("/login");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="w-full">
          <h2 className="text-2xl font-bold dark:text-white text-gray-900 flex items-center gap-2">
            <Terminal className="text-blue-500" /> API Console
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Access your API key and find code snippets to integrate Trezalink into your application.
          </p>
          <div className="mt-3 border-b border-gray-200 dark:border-[#2A2A2A] w-full" />
        </div>
      </div>
      <DeveloperView merchant={merchant} />
    </div>
  );
}

