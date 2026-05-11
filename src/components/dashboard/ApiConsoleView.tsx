// src/components/dashboard/ApiConsoleView.tsx
"use client";

import { useState } from "react";
import { Key, Copy, Eye, EyeOff, RefreshCw, Terminal, CheckCircle2, FileJson, Blocks, Info, AlertTriangle, XCircle } from "lucide-react";

export function ApiConsoleView({ merchant }: { merchant: any }) {
  const [currentKey, setCurrentKey] = useState(merchant.apiKey || "API_KEY_NOT_GENERATED");
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentKey);
    setCopied(true);
    showToast("API Key copied successfully!", "success");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const executeRollKey = async () => {
    setShowConfirmModal(false); 
    setIsRolling(true); 

    try {
      const res = await fetch("/api/merchant/apikey/regenerate", { method: "POST" });
      const data = await res.json();
      
      if (data.success) {
        setCurrentKey(data.apiKey);
        showToast("API Key updated successfully!", "success");
      } else {
        showToast(data.error || "Failed to update API Key.", "error");
      }
    } catch (error) {
      showToast("An network error occurred. Please try again.", "error");
    } finally {
      setIsRolling(false);
    }
  };

  return (
    <div className="space-y-6 relative">

      {toast && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border animate-in slide-in-from-top-5 fade-in duration-300 ${
          toast.type === "success" 
            ? "bg-white dark:bg-[#1E1E1E] border-green-200 dark:border-green-900/30" 
            : "bg-white dark:bg-[#1E1E1E] border-red-200 dark:border-red-900/30"
        }`}>
          <div className={`shrink-0 rounded-full flex items-center justify-center w-8 h-8 ${
            toast.type === "success" ? "bg-green-100 text-green-600 dark:bg-green-900/20" : "bg-red-100 text-red-600 dark:bg-red-900/20"
          }`}>
            {toast.type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          </div>
          <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{toast.message}</p>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 z-[50] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl p-6 border border-gray-200 dark:border-[#2A2A2A] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Critical Action: Roll API Key</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  Rolling your API Key will immediately <strong className="text-red-500">INVALIDATE</strong> your current key. Any active integrations using the old key will start failing (401 Unauthorized). Are you absolutely sure?
                </p>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowConfirmModal(false)}
                    disabled={isRolling}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-[#2A2A2A] hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={executeRollKey}
                    disabled={isRolling}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    Yes, Roll Key
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl flex gap-3 items-start">
        <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
        <div>
          <h4 className="text-sm font-bold text-blue-900 dark:text-blue-400">Developer Area</h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 leading-relaxed">
            This page is intended for developers integrating Trezalink's API into your platform. 
            If you are not a developer, you can <strong>safely ignore this page</strong> and securely pass the API Key below to your technical team.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Key size={100} />
        </div>

        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 relative z-10">Production API Key</h3>
        <p className="text-xs text-gray-500 mb-4 max-w-xl relative z-10">
          Use this secret key to authenticate API requests from your server. Never expose this key in client-side code (browsers or mobile apps).
        </p>
        
        <div className="flex gap-2 relative z-10">
          <div className="flex-1 flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#2A2A2A]">
            <Key size={16} className="text-gray-400" />
            <input 
              type={showKey ? "text" : "password"}
              value={currentKey}
              readOnly
              className="bg-transparent flex-1 outline-none text-sm font-mono text-gray-800 dark:text-gray-200"
            />
            <button onClick={() => setShowKey(!showKey)} className="text-gray-400 hover:text-blue-500 transition-colors">
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          
          <button 
            onClick={handleCopy}
            className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-4 rounded-xl font-bold text-sm hover:bg-blue-100 transition-all flex items-center gap-2"
          >
            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
            <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
          </button>
          
          <button 
            onClick={() => setShowConfirmModal(true)}
            disabled={isRolling}
            className="bg-red-50 dark:bg-red-900/20 text-red-600 px-4 rounded-xl font-bold text-sm hover:bg-red-100 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {isRolling ? (
               <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
            ) : (
               <RefreshCw size={16} />
            )}
            <span className="hidden sm:inline">{isRolling ? "Rolling..." : "Roll Key"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-5 flex items-center justify-between group hover:border-orange-500 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center text-orange-500">
              <FileJson size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">Postman Collection</h4>
              <p className="text-[11px] text-gray-500">Download the .json collection for instant API testing.</p>
            </div>
          </div>
          <button className="text-[10px] font-bold bg-gray-100 dark:bg-[#2A2A2A] px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300">Download</button>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-5 flex items-center justify-between group hover:border-blue-500 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-500">
              <Blocks size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">Platform Plugins</h4>
              <p className="text-[11px] text-gray-500">WooCommerce, Shopify & Magento (Coming Soon)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-green-100 text-green-700 font-black text-[10px] rounded uppercase tracking-widest">POST</span>
            <code className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300">/api/v1/checkout</code>
          </div>
          <p className="text-xs text-gray-500 mb-6">Create a new checkout session and generate a payment URL.</p>
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Request Body Schema</h4>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-[#2A2A2A]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-mono font-bold text-blue-600">orderId</span>
                <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">REQUIRED</span>
              </div>
              <p className="text-[11px] text-gray-500">String. A unique identifier for the transaction from your system.</p>
            </div>
            
            <div className="p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-[#2A2A2A]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-mono font-bold text-blue-600">amount</span>
                <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">REQUIRED</span>
              </div>
              <p className="text-[11px] text-gray-500">Number. The payment amount in SOL (must be positive).</p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-[#2A2A2A]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-mono font-bold text-blue-600">currency</span>
                <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">REQUIRED</span>
              </div>
              <p className="text-[11px] text-gray-500">String. The currency code. Currently only supports <code className="text-gray-800 dark:text-white">"SOL"</code>.</p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-[#2A2A2A]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-mono font-bold text-blue-600">customerEmail</span>
                <span className="text-[9px] font-bold text-gray-500 bg-gray-200 dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded">OPTIONAL</span>
              </div>
              <p className="text-[11px] text-gray-500">String. Buyer's email address for notifications and receipts.</p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-[#2A2A2A]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-mono font-bold text-blue-600">successUrl</span>
                <span className="text-[9px] font-bold text-gray-500 bg-gray-200 dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded">OPTIONAL</span>
              </div>
              <p className="text-[11px] text-gray-500">String. URL to redirect the buyer after a successful payment.</p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-[#2A2A2A]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-mono font-bold text-blue-600">cancelUrl</span>
                <span className="text-[9px] font-bold text-gray-500 bg-gray-200 dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded">OPTIONAL</span>
              </div>
              <p className="text-[11px] text-gray-500">String. URL to redirect the buyer if they cancel the payment process.</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <Terminal size={16} />
            <h4 className="text-xs font-bold">cURL Example</h4>
          </div>
          <div className="flex-1 bg-[#151515] rounded-xl p-4 overflow-x-auto">
<pre className="text-[11px] font-mono text-gray-300 leading-relaxed">
<span className="text-pink-500">curl</span> -X POST https://api.trezalink.com/v1/checkout \
<br/>  -H <span className="text-green-400">"Content-Type: application/json"</span> \
<br/>  -H <span className="text-green-400">"Authorization: Bearer YOUR_API_KEY"</span> \
<br/>  -d <span className="text-yellow-300">'{'{'}</span>
<br/>    <span className="text-blue-300">"orderId"</span>: <span className="text-green-400">"INV-2026-001"</span>,
<br/>    <span className="text-blue-300">"amount"</span>: <span className="text-orange-400">0.5</span>,
<br/>    <span className="text-blue-300">"currency"</span>: <span className="text-green-400">"SOL"</span>,
<br/>    <span className="text-blue-300">"customerEmail"</span>: <span className="text-green-400">"buyer@example.com"</span>,
<br/>    <span className="text-blue-300">"successUrl"</span>: <span className="text-green-400">"https://yourstore.com/success"</span>,
<br/>    <span className="text-blue-300">"cancelUrl"</span>: <span className="text-green-400">"https://yourstore.com/cart"</span>
<br/>  <span className="text-yellow-300">{'}'}'</span>
</pre>
          </div>
        </div>

      </div>
    </div>
  );
}