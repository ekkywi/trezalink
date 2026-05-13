// src/components/dashboard/ApiConsoleView.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  Key, Copy, Eye, EyeOff, RefreshCw, Terminal, 
  CheckCircle2, FileJson, Blocks, Info, 
  AlertTriangle, XCircle, ShieldCheck, Activity, Clock, BookOpen
} from "lucide-react";

export function ApiConsoleView({ merchant }: { merchant: any }) {
  // --- STATE TABS & LOGS ---
  const [activeTab, setActiveTab] = useState<"credentials" | "docs" | "logs">("credentials");
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  // --- STATE KREDENSIAL ---
  const [currentKey, setCurrentKey] = useState(merchant.apiKey || "API_KEY_NOT_GENERATED");
  const [currentWebhookSecret, setCurrentWebhookSecret] = useState(merchant.webhookSecret || "WEBHOOK_SECRET_NOT_GENERATED");
  const [showKey, setShowKey] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  
  // DIPISAH KEMBALI: State Loading
  const [isRollingKey, setIsRollingKey] = useState(false);
  const [isRollingWebhook, setIsRollingWebhook] = useState(false);
  
  // DIPISAH KEMBALI: State Modal
  const [showKeyConfirmModal, setShowKeyConfirmModal] = useState(false);
  const [showWebhookConfirmModal, setShowWebhookConfirmModal] = useState(false);
  
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // --- EFEK MENGAMBIL DATA LOGS ---
  useEffect(() => {
    if (activeTab === "logs") {
      fetchLogs();
    }
  }, [activeTab]);

  const fetchLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const res = await fetch("/api/merchant/webhook/logs");
      const json = await res.json();
      if (json.success) {
        setLogs(json.data);
      }
    } catch (error) {
      console.error("Gagal mengambil log", error);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied successfully!`, "success");
  };
  
  // DIPISAH KEMBALI: Fungsi Eksekusi API Key
  const executeRollKey = async () => {
    setShowKeyConfirmModal(false); 
    setIsRollingKey(true); 

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
      showToast("A network error occurred. Please try again.", "error");
    } finally {
      setIsRollingKey(false);
    }
  };

  // DIPISAH KEMBALI: Fungsi Eksekusi Webhook Secret
  const executeRollWebhookSecret = async () => {
    setShowWebhookConfirmModal(false);
    setIsRollingWebhook(true);

    try {
      const res = await fetch("/api/merchant/webhook/regenerate", { method: "POST" });
      const data = await res.json();
      
      if (data.success) {
        setCurrentWebhookSecret(data.webhookSecret);
        showToast("Webhook Secret updated successfully!", "success");
      } else {
        showToast(data.error || "Failed to update Webhook Secret.", "error");
      }
    } catch (error) {
      showToast("A network error occurred. Please try again.", "error");
    } finally {
      setIsRollingWebhook(false);
    }
  };

  return (
    <div className="space-y-6 relative">

      {/* --- TOAST --- */}
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

      {/* --- MODAL KONFIRMASI API KEY --- */}
      {showKeyConfirmModal && (
        <div className="fixed inset-0 z-[50] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl p-6 border border-gray-200 dark:border-[#2A2A2A] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Critical Action: Roll API Key</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  Rolling your API Key will immediately <strong className="text-red-500">INVALIDATE</strong> your current key. Any active integrations using the old key will start failing. Are you sure?
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setShowKeyConfirmModal(false)} disabled={isRollingKey} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-[#2A2A2A] hover:bg-gray-200 dark:hover:bg-[#333] transition-colors">Cancel</button>
                  <button onClick={executeRollKey} disabled={isRollingKey} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all active:scale-95 disabled:opacity-50">Yes, Roll Key</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL KONFIRMASI WEBHOOK SECRET --- */}
      {showWebhookConfirmModal && (
        <div className="fixed inset-0 z-[50] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl p-6 border border-gray-200 dark:border-[#2A2A2A] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Roll Webhook Secret</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  Webhook verifications will fail until you update the new secret on your server. Are you sure you want to proceed?
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setShowWebhookConfirmModal(false)} disabled={isRollingWebhook} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-[#2A2A2A] hover:bg-gray-200 dark:hover:bg-[#333] transition-colors">Cancel</button>
                  <button onClick={executeRollWebhookSecret} disabled={isRollingWebhook} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all active:scale-95 disabled:opacity-50">Yes, Roll Secret</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL JSON DETAIL LOG --- */}
      {selectedLog && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-gray-200 dark:border-[#2A2A2A] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-[#2A2A2A] flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Webhook Delivery Detail</h3>
                <p className="text-xs text-gray-500 mt-1">{new Date(selectedLog.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedLog(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-[#2A2A2A] rounded-full text-gray-500 transition-colors">
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#2A2A2A]">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Status</p>
                  <p className={`text-sm font-bold ${selectedLog.status === 200 ? 'text-green-500' : 'text-red-500'}`}>
                    {selectedLog.status ? `${selectedLog.status} OK` : 'Connection Failed'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#2A2A2A] truncate">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Event</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{selectedLog.event}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-2">Request Payload (JSON)</p>
                <div className="bg-[#0D0D0D] rounded-xl p-4 overflow-x-auto border border-[#2A2A2A]">
                  <pre className="text-[11px] font-mono text-green-400">
                    {JSON.stringify(JSON.parse(selectedLog.payload), null, 2)}
                  </pre>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-2">Server Response</p>
                <div className="bg-gray-50 dark:bg-[#151515] rounded-xl p-4 overflow-x-auto border border-gray-200 dark:border-[#2A2A2A]">
                  <pre className="text-[11px] font-mono text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {selectedLog.response || "No response data"}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB NAVIGATION HEADER --- */}
      <div className="flex gap-6 border-b border-gray-200 dark:border-[#2A2A2A] overflow-x-auto hide-scrollbar">
        <button 
          onClick={() => setActiveTab("credentials")} 
          className={`pb-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "credentials" 
              ? "border-blue-500 text-blue-600 dark:text-blue-500" 
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <Key size={16} /> API & Credentials
        </button>
        <button 
          onClick={() => setActiveTab("docs")} 
          className={`pb-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "docs" 
              ? "border-purple-500 text-purple-600 dark:text-purple-500" 
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <BookOpen size={16} /> API Docs
        </button>
        <button 
          onClick={() => setActiveTab("logs")} 
          className={`pb-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "logs" 
              ? "border-orange-500 text-orange-600 dark:text-orange-500" 
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <Activity size={16} /> Webhook Logs
        </button>
      </div>

      {/* ========================================= */}
      {/* KONTEN TAB 1: KREDENSIAL                  */}
      {/* ========================================= */}
      {activeTab === "credentials" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl flex gap-3 items-start">
            <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
            <div>
              <h4 className="text-sm font-bold text-blue-900 dark:text-blue-400">Security Area</h4>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 leading-relaxed">
                Keep your keys safe. Do not expose your Production API Key in client-side code (browsers or mobile apps).
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Key size={120} /></div>
            
            <div className="mb-6 relative z-10 border-b border-gray-100 dark:border-[#2A2A2A] pb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Security Credentials</h2>
              <p className="text-xs text-gray-500 mt-1">Manage your API and Webhook keys.</p>
            </div>

            {/* API KEY SECTION */}
            <div className="mb-8 relative z-10">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Production API Key</h3>
              <p className="text-xs text-gray-500 mb-3">Use this secret key to authenticate API requests from your server.</p>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#2A2A2A]">
                  <Key size={16} className="text-gray-400" />
                  <input type={showKey ? "text" : "password"} value={currentKey} readOnly className="bg-transparent flex-1 outline-none text-sm font-mono text-gray-800 dark:text-gray-200" />
                  <button onClick={() => setShowKey(!showKey)} className="text-gray-400 hover:text-blue-500 transition-colors">{showKey ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
                <button onClick={() => handleCopy(currentKey, "API Key")} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-4 rounded-xl font-bold text-sm hover:bg-blue-100 transition-all flex items-center gap-2">
                  <Copy size={16} /> <span className="hidden sm:inline">Copy</span>
                </button>
                <button onClick={() => setShowKeyConfirmModal(true)} disabled={isRollingKey} className="bg-red-50 dark:bg-red-900/20 text-red-600 px-4 rounded-xl font-bold text-sm hover:bg-red-100 disabled:opacity-50 transition-all flex items-center gap-2">
                  {isRollingKey ? <RefreshCw className="animate-spin" size={16} /> : <RefreshCw size={16} />}
                  <span className="hidden sm:inline">{isRollingKey ? "Rolling..." : "Roll Key"}</span>
                </button>
              </div>
            </div>

            {/* WEBHOOK SECRET SECTION */}
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Webhook Signing Secret</h3>
              <p className="text-xs text-gray-500 mb-3">Use this secret to verify X-Trezalink-Signature headers.</p>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#2A2A2A]">
                  <ShieldCheck size={16} className="text-gray-400" />
                  <input type={showWebhookSecret ? "text" : "password"} value={currentWebhookSecret} readOnly className="bg-transparent flex-1 outline-none text-sm font-mono text-gray-800 dark:text-gray-200" />
                  <button onClick={() => setShowWebhookSecret(!showWebhookSecret)} className="text-gray-400 hover:text-blue-500 transition-colors">{showWebhookSecret ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
                <button onClick={() => handleCopy(currentWebhookSecret, "Webhook Secret")} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-4 rounded-xl font-bold text-sm hover:bg-blue-100 transition-all flex items-center gap-2">
                  <Copy size={16} /> <span className="hidden sm:inline">Copy</span>
                </button>
                <button onClick={() => setShowWebhookConfirmModal(true)} disabled={isRollingWebhook} className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 px-4 rounded-xl font-bold text-sm hover:bg-orange-100 disabled:opacity-50 transition-all flex items-center gap-2">
                  {isRollingWebhook ? <RefreshCw className="animate-spin" size={16} /> : <RefreshCw size={16} />}
                  <span className="hidden sm:inline">{isRollingWebhook ? "Rolling..." : "Roll Secret"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* KONTEN TAB 2: API DOCS                    */}
      {/* ========================================= */}
      {activeTab === "docs" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
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
<span className="text-pink-500">curl</span> -X POST https://trezalink.com/api/v1/checkout \
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
      )}

      {/* ========================================= */}
      {/* KONTEN TAB 3: WEBHOOK LOGS                */}
      {/* ========================================= */}
      {activeTab === "logs" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Delivery History</h2>
              <p className="text-xs text-gray-500">Menampilkan 50 riwayat webhook terakhir yang dikirim ke server Anda.</p>
            </div>
            <button onClick={fetchLogs} className="p-2 bg-gray-100 dark:bg-[#2A2A2A] rounded-lg text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
              <RefreshCw size={16} className={isLoadingLogs ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl overflow-hidden shadow-sm">
            {isLoadingLogs && logs.length === 0 ? (
              <div className="p-10 flex flex-col items-center justify-center text-gray-400">
                <RefreshCw className="animate-spin mb-3" size={24} />
                <p className="text-sm">Memuat log...</p>
              </div>
            ) : logs.length === 0 ? (
              <div className="p-10 flex flex-col items-center justify-center text-gray-400">
                <Activity className="mb-3 opacity-20" size={48} />
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Belum Ada Riwayat</p>
                <p className="text-xs mt-1 text-center max-w-xs">Trezalink belum mengirimkan event webhook apapun ke server Anda.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50 dark:bg-[#151515] text-gray-500 text-[11px] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-4 rounded-tl-2xl">Waktu Pengiriman</th>
                      <th className="p-4">Event</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right rounded-tr-2xl">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-[#2A2A2A]">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-[#151515]/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Clock size={14} className="opacity-50" />
                            <span>{new Date(log.createdAt).toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] text-gray-800 dark:text-gray-300 px-2.5 py-1 rounded-md font-bold">
                            {log.event}
                          </code>
                        </td>
                        <td className="p-4">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                            log.status === 200 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                              : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${log.status === 200 ? 'bg-green-500' : 'bg-red-500'}`} />
                            {log.status ? `${log.status} OK` : 'Timeout / Err'}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => setSelectedLog(log)}
                            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Lihat JSON
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}