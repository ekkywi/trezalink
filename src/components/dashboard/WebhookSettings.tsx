// src/components/dashboard/WebhookSettings.tsx
"use client";

import { useState } from "react";
import { Globe, Save, CheckCircle2, AlertCircle } from "lucide-react";

export function WebhookSettings({ merchant }: { merchant: any }) {
  const [url, setUrl] = useState(merchant.webhookUrl || "");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const handleSave = async () => {
    if (!url) return;
    
    setLoading(true);
    setStatus(null);
    
    try {
      const res = await fetch("/api/merchant/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookUrl: url }),
      });

      if (res.ok) {
        setStatus({ type: 'success', msg: 'Webhook URL updated successfully!' });
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      setStatus({ type: 'error', msg: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
          <Globe size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Webhook Configuration</h3>
          <p className="text-xs text-gray-500">Receive real-time notifications for successful payments.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
            Endpoint URL
          </label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-[#2A2A2A] focus-within:border-blue-500 transition-all">
              <input 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-api.com/webhook"
                className="bg-transparent flex-1 outline-none text-sm font-mono dark:text-white"
              />
            </div>
            <button 
              onClick={handleSave}
              disabled={loading || !url}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Save size={16} /> Save</>
              )}
            </button>
          </div>
        </div>

        {status && (
          <div className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold ${
            status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {status.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
            {status.msg}
          </div>
        )}

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 rounded-xl">
          <p className="text-[10px] text-yellow-700 dark:text-yellow-500 leading-relaxed">
            <strong>Note:</strong> We will send a POST request with the payment details to this URL as soon as a transaction is confirmed on the blockchain.
          </p>
        </div>
      </div>
    </div>
  );
}