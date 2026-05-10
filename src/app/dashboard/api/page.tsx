// src/app/dashboard/api/page.tsx
import { ApiConsoleView } from "@/components/dashboard/ApiConsoleView";
import { getCurrentMerchant } from "@/lib/auth-service";
import { redirect } from "next/navigation";

export default async function ApiPage() {
  const merchant = await getCurrentMerchant();
  if (!merchant) redirect("/login");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold dark:text-white text-gray-800">API Console</h2>
      <ApiConsoleView merchant={merchant} />
    </div>
  );
}