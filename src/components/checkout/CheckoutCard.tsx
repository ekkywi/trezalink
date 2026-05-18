// src/components/checkout/CheckoutCard.tsx
"use client";

import { Wallet, ArrowRight, CheckCircle2, AlertTriangle, Loader2, Copy, ExternalLink, Link2 } from "lucide-react";
import { useSolanaCheckout } from "@/hooks/web3/useSolanaCheckout";
import { useState } from "react";

export function CheckoutCard({ transaction }: { transaction: any }) {
  const { loading, success, error, connected, handlePayment, signature } = useSolanaCheckout(transaction) as any;
  
  const [copied, setCopied] = useState(false);

  const copyOrderId = () => {
    navigator.clipboard.writeText(transaction.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (success) {
    return (
      <div className="w-full bg-white/90 dark:bg-[#111111]/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl shadow-gray-200/50 dark:shadow-black/50 border border-white/60 dark:border-white/10 p-8 text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30 ring-8 ring-green-50 dark:ring-green-500/10">
          <CheckCircle2 size={40} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Payment Successful!</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Your transaction has been confirmed on the Solana blockchain.</p>
        
        {signature && (
          <div className="mb-8 p-3 bg-gray-50/80 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 flex items-center justify-between text-left shadow-inner">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
                <Link2 size={16} />
              </div>
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500">Receipt</p>
                <p className="text-[11px] font-mono font-medium text-gray-900 dark:text-white mt-0.5">
                  {signature.substring(0, 6)}...{signature.slice(-6)}
                </p>
              </div>
            </div>
            <a 
              href={`https://solscan.io/tx/${signature}?cluster=devnet`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-white dark:bg-[#222] hover:bg-gray-100 dark:hover:bg-[#333] border border-gray-200 dark:border-[#444] rounded-lg text-[10px] font-bold text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1.5 shadow-sm"
            >
              Verify <ExternalLink size={10} />
            </a>
          </div>
        )}

        <button 
          onClick={() => window.location.reload()}
          className="w-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-md"
        >
          {transaction.successUrl ? "Continue to Merchant" : "View Final Receipt"}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white/90 dark:bg-[#111111]/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl shadow-gray-200/50 dark:shadow-black/50 border border-white/60 dark:border-white/10 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

      <div className="pt-10 pb-6 px-8 flex flex-col items-center border-b border-gray-100 dark:border-white/5">
        <div className="w-14 h-14 rounded-full bg-white dark:bg-[#222] border border-gray-200 dark:border-[#333] flex items-center justify-center text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4 shadow-sm">
          {transaction.merchant.businessName.charAt(0).toUpperCase()}
        </div>
        
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
          Paying to <span className="font-bold text-gray-900 dark:text-white">{transaction.merchant.businessName}</span>
        </p>

        <div className="flex items-baseline gap-1.5 mb-5 mt-2">
          <span className="text-[48px] leading-none font-bold tracking-tighter text-gray-900 dark:text-white">
            {transaction.amount}
          </span>
          <span className="text-lg font-bold text-gray-400 dark:text-gray-500 tracking-wide">
            SOL
          </span>
        </div>

        <button 
          onClick={copyOrderId}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full border border-gray-200/50 dark:border-white/5 transition-colors group"
        >
          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Ref: <span className="font-mono text-gray-900 dark:text-white ml-1 tracking-normal">{transaction.orderId.substring(0, 10)}</span></span>
          {copied ? <CheckCircle2 size={12} className="text-green-500" /> : <Copy size={12} className="text-gray-400 group-hover:text-gray-600" />}
        </button>
      </div>

      <div className="p-6 sm:p-8 bg-transparent">
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-xs font-medium flex items-start gap-3 animate-in fade-in">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span className="break-words leading-relaxed">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-[13px] text-gray-500 dark:text-gray-400 text-center mb-6 px-4">
            Connect your secure browser wallet (Phantom, Backpack, Solflare) to approve this transaction.
          </p>

          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-4.5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg group ${
              connected 
                ? "bg-gray-900 hover:bg-black text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 shadow-gray-900/20" 
                : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 text-white shadow-blue-500/30"
            } disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Confirming in Wallet...</span>
              </>
            ) : (
              <>
                <Wallet size={20} className={connected ? "" : "text-white/80"} />
                <span>{connected ? "Pay with Wallet" : "Connect Wallet"}</span>
                <ArrowRight size={18} className="ml-1 opacity-60 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          
          <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 px-6 font-medium">
            By proceeding, you agree to execute a smart contract on the Solana blockchain.
          </p>
        </div>
      </div>
    </div>
  );
}