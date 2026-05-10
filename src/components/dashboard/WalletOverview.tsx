"use client";

import { useState } from "react";
import { Wallet, Unplug, Link as LinkIcon, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface WalletOverviewProps {
  initialWallet: string;
}

export function WalletOverview({ initialWallet }: WalletOverviewProps) {
  const router = useRouter();
  const [wallet, setWallet] = useState(initialWallet);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isPending = wallet.includes("pending");

  const formatWallet = (address: string) => {
    if (address.includes("pending")) return "No Wallet Connected";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnect = async () => {
    setErrorMsg("");
    setIsLoading(true);
    
    try {
      const provider = (window as any).solana;
      if (!provider || !provider.isPhantom) {
        throw new Error("Phantom wallet extension not found. Please install it.");
      }

      const resp = await provider.connect();
      const pubKey = resp.publicKey.toString();
      const message = `Sign this message to link your wallet to Trezalink.\nTimestamp: ${Date.now()}`;
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await provider.signMessage(encodedMessage, "utf8");
      const signatureBase58 = (await import('bs58')).default.encode(signedMessage.signature);
      const res = await fetch("/api/merchant/wallet/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "link",
          publicKey: pubKey,
          signature: signatureBase58,
          message: message
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setWallet(data.walletAddress);
      router.refresh();
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to connect wallet.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!confirm("Are you sure you want to unlink this wallet? You won't be able to receive crypto payments until you link a new one.")) return;
    
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/merchant/wallet/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "unlink" })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setWallet(data.walletAddress);
      
      const provider = (window as any).solana;
      if (provider) await provider.disconnect();
      
      router.refresh();
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to disconnect wallet.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-gray-500" />
          <h3 className="font-bold text-gray-900 dark:text-white">Primary Settlement Wallet</h3>
        </div>
        {!isPending && <CheckCircle2 className="w-5 h-5 text-green-500" />}
      </div>

      <div className="mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Status</p>
        <p className={`font-mono text-sm ${isPending ? "text-gray-400" : "text-blue-600 dark:text-blue-400 font-bold"}`}>
          {formatWallet(wallet)}
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      {isPending ? (
        <button 
          onClick={handleConnect} 
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <> <LinkIcon className="w-4 h-4" /> Connect Wallet</>}
        </button>
      ) : (
        <button 
          onClick={handleDisconnect} 
          disabled={isLoading}
          className="w-full bg-red-50 dark:bg-red-500/10 text-red-600 hover:bg-red-100 dark:hover:bg-red-500/20 text-sm font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <> <Unplug className="w-4 h-4" /> Unlink Wallet</>}
        </button>
      )}
    </div>
  );
}