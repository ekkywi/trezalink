"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, 
  Globe, Wallet, CheckCircle2, Building2, ShieldCheck, Loader2
} from "lucide-react";
import { useRouter } from "next/navigation"; 
import bs58 from "bs58";

export default function RegisterPage() {
  const router = useRouter();
  
  // Tab & UI States
  const [activeTab, setActiveTab] = useState<"email" | "wallet">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form Data States
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Submission States
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const sellingPoints = [
    "Non-custodial wallet architecture",
    "Direct Solana settlement (No middleman)",
    "Comprehensive API & Webhook suite",
    "Enterprise-grade security standards"
  ];

  // === FUNGSI EKSEKUSI REGISTER EMAIL ===
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    
    if (!passwordRegex.test(password)) {
      setErrorMsg("Password is too weak! Must be at least 12 characters long, contain uppercase and lowercase letters, a number, and a special character.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: businessName,
          email: email,
          password: password,
          walletAddress: "pending_" + Date.now() + "_setup" 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register. Please try again.");
      }

      setSuccessMsg("Registration successful! Please check your email to set up your password.");
      setTimeout(() => router.push("/login"), 2000);

    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // === FUNGSI EKSEKUSI REGISTER WALLET (WEB3) ===
  const handleWalletAuth = async () => {
    setIsWalletLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // 1. Cek apakah ada provider wallet (Phantom/Backpack)
      const provider = (window as any).solana;
      if (!provider || !provider.isPhantom) {
        throw new Error("Solana wallet not found! Please install Phantom Wallet.");
      }

      // 2. Koneksi ke Wallet untuk mendapatkan PublicKey
      const { publicKey } = await provider.connect();
      const address = publicKey.toString();

      // 3. Siapkan Pesan untuk ditandatangani (Anti-Replay Attack)
      const message = `Authenticate with Trezalink\n\nWallet: ${address}\nTimestamp: ${Date.now()}`;
      const encodedMessage = new TextEncoder().encode(message);

      // 4. Minta Tanda Tangan dari User
      const signedMessage = await provider.signMessage(encodedMessage, "utf8");
      const signature = bs58.encode(signedMessage.signature);

      // 5. Kirim data ke Backend API (Verifikasi)
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

      setSuccessMsg("Wallet Connected! Redirecting to dashboard...");
      
      // Jika berhasil, arahkan langsung ke dashboard
      setTimeout(() => router.push("/dashboard"), 1500);

    } catch (error: any) {
      // Tangkap error jika user membatalkan (reject) di popup wallet
      if (error.message.includes("User rejected")) {
        setErrorMsg("Request rejected by user.");
      } else {
        setErrorMsg(error.message);
      }
    } finally {
      setIsWalletLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#FDFDFD] dark:bg-[#030305] transition-colors duration-300 text-gray-900 dark:text-white">
      
      {/* ... SISI KIRI TETAP SAMA ... */}
      <section className="hidden md:flex md:w-[45%] lg:w-[55%] bg-[#0A0A0B] relative overflow-hidden p-12 lg:p-20 flex-col justify-between">
        <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
             <span className="text-white font-black text-2xl italic">T</span>
          </div>
          <span className="text-white font-black text-2xl tracking-tighter italic transition-colors">Trezalink</span>
        </Link>

        <div className="relative z-10">
          <motion.h2 initial="hidden" animate="visible" variants={fadeIn} className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
            Start building on<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">modern rails.</span>
          </motion.h2>
          <div className="space-y-6">
            {sellingPoints.map((point, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-4 text-white/70">
                <div className="bg-blue-500/20 p-1 rounded-full text-blue-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="font-medium text-lg">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative z-10 mt-8">
            <div className="text-sm text-white/60">
              <p className="text-transparent font-bold italic bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Trezalink</p>
              <p className="text-xs mt-1">&copy; {new Date().getFullYear()} Trezalink by Trezanix — Global payments, borderless economy.</p>
            </div>
        </div>
      </section>

      {/* ================= SISI KANAN: REGISTRATION FORM ================= */}
      <section className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-24">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight transition-colors">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400 transition-colors">Join the protocol and start accepting payments globally.</p>
          </header>

          <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-2xl mb-8 border border-gray-200 dark:border-white/10 transition-colors">
            <button 
              onClick={() => { setActiveTab("email"); setErrorMsg(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "email" ? "bg-white dark:bg-white/10 text-blue-600 dark:text-white shadow-sm" : "text-gray-500"}`}
            >
              <Mail className="w-4 h-4" /> Standard
            </button>
            <button 
              onClick={() => { setActiveTab("wallet"); setErrorMsg(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "wallet" ? "bg-white dark:bg-white/10 text-purple-600 dark:text-white shadow-sm" : "text-gray-500"}`}
            >
              <Wallet className="w-4 h-4" /> Wallet
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-xl text-center font-medium">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm rounded-xl text-center font-medium">
              {successMsg}
            </div>
          )}

          <AnimatePresence mode="wait">
            {activeTab === "email" ? (
              <motion.form key="email" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4" onSubmit={handleRegister}>
                {/* ... FORM EMAIL TETAP SAMA ... */}
                <div className="relative group">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input type="text" placeholder="Merchant / Company Name" required value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-blue-500 text-gray-900 dark:text-white rounded-xl py-4 pl-12 pr-4 outline-none transition-all"/>
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input type="email" placeholder="Business Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-blue-500 text-gray-900 dark:text-white rounded-xl py-4 pl-12 pr-4 outline-none transition-all"/>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input type={showPassword ? "text" : "password"} placeholder="Create Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-blue-500 text-gray-900 dark:text-white rounded-xl py-4 pl-12 pr-12 outline-none transition-all"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="relative group">
                  <ShieldCheck className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${confirmPassword && password === confirmPassword ? 'text-green-500' : 'text-gray-400 group-focus-within:text-blue-500'}`} />
                  <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-blue-500 text-gray-900 dark:text-white rounded-xl py-4 pl-12 pr-12 outline-none transition-all"/>
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                                
                <button type="submit" disabled={isLoading || password !== confirmPassword || password === ""} className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-black py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"} 
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </motion.form>
            ) : (
              <motion.div key="wallet" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                <div className="p-8 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl text-center transition-colors">
                  <Wallet className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 transition-colors">Connect Your Identity</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed transition-colors">By connecting your wallet, you use your Solana address as your unique merchant ID.</p>
                </div>
                
                {/* TOMBOL WALLET BARU */}
                <button 
                  onClick={handleWalletAuth}
                  disabled={isWalletLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isWalletLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Connect & Register"}
                  {!isWalletLoading && <ArrowRight className="w-4 h-4" />}
                </button>

              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute w-full border-t border-gray-100 dark:border-white/10 transition-colors"></div>
              <span className="relative bg-[#FDFDFD] dark:bg-[#030305] px-4 text-[10px] uppercase font-black tracking-widest text-gray-400 transition-colors">Fast Registration</span>
            </div>
            
            <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-all text-xs font-bold transition-colors">
              <Globe className="w-4 h-4 text-blue-500" /> Sign up with Google
            </button>
            
            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 transition-colors">
              Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}