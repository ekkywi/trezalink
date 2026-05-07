"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, 
  Globe, Wallet, Fingerprint, Loader2
} from "lucide-react";
import bs58 from "bs58";

export default function LoginPage() {
  const router = useRouter();
  
  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"email" | "wallet">("email");

  // Form Data States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Status States
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // === FUNGSI EKSEKUSI LOGIN EMAIL ===
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMsg("Email and password are required!");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to login");
      }

      setSuccessMsg("Authentication successful! Redirecting to dashboard...");
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // === FUNGSI EKSEKUSI LOGIN WALLET (WEB3) ===
  const handleWalletLogin = async () => {
    setIsWalletLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // 1. Deteksi ekstensi Wallet (Phantom)
      const provider = (window as any).solana;
      if (!provider || !provider.isPhantom) {
        throw new Error("Solana wallet not found! Please install Phantom Wallet.");
      }

      // 2. Hubungkan dompet & ambil kunci publik
      const { publicKey } = await provider.connect();
      const address = publicKey.toString();

      // 3. Buat payload unik untuk ditandatangani
      const message = `Authenticate with Kirupay\n\nWallet: ${address}\nTimestamp: ${Date.now()}`;
      const encodedMessage = new TextEncoder().encode(message);

      // 4. Minta pengguna menandatangani payload menggunakan dompet mereka
      const signedMessage = await provider.signMessage(encodedMessage, "utf8");
      const signature = bs58.encode(signedMessage.signature);

      // 5. Kirim data ke backend untuk verifikasi kriptografi
      const response = await fetch("/api/auth/wallet/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicKey: address,
          signature: signature,
          message: message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Wallet authentication failed.");
      }

      setSuccessMsg("Wallet Authenticated! Redirecting...");
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (error: any) {
      // Penanganan pembatalan oleh pengguna
      if (error.message.includes("User rejected")) {
        setErrorMsg("Authentication request was canceled.");
      } else {
        setErrorMsg(error.message);
      }
    } finally {
      setIsWalletLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#FDFDFD] dark:bg-[#030305] transition-colors duration-300">
      
      {/* ================= SISI KIRI: PREMIUM BRANDING (TETAP SAMA) ================= */}
      <section className="hidden md:flex md:w-[45%] lg:w-[55%] bg-[#0A0A0B] relative overflow-hidden p-12 lg:p-20 flex-col justify-between">
        <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-purple-600/10 rounded-full blur-[100px]"></div>

        <Link href="/" className="relative z-10 flex items-center gap-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform">
             <span className="text-white font-black text-2xl italic">K</span>
          </div>
          <span className="text-white font-black text-2xl tracking-tighter italic">KIRUPAY</span>
        </Link>

        <div className="relative z-10">
          <motion.h2 initial="hidden" animate="visible" variants={fadeIn} className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Global payments<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">reimagined.</span>
          </motion.h2>
          <p className="text-white/50 text-lg max-w-md">
            The infrastructure for the next generation of digital commerce. Built on the speed of Solana.
          </p>
        </div>

        <div className="relative z-10 flex gap-6 text-white/30 text-xs font-bold uppercase tracking-widest">
          <span>Security Audit: Passed</span>
          <span>SLA: 99.9%</span>
        </div>
      </section>

      {/* ================= SISI KANAN: LOGIN CARD ================= */}
      <section className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-24 bg-white dark:bg-[#030305]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="md:hidden flex justify-center mb-12">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><span className="text-white font-black italic">K</span></div>
              <span className="text-gray-900 dark:text-white font-black text-xl italic tracking-tighter">KIRUPAY</span>
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Access Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back! Choose your preferred login method.</p>
          </div>

          <div className="flex bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl mb-8">
            <button 
              onClick={() => { setActiveTab("email"); setErrorMsg(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "email" ? "bg-white dark:bg-white/10 text-blue-600 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              <Mail className="w-4 h-4" /> Email
            </button>
            <button 
              onClick={() => { setActiveTab("wallet"); setErrorMsg(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "wallet" ? "bg-white dark:bg-white/10 text-purple-600 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              <Wallet className="w-4 h-4" /> Wallet
            </button>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-xl text-center font-medium">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-6 p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm rounded-xl text-center font-medium">
              {successMsg}
            </div>
          )}

          <AnimatePresence mode="wait">
            {activeTab === "email" ? (
              <motion.form key="email" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-5" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">Merchant Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input type="email" placeholder="name@company.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-blue-500 focus:bg-white dark:focus:bg-transparent text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all"/>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Security Password</label>
                    <Link href="#" className="text-xs font-bold text-blue-600 hover:underline">Recovery?</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input type={showPassword ? "text" : "password"} placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-blue-500 focus:bg-white dark:focus:bg-transparent text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-12 outline-none transition-all"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-black py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                  {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>
              </motion.form>
            ) : (
              <motion.div key="wallet" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                <div className="p-6 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-[2rem] text-center">
                  <div className="w-16 h-16 bg-purple-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Fingerprint className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Web3 Authentication</h3>
                  <p className="text-sm text-gray-500">Sign a unique payload with your Solana wallet to verify ownership.</p>
                </div>
                
                {/* TOMBOL LOGIN WALLET BARU */}
                <button 
                  onClick={handleWalletLogin}
                  disabled={isWalletLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isWalletLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Wallet className="w-5 h-5" /> Connect & Sign
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 text-center">
              <div className="relative flex items-center justify-center mb-8">
                <div className="absolute w-full border-t border-gray-100 dark:border-white/5"></div>
                <span className="relative bg-white dark:bg-[#030305] px-4 text-[10px] uppercase font-black tracking-widest text-gray-400">Or continue with</span>
              </div>
            <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-all text-xs font-bold">
              <Globe className="w-4 h-4 text-blue-500" /> Sign in with Google
            </button>
            <div className="mt-8 text-sm text-gray-500">
              Don't have an account? <Link href="/register" className="text-blue-600 font-bold hover:underline">Sign Up</Link>
            </div>
            <p className="mt-10 text-xs text-gray-400">
              By signing in, you agree to our <Link href="#" className="underline">Terms of Protocol</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}