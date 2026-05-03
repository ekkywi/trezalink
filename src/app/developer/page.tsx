"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Terminal, ArrowRight, BookOpen, 
  Shield, Radio, Zap, Globe, Lock, 
  Command, Fingerprint, Activity, Server
} from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function DeveloperPage() {
  // Variabel animasi yang lebih sederhana
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <div className="font-sans selection:bg-blue-200 dark:selection:bg-purple-500/30 selection:text-blue-900 dark:selection:text-purple-200 overflow-hidden h-[100dvh] w-full relative transition-colors duration-300 bg-[#F8F9FA] dark:bg-[#030305] text-gray-900 dark:text-white">
      
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Kontainer Scroll Snap */}
      <main className="h-full w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth">
        
        {/* =========================================
            SECTION 1: HERO
        ========================================= */}
        <section className="h-screen w-full flex-shrink-0 snap-start flex items-center justify-center relative px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-center max-w-4xl mx-auto pt-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 px-4 py-1.5 rounded-full text-sm font-bold mb-8 text-blue-600 dark:text-blue-400">
              <Terminal className="w-4 h-4" /> Developer Portal
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
              Move money with<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">JSON, not paperwork.</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Integrate non-custodial Solana payments. sub-second finality, negligible fees, zero complexity.
            </p>
          </motion.div>
        </section>

        {/* =========================================
            SECTION 2: API OVERVIEW (Fail-Safe: Tanpa Hidden di Container)
        ========================================= */}
        <section className="h-screen w-full flex-shrink-0 snap-start flex items-center justify-center relative px-6 bg-white/30 dark:bg-transparent transition-colors">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Sisi Kiri: Teks */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-4xl font-bold mb-8 tracking-tight">API Infrastructure</h2>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="bg-blue-600/10 p-3 rounded-2xl h-fit border border-blue-600/20"><Server className="w-6 h-6 text-blue-600 dark:text-blue-400" /></div>
                  <div>
                    <h4 className="font-bold text-xl">Base URL</h4>
                    <code className="text-sm bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-md font-mono mt-2 block w-fit">https://api.kirupay.com/v1</code>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="bg-purple-600/10 p-3 rounded-2xl h-fit border border-purple-600/20"><Fingerprint className="w-6 h-6 text-purple-600 dark:text-purple-400" /></div>
                  <div>
                    <h4 className="font-bold text-xl">Authentication</h4>
                    <p className="text-gray-500 mt-1">Bearer token via <code className="text-pink-500">x-api-key</code> header.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sisi Kanan: Kartu Statis (Dijamin Muncul) */}
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-10 shadow-sm transition-colors">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Shield className="w-6 h-6 text-green-500" /> Security Standards</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <p className="text-gray-600 dark:text-gray-400">TLS 1.3 encryption for all data in transit.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <p className="text-gray-600 dark:text-gray-400">Idempotent requests to prevent double spending.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <p className="text-gray-600 dark:text-gray-400">HMAC-signed webhook payloads for verification.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 3: CODE PLAYGROUND
        ========================================= */}
        <section className="h-screen w-full flex-shrink-0 snap-start flex items-center justify-center relative px-6">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Rapid Integration.</h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Send a payment intent, receive a checkout URL. No complex wallet handshakes required on your backend.
              </p>
              <div className="bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-blue-400 px-5 py-2 rounded-full text-xs font-mono w-fit">POST /v1/intents</div>
            </motion.div>

            <div className="bg-gray-900 rounded-[2.5rem] p-8 font-mono text-sm shadow-2xl relative">
              <div className="flex gap-2 mb-6 opacity-50">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-2 text-gray-300">
                <p><span className="text-blue-400">curl</span> -X POST https://api.kirupay.com/v1/intents \</p>
                <p className="pl-4">-H <span className="text-green-400">&quot;x-api-key: kp_live_xxx&quot;</span> \</p>
                <p className="pl-4">-d <span className="text-orange-400">&apos;{"{"}</span></p>
                <p className="pl-8"><span className="text-orange-400">&quot;amount&quot;</span>: 100.00</p>
                <p className="pl-4"><span className="text-orange-400">{"}"}&apos;</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 4: WEBHOOKS & FOOTER
        ========================================= */}
        <section className="h-screen w-full flex-shrink-0 snap-start flex flex-col justify-between relative">
          <div className="flex-grow flex items-center justify-center px-6">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="max-w-4xl mx-auto w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[3rem] p-12 text-center"
            >
              <div className="bg-purple-600/10 p-5 rounded-3xl w-fit mx-auto mb-8">
                <Radio className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-pulse" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Event-Driven</h2>
              <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Kirupay pushes status updates to your server the moment mathematical finality is reached.
              </p>
              <button className="bg-blue-600 text-white font-bold px-12 py-4 rounded-full flex items-center gap-2 hover:bg-blue-700 transition-all mx-auto shadow-lg shadow-blue-600/20">
                View Full Spec <BookOpen className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

          <div className="relative z-50 w-full bg-white/60 dark:bg-white/5 backdrop-blur-lg border-t border-gray-200 dark:border-white/10 pb-4">
            <Footer />
          </div>
        </section>

      </main>
    </div>
  );
}