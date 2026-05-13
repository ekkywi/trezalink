// src/hooks/web3/useSolanaCheckout.ts
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

export function useSolanaCheckout(transaction: any) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const { setVisible } = useWalletModal();

  const handlePayment = async () => {
    if (!connected || !publicKey) {
      setVisible(true);
      return;
    }

    setLoading(true);
    setError(null);
    
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

      const res = await fetch("/api/internal/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionId: transaction.id,
          signature: signature,
        }),
      });

      if (!res.ok) throw new Error("Transaction recorded on chain, but failed to sync with server.");

      setSuccess(true);
      console.log("Transaction successful, signature:", signature);

    } catch (err: any) {
      console.error("Payment failed", err);
      setError(err.message || "Payment failed or cancelled."); 
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, error, connected, handlePayment };
}