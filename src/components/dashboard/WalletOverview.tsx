// src/components/dashboard/WalletOverview.tsx

"use client";

import { useState } from "react";
import { Wallet, Unplug, Link as LinkIcon, CheckCircle2, Loader2, AlertTriangle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface WalletOverviewProps {
  initialWallet: string;
}

export function WalletOverview({ initialWallet }: WalletOverviewProps) {
  const router = useRouter();
  const [wallet, setWallet] = useState(initialWallet);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const isPending = wallet.includes("pending");

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const formatWallet = (address: string) => {
    if (address.includes("pending")) return "No Wallet Connected";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  const handleConnect = async () => {
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
      showToast("Wallet connected successfully!", "success");
    } catch (error: any) {
      showToast(error.message || "Failed to connect wallet.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const executeDisconnect = async () => {
    setShowConfirmModal(false);
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
      showToast("Wallet unlinked successfully!", "success");
    } catch (error: any) {
      showToast(error.message || "Failed to disconnect wallet.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-5 shadow-sm">
      
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
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Unlink Wallet</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  Are you sure you want to unlink this wallet? You will <strong className="text-red-500">stop receiving crypto payments</strong> until a new wallet is connected.
                </p>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowConfirmModal(false)}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-[#2A2A2A] hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={executeDisconnect}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    Yes, Unlink
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
          onClick={() => setShowConfirmModal(true)} 
          disabled={isLoading}
          className="w-full bg-red-50 dark:bg-red-500/10 text-red-600 hover:bg-red-100 dark:hover:bg-red-500/20 text-sm font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <> <Unplug className="w-4 h-4" /> Unlink Wallet</>}
        </button>
      )}
    </div>
  );
}