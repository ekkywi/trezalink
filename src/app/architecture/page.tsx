"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Network, Zap, Lock, Cpu, ArrowRight, Database, Code, ShieldCheck, Box, KeyRound, Globe2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ArchitecturePage() {
  // --- VARIASI ANIMASI KONTEN ---
  const popUp = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.8 } }
  };
  const slideRight = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 70, damping: 20 } }
  };
  const slideLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 70, damping: 20 } }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const staggerItem = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="font-sans selection:bg-blue-200 dark:selection:bg-purple-500/30 selection:text-blue-900 dark:selection:text-purple-200 overflow-hidden h-screen w-full relative transition-colors duration-300">
      
      {/* Navbar Fixed */}
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Container (Scroll Snap) */}
      <main className="h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth">
        
        {/* =========================================
            SECTION 1: HERO (Layar 1)
        ========================================= */}
        <section className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden">
          {/* Ambient Glowing Orbs */}
          <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-[150px] pointer-events-none transition-colors"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-[150px] pointer-events-none transition-colors"></div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={popUp}
            className="text-center max-w-4xl mx-auto px-6 relative z-10 pt-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm transition-colors">
              <Network className="w-4 h-4 text-purple-600 dark:text-purple-400" /> The Underlying Engine
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-gray-900 dark:text-white leading-[1.1] mb-6 transition-colors">
              Trust in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Math</span>,<br/>Not Middlemen.
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors">
              Trezalink is not a bank. It is an open routing protocol built on top of high-performance decentralized ledgers. Discover why cryptographic finality is the most secure way to process global payments.
            </p>
          </motion.div>
        </section>

        {/* =========================================
            SECTION 2: LAYER 1 - THE FOUNDATION
        ========================================= */}
        <section className="h-screen w-full snap-start relative flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute top-[20%] left-[50%] translate-x-[-50%] w-[60%] h-[60%] bg-blue-300/40 dark:bg-blue-900/30 rounded-full blur-[150px] pointer-events-none transition-colors"></div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} 
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-6 w-full relative z-10 pt-16"
          >
            <motion.div variants={popUp} className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight transition-colors">Layer 1: The Settlement Network</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors">The cryptographic foundation that guarantees your funds cannot be frozen or seized.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div variants={staggerItem} className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:bg-white dark:hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <Box className="w-7 h-7 text-blue-600 dark:text-blue-300 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">Decentralized Ledger</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                  Instead of a centralized database controlled by one company, transactions are validated by thousands of independent nodes running on the network.
                </p>
              </motion.div>

              <motion.div variants={staggerItem} className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:bg-white dark:hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <KeyRound className="w-7 h-7 text-purple-600 dark:text-purple-300 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">Ed25519 Cryptography</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                  Every transaction is signed using asymmetric keys. Only you possess the private key to your wallet. Without it, moving funds is mathematically impossible.
                </p>
              </motion.div>

              <motion.div variants={staggerItem} className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:bg-white dark:hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <Globe2 className="w-7 h-7 text-indigo-600 dark:text-indigo-300 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">Censorship Resistance</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                  Because the underlying blockchain operates permissionlessly, no central authority can arbitrarily freeze your account or decline a valid payment.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* =========================================
            SECTION 3: LAYER 2 - FLOW DIAGRAM
        ========================================= */}
        <section className="h-screen w-full snap-start relative flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-purple-300/40 dark:bg-purple-600/20 rounded-full blur-[150px] pointer-events-none transition-colors"></div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer} // Menambahkan orkestrasi berurutan ke parent
            className="max-w-7xl mx-auto px-6 w-full relative z-10 pt-16"
          >
            <motion.div variants={popUp} className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight transition-colors">Layer 2: Protocol Execution</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors">How Trezalink routes your money atomically across the ledger.</p>
            </motion.div>

            {/* MENGHAPUS transition-all dan menggantinya dengan transition-colors agar tidak bentrok dengan Framer Motion */}
            <motion.div 
              variants={popUp}
              className="relative bg-white/80 dark:bg-[#0a0a0f]/60 backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 md:p-16 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_50px_rgba(37,99,235,0.2)] transition-colors"
            >
              {/* Kontainer baru untuk animasi berurutan di dalam diagram */}
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={staggerContainer}
                className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                
                {/* Step 1: Payment Intent (Masuk dari Kiri) */}
                <motion.div variants={slideRight} className="flex-1 w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 text-center shadow-sm dark:shadow-xl transition-colors">
                  <div className="w-12 h-12 mx-auto bg-gray-200 dark:bg-white/10 rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <Database className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </div>
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-white">1. Payment Intent</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Client connects wallet and signs a 1,000.00 USDC transaction payload.</p>
                </motion.div>

                {/* Arrow 1 (Pop Up) */}
                <motion.div variants={popUp}>
                  <ArrowRight className="w-8 h-8 text-blue-600 dark:text-blue-400 hidden md:block animate-pulse transition-colors" />
                  <div className="w-[2px] h-8 bg-blue-600 dark:bg-blue-400 md:hidden animate-pulse transition-colors"></div>
                </motion.div>

                {/* Step 2: Smart Contract (Pop Up) */}
                {/* Dibungkus div statis agar class transform md:-translate-y-4 dari tailwind tidak dihapus oleh Framer Motion */}
                <div className="flex-1 w-full transform md:-translate-y-4">
                  <motion.div variants={popUp} className="w-full h-full bg-gradient-to-b from-blue-50 dark:from-blue-500/10 to-white dark:to-white/5 border border-blue-200 dark:border-blue-500/30 rounded-2xl p-6 text-center relative shadow-md dark:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-colors">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 dark:bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider transition-colors shadow-sm">
                      Smart Contract
                    </div>
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
                      <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 transition-colors">2. Atomic Route</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors">Protocol validates signature and splits 0.3% routing fee algorithmically.</p>
                  </motion.div>
                </div>

                {/* Arrow 2 (Pop Up) */}
                <motion.div variants={popUp}>
                  <ArrowRight className="w-8 h-8 text-purple-600 dark:text-purple-400 hidden md:block animate-pulse transition-colors" />
                  <div className="w-[2px] h-8 bg-purple-600 dark:bg-purple-400 md:hidden animate-pulse transition-colors"></div>
                </motion.div>

                {/* Step 3: Finality (Masuk dari Kanan) */}
                <motion.div variants={slideLeft} className="flex-1 w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 text-center shadow-sm dark:shadow-xl transition-colors">
                  <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-white">3. Finality</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">997.00 USDC arrives in your wallet in ~400ms. Webhook fires to server.</p>
                </motion.div>

              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* =========================================
            SECTION 4: LAYER 3 (PILLARS) & FOOTER
        ========================================= */}
        <section className="h-screen w-full snap-start relative flex flex-col justify-between overflow-hidden">
          {/* Ambient Glow - Menyesuaikan Mode Terang/Gelap */}
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] h-[80%] bg-gradient-to-r from-blue-300/20 to-purple-300/20 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-[150px] pointer-events-none transition-colors duration-500"></div>
          
          <div className="flex-grow flex items-center justify-center pt-24 px-6">
            {/* Grid Container dengan Staggered Animation */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer}
              className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
            >
              
              {/* Card 1: Non-Custodial */}
              <motion.div variants={slideRight} className="group bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:bg-white dark:hover:bg-white/10 transition-colors duration-300">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mb-5 border border-blue-200 dark:border-blue-500/30 transition-colors">
                  <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white transition-colors">Strictly Non-Custodial</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors">
                  Trezalink operates on a strict non-custodial model. We never hold, pool, or have access to your private keys. The smart contract acts merely as a traffic controller.
                </p>
              </motion.div>

              {/* Card 2: Parallel Processing */}
              <motion.div variants={slideLeft} className="group bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:bg-white dark:hover:bg-white/10 transition-colors duration-300">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center mb-5 border border-purple-200 dark:border-purple-500/30 transition-colors">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white transition-colors">Parallel Processing</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors">
                  By utilizing Solana&apos;s architecture that supports parallel transaction processing, we bypass network congestion. Transactions achieve finality in sub-seconds.
                </p>
              </motion.div>

              {/* Card 3: Atomic Smart Contracts */}
              <motion.div variants={slideRight} className="group bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:bg-white dark:hover:bg-white/10 transition-colors duration-300">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-5 border border-indigo-200 dark:border-indigo-500/30 transition-colors">
                  <Code className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white transition-colors">Atomic Smart Contracts</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors">
                  The fee-splitting logic is hardcoded into immutable smart contracts. The execution is atomic—if one step fails, the entire transaction reverts safely.
                </p>
              </motion.div>

              {/* Card 4: Webhooks */}
              <motion.div variants={slideLeft} className="group bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:bg-white dark:hover:bg-white/10 transition-colors duration-300">
                <div className="w-12 h-12 bg-blue-100 dark:bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-5 border border-blue-200 dark:border-cyan-500/30 transition-colors">
                  <Network className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white transition-colors">Deterministic Webhooks</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors">
                  A dedicated indexing infrastructure listens to on-chain events. Once finality is reached, an HMAC-secured POST request is dispatched to your backend webhook.
                </p>
              </motion.div>

            </motion.div>
          </div>

          {/* Footer - Menyatu dengan Snap Area Terakhir */}
          <div className="relative z-50 w-full bg-white/60 dark:bg-white/5 backdrop-blur-lg border-t border-gray-200 dark:border-white/10 pb-4 transition-colors">
            <Footer />
          </div>
        </section>

      </main>
    </div>
  );
}