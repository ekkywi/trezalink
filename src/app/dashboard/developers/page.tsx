// src/app/dashboard/api/page.tsx
import { ApiConsoleView } from "@/components/dashboard/ApiConsoleView";
import { getCurrentMerchant } from "@/lib/auth-service";
import { redirect } from "next/navigation";

export default async function ApiPage() {
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
      <ApiConsoleView merchant={merchant} />
    </div>
  );
}

