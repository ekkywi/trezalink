// src/components/dashboard/developers/TabCredentials.tsx
"use client";

import { useState } from "react";
import { Key, Copy, Eye, EyeOff, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, XCircle, Info } from "lucide-react";
import { useCredentialsManager } from "@/hooks/api/merchant/useCredentialsManager";

export function TabCredentials({ merchant }: { merchant: any }) {
  const [showKey, setShowKey] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  const [showKeyConfirmModal, setShowKeyConfirmModal] = useState(false);
  const [showWebhookConfirmModal, setShowWebhookConfirmModal] = useState(false);

  const {
    currentKey, currentWebhookSecret,
    isRollingKey, isRollingWebhook,
    toast, handleCopy, executeRollKey, executeRollWebhookSecret
  } = useCredentialsManager(merchant.apiKey, merchant.webhookSecret);

  const onConfirmRollKey = async () => {
    const success = await executeRollKey();
    if (success) setShowKeyConfirmModal(false);
  };

  const onConfirmRollSecret = async () => {
    const success = await executeRollWebhookSecret();
    if (success) setShowWebhookConfirmModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* TOAST */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border animate-in slide-in-from-top-5 fade-in duration-300 ${toast.type === "success" ? "bg-white dark:bg-[#1E1E1E] border-green-200 dark:border-green-900/30" : "bg-white dark:bg-[#1E1E1E] border-red-200 dark:border-red-900/30"}`}>
          <div className={`shrink-0 rounded-full flex items-center justify-center w-8 h-8 ${toast.type === "success" ? "bg-green-100 text-green-600 dark:bg-green-900/20" : "bg-red-100 text-red-600 dark:bg-red-900/20"}`}>
            {toast.type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          </div>
          <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{toast.message}</p>
        </div>
      )}

      {/* MODAL API KEY */}
      {showKeyConfirmModal && (
        <div className="fixed inset-0 z-[50] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl p-6 border border-gray-200 dark:border-[#2A2A2A] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center shrink-0"><AlertTriangle size={24} /></div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Critical Action: Roll API Key</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">Rolling your API Key will immediately <strong className="text-red-500">INVALIDATE</strong> your current key.</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowKeyConfirmModal(false)} disabled={isRollingKey} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-[#2A2A2A] hover:bg-gray-200 dark:hover:bg-[#333]">Cancel</button>
                  <button onClick={onConfirmRollKey} disabled={isRollingKey} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20">Yes, Roll Key</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL WEBHOOK SECRET */}
      {showWebhookConfirmModal && (
        <div className="fixed inset-0 z-[50] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl p-6 border border-gray-200 dark:border-[#2A2A2A] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center shrink-0"><ShieldCheck size={24} /></div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Roll Webhook Secret</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">Webhook verifications will fail until you update the new secret on your server.</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowWebhookConfirmModal(false)} disabled={isRollingWebhook} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-[#2A2A2A] hover:bg-gray-200 dark:hover:bg-[#333]">Cancel</button>
                  <button onClick={onConfirmRollSecret} disabled={isRollingWebhook} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/20">Yes, Roll Secret</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KONTEN UTAMA */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl flex gap-3 items-start">
        <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
        <div>
          <h4 className="text-sm font-bold text-blue-900 dark:text-blue-400">Security Area</h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 leading-relaxed">Keep your keys safe. Do not expose your Production API Key in client-side code.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Key size={120} /></div>
        <div className="mb-6 relative z-10 border-b border-gray-100 dark:border-[#2A2A2A] pb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Security Credentials</h2>
          <p className="text-xs text-gray-500 mt-1">Manage your API and Webhook keys.</p>
        </div>

        <div className="mb-8 relative z-10">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Production API Key</h3>
          <p className="text-xs text-gray-500 mb-3">Use this secret key to authenticate API requests.</p>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#2A2A2A]">
              <Key size={16} className="text-gray-400" />
              <input type={showKey ? "text" : "password"} value={currentKey} readOnly className="bg-transparent flex-1 outline-none text-sm font-mono text-gray-800 dark:text-gray-200" />
              <button onClick={() => setShowKey(!showKey)} className="text-gray-400 hover:text-blue-500 transition-colors">{showKey ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
            <button onClick={() => handleCopy(currentKey, "API Key")} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-4 rounded-xl font-bold text-sm hover:bg-blue-100 transition-all flex items-center gap-2"><Copy size={16} /> <span className="hidden sm:inline">Copy</span></button>
            <button onClick={() => setShowKeyConfirmModal(true)} disabled={isRollingKey} className="bg-red-50 dark:bg-red-900/20 text-red-600 px-4 rounded-xl font-bold text-sm hover:bg-red-100 disabled:opacity-50 transition-all flex items-center gap-2">
              <RefreshCw size={16} className={isRollingKey ? "animate-spin" : ""} />
              <span className="hidden sm:inline">{isRollingKey ? "Rolling..." : "Roll Key"}</span>
            </button>
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Webhook Signing Secret</h3>
          <p className="text-xs text-gray-500 mb-3">Use this secret to verify X-Trezalink-Signature headers.</p>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#2A2A2A]">
              <ShieldCheck size={16} className="text-gray-400" />
              <input type={showWebhookSecret ? "text" : "password"} value={currentWebhookSecret} readOnly className="bg-transparent flex-1 outline-none text-sm font-mono text-gray-800 dark:text-gray-200" />
              <button onClick={() => setShowWebhookSecret(!showWebhookSecret)} className="text-gray-400 hover:text-blue-500 transition-colors">{showWebhookSecret ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
            <button onClick={() => handleCopy(currentWebhookSecret, "Webhook Secret")} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-4 rounded-xl font-bold text-sm hover:bg-blue-100 transition-all flex items-center gap-2"><Copy size={16} /> <span className="hidden sm:inline">Copy</span></button>
            <button onClick={() => setShowWebhookConfirmModal(true)} disabled={isRollingWebhook} className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 px-4 rounded-xl font-bold text-sm hover:bg-orange-100 disabled:opacity-50 transition-all flex items-center gap-2">
              <RefreshCw size={16} className={isRollingWebhook ? "animate-spin" : ""} />
              <span className="hidden sm:inline">{isRollingWebhook ? "Rolling..." : "Roll Secret"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}