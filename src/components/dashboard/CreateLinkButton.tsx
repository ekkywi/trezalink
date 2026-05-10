// src/components/dashboard/CreateLinkButton.tsx
"use client";

import { useState } from "react";
import { Plus, Copy, Check, AlertCircle } from "lucide-react";
import { createManualPaymentLink } from "@/app/actions/payment-link";

export function CreateLinkButton({ merchantId }: { merchantId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    
    const formData = new FormData(e.currentTarget);
    
    const result = await createManualPaymentLink({
      merchantId,
      amount: parseFloat(formData.get("amount") as string),
      orderId: formData.get("orderId") as string,
      customerEmail: formData.get("email") as string,
    });

    if (result.success) {
      const url = `${window.location.origin}/pay/${result.transactionId}`;
      setGeneratedLink(url);
    } else {
      setErrorMsg(result.error || "An error occurred");
    }
    setLoading(false);
  }

  const closeAndReset = () => {
    setIsOpen(false);
    setGeneratedLink("");
    setErrorMsg("");
  }

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
      >
        <Plus size={18} /> Create Link
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-2xl p-6 border border-gray-200 dark:border-[#2A2A2A] shadow-2xl">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Create New Payment Link</h3>
            
            {/* TAMPILKAN BANNER ERROR JIKA ADA */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl flex items-start gap-2 text-red-600 dark:text-red-400">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <p className="text-xs font-medium">{errorMsg}</p>
              </div>
            )}

            {!generatedLink ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Amount (SOL)*</label>
                  <input name="amount" type="number" step="0.000000001" min="0" required className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-3 text-sm outline-none focus:border-blue-500 transition-all dark:text-white" placeholder="0.1" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Reference / Order ID (Optional)</label>
                  <input name="orderId" type="text" className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-3 text-sm outline-none focus:border-blue-500 transition-all dark:text-white" placeholder="e.g. INV-001 (Leave blank to auto-generate)" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeAndReset} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2A2A2A] transition-all">Cancel</button>
                  <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-all">
                    {loading ? "Generating..." : "Generate Link"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check size={32} />
                </div>
                <p className="text-sm text-gray-500">Payment link ready to share!</p>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#151515] p-3 rounded-xl border border-gray-200 dark:border-[#2A2A2A]">
                  <input readOnly value={generatedLink} className="bg-transparent flex-1 outline-none text-xs font-mono dark:text-gray-300" />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(generatedLink);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-blue-600"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                <button onClick={closeAndReset} className="w-full py-3 text-sm font-bold text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}