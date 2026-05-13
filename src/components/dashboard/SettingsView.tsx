// src/components/dashboard/SettingsView.tsx
"use client";

import { useState } from "react";
import { Store, Wallet, Globe, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { useMerchantUpdate } from "@/hooks/useMerchantUpdate";
// IMPORT KOMPONEN WALLET YANG SUDAH ANDA BUAT
import { WalletOverview } from "@/components/dashboard/WalletOverview"; 

export function SettingsView({ merchant }: { merchant: any }) {
  const [activeTab, setActiveTab] = useState<"profile" | "payouts" | "webhooks">("profile");
  
  // Local State untuk Input
  const [businessName, setBusinessName] = useState(merchant.businessName || "");
  const [webhookUrl, setWebhookUrl] = useState(merchant.webhookUrl || "");
  
  const { updateField, loading, status } = useMerchantUpdate();

  return (
    <div className="space-y-6">
      
      {/* TABS NAVIGATION */}
      <div className="flex gap-6 border-b border-gray-200 dark:border-[#2A2A2A]">
        <button onClick={() => setActiveTab("profile")} className={`pb-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${activeTab === "profile" ? "border-blue-500 text-blue-600 dark:text-blue-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
          <Store size={16} /> Store Profile
        </button>
        <button onClick={() => setActiveTab("payouts")} className={`pb-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${activeTab === "payouts" ? "border-green-500 text-green-600 dark:text-green-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
          <Wallet size={16} /> Payouts
        </button>
        <button onClick={() => setActiveTab("webhooks")} className={`pb-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${activeTab === "webhooks" ? "border-purple-500 text-purple-600 dark:text-purple-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
          <Globe size={16} /> Integrations
        </button>
      </div>

      {/* GLOBAL TOAST NOTIFICATION */}
      {status && (
        <div className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'}`}>
          {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {status.msg}
        </div>
      )}

      {/* TAB 1: PROFILE */}
      {activeTab === "profile" && (
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Business Name</h3>
          <p className="text-xs text-gray-500 mb-4">This name will be displayed to your customers on the checkout page.</p>
          <div className="flex gap-2">
            <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. Acme Corporation" className="bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-[#2A2A2A] p-3 flex-1 outline-none text-sm font-semibold dark:text-white" />
            <button onClick={() => updateField("businessName", businessName)} disabled={loading || businessName === merchant.businessName} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 rounded-xl font-bold text-sm transition-colors">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PAYOUTS (MENGGUNAKAN KOMPONEN WEB3 ANDA) */}
      {activeTab === "payouts" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 p-4 rounded-xl">
             <p className="text-[11px] text-yellow-700 dark:text-yellow-500 leading-relaxed font-medium">
               <strong>Security Notice:</strong> To ensure your funds are safe, we require you to cryptographically sign a message using your Phantom Wallet. We do not allow manual input of wallet addresses.
             </p>
          </div>
          
          {/* Komponen Anda yang canggih dipanggil di sini */}
          <WalletOverview initialWallet={merchant.walletAddress || "pending"} />
        </div>
      )}

      {/* TAB 3: WEBHOOKS */}
      {activeTab === "webhooks" && (
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-600"><Globe size={20} /></div>
            <div><h3 className="text-sm font-bold text-gray-900 dark:text-white">Webhook Configuration</h3><p className="text-xs text-gray-500">Receive real-time notifications.</p></div>
          </div>
          <div className="flex gap-2">
            <input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="https://your-api.com/webhook" className="bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-[#2A2A2A] p-3 flex-1 outline-none text-sm font-mono dark:text-white" />
            <button onClick={() => updateField("webhookUrl", webhookUrl)} disabled={loading || webhookUrl === merchant.webhookUrl} className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors">
              {loading ? "Saving..." : <><Save size={16} /> Save</>}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}