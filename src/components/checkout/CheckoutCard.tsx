// src/components/checkout/CheckoutCard.tsx
"use client";

import { Wallet, ArrowRight, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { useSolanaCheckout } from "@/hooks/web3/useSolanaCheckout";

export function CheckoutCard({ transaction }: { transaction: any }) {
  const { loading, success, error, connected, handlePayment } = useSolanaCheckout(transaction);

  if (success) {
    return (
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-500 mb-6">Your transaction has been confirmed on the Solana blockchain.</p>
        <button 
          onClick={() => window.location.reload()}
          className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
        >
          Return to Merchant
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
      {/* Info Toko */}
      <div className="p-6 border-b border-gray-50 bg-gray-50/50">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-tight mb-1">Paying to</p>
            <h2 className="text-xl font-black text-gray-900">{transaction.merchant.businessName}</h2>
          </div>
          <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              {transaction.merchant.businessName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Nominal */}
      <div className="p-8 text-center">
        <p className="text-sm text-gray-500 mb-1">Total Amount</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-5xl font-black text-gray-900">{transaction.amount}</span>
          <span className="text-2xl font-bold text-gray-400">{transaction.currency}</span>
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 py-1 px-3 bg-gray-100 rounded-full text-[10px] font-bold text-gray-500 uppercase">
          <Info size={12} />
          Order ID: {transaction.orderId}
        </div>
      </div>

      {/* Tombol Aksi & Error Handling */}
      <div className="p-6 pt-0 space-y-4">
        
        {/* Mengganti alert() browser dengan UI Error yang elegan */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <AlertTriangle size={14} className="shrink-0" />
            <span className="break-words">{error}</span>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 ${
            connected 
              ? "bg-gray-900 hover:bg-black text-white" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } disabled:opacity-50`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Wallet size={20} />
              <span>{connected ? "Pay with Phantom" : "Connect Wallet to Pay"}</span>
              <ArrowRight size={18} className="ml-2 opacity-50" />
            </>
          )}
        </button>
        
        <p className="text-center text-[10px] text-gray-400 px-6">
          By clicking pay, you agree to process this transaction on the Solana Blockchain.
        </p>
      </div>
    </div>
  );
}