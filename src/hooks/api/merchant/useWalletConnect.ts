// src/hooks/api/merchant/useWalletConnect.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export function useWalletConnect(initialWallet: string) {
  const router = useRouter();
  const [wallet, setWallet] = useState(initialWallet);
  const [balance, setBalance] = useState<number | null>(null);
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchBalance = async (walletAddress: string) => {
    if (walletAddress.includes("pending")) return;
    
    setIsFetchingBalance(true);
    try {
      // Catatan: Gunakan "https://api.mainnet-beta.solana.com" jika sudah rilis sungguhan
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
      const pubKey = new PublicKey(walletAddress);
      
      const lamports = await connection.getBalance(pubKey);
      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Gagal mengambil saldo", error);
      setBalance(null);
    } finally {
      setIsFetchingBalance(false);
    }
  };

  useEffect(() => {
    if (!wallet.includes("pending")) {
      fetchBalance(wallet);
    } else {
      setBalance(null);
    }
  }, [wallet]);

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
        body: JSON.stringify({ action: "link", publicKey: pubKey, signature: signatureBase58, message })
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
      setBalance(null);
      
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

  return { wallet, balance, isFetchingBalance, isLoading, toast, handleConnect, executeDisconnect };
}