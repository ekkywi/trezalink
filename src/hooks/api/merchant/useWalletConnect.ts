// src/hooks/useWalletConnect.ts
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useWalletConnect(initialWallet: string) {
  const router = useRouter();
  const [wallet, setWallet] = useState(initialWallet);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
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
      return true;
    } catch (error: any) {
      showToast(error.message || "Failed to disconnect wallet.", "error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { wallet, isLoading, toast, handleConnect, executeDisconnect };
}