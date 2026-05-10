// src/components/checkout/CheckoutCard.tsx
"use client";

import { useState } from "react";
import { Wallet, ArrowRight, Info, CheckCircle2 } from "lucide-react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

export function CheckoutCard({ transaction }: { transaction: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Hook Web3 Solana
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const { setVisible } = useWalletModal();

  const handlePayment = async () => {
    if (!connected || !publicKey) {
      setVisible(true);
      return;
    }

    setLoading(true);
    try {
      const merchantPubKey = new PublicKey(transaction.merchant.walletAddress);
      const lamports = transaction.amount * LAMPORTS_PER_SOL;

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: merchantPubKey,
          lamports: lamports,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      const signature = await sendTransaction(tx, connection);

      await connection.confirmTransaction(signature, "confirmed");

      await fetch("/api/internal/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionId: transaction.id,
          signature: signature,
        }),
      });

      setSuccess(true);
      
      console.log("Transaction successful, signature:", signature);

    } catch (error: any) {
      console.error("Payment failed", error);
      alert("Payment failed or cancelled: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-500 mb-6">Your transaction has been confirmed on the Solana blockchain.</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-bold hover:bg-gray-200 transition-colors"
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
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
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

      {/* Tombol Aksi */}
      <div className="p-6 pt-0">
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
        
        <p className="text-center text-[10px] text-gray-400 mt-4 px-6">
          By clicking pay, you agree to process this transaction on the Solana Blockchain.
        </p>
      </div>
    </div>
  );
}