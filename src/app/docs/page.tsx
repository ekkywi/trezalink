"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  BookOpen, Terminal, ShieldCheck, Zap, 
  ArrowRight, Code, MessageSquare, 
  FileText, Globe, Key, Settings
} from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function DocumentationPage() {
  // Variabel animasi standar agar konsisten
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="font-sans selection:bg-blue-200 dark:selection:bg-purple-500/30 selection:text-blue-900 dark:selection:text-purple-200 overflow-hidden h-[100dvh] w-full relative transition-colors duration-300 bg-[#F8F9FA] dark:bg-[#030305] text-gray-900 dark:text-white">
      
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>

      <main className="h-full w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth">
        
        {/* =========================================
            SECTION 1: INTRODUCTION
        ========================================= */}
        <section className="h-screen w-full flex-shrink-0 snap-start flex items-center justify-center relative px-6">
          <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-center max-w-4xl mx-auto pt-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 px-4 py-1.5 rounded-full text-sm font-bold mb-8 text-blue-600 dark:text-blue-400">
              <BookOpen className="w-4 h-4" /> Documentation Portal
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
              Mastering the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Trezalink Protocol.</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Everything you need to integrate, scale, and secure your Web3 payment infrastructure. From basic setup to advanced webhook configurations.
            </p>
          </motion.div>
        </section>

        {/* =========================================
            SECTION 2: GETTING STARTED & AUTH
        ========================================= */}
        <section className="h-screen w-full flex-shrink-0 snap-start flex items-center justify-center relative px-6">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="text-left">
              <h2 className="text-4xl font-bold mb-8 tracking-tight">Getting Started</h2>
              <div className="space-y-6">
                <div className="flex gap-5 group">
                  <div className="bg-blue-600/10 p-3 rounded-2xl h-fit border border-blue-600/20 transition-colors group-hover:bg-blue-600/20"><Key className="w-6 h-6 text-blue-600 dark:text-blue-400" /></div>
                  <div>
                    <h4 className="font-bold text-xl">1. Obtain API Key</h4>
                    <p className="text-gray-500 mt-1">Generate your keys in the Merchant Dashboard. Keep your Secret Key safe.</p>
                  </div>
                </div>
                <div className="flex gap-5 group">
                  <div className="bg-purple-600/10 p-3 rounded-2xl h-fit border border-purple-600/20 transition-colors group-hover:bg-purple-600/20"><Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" /></div>
                  <div>
                    <h4 className="font-bold text-xl">2. Configure Webhooks</h4>
                    <p className="text-gray-500 mt-1">Set up your endpoint URL to receive real-time transaction updates.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-10 shadow-sm transition-colors">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Globe className="w-6 h-6 text-blue-500" /> Network Settings</h3>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
                  <div className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">Mainnet-Beta</div>
                  <p className="text-sm font-mono opacity-70">https://api.trezalink.com/v1</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
                  <div className="text-xs font-bold text-purple-600 mb-1 uppercase tracking-wider">Devnet (Testnet)</div>
                  <p className="text-sm font-mono opacity-70">https://devnet.api.trezalink.com/v1</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 3: CORE GUIDES
        ========================================= */}
        <section className="h-screen w-full flex-shrink-0 snap-start flex items-center justify-center relative px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Core Documentation</h2>
              <p className="text-gray-500">Dive into specific topics to build your integration.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Zap className="text-yellow-500" />, title: "Payment Flow", desc: "Understand how atomic swaps and split-fees work on Solana." },
                { icon: <ShieldCheck className="text-green-500" />, title: "Security", desc: "Best practices for HMAC verification and key rotation." },
                { icon: <Code className="text-blue-500" />, title: "API Reference", desc: "Detailed endpoint specs for payments, rates, and users." },
                { icon: <MessageSquare className="text-purple-500" />, title: "Webhooks", desc: "Handling events and exponential backoff retry logic." },
                { icon: <FileText className="text-indigo-500" />, title: "Compliance", desc: "Guidelines for transaction reporting and reconciliation." },
                { icon: <Terminal className="text-gray-500" />, title: "CLI Tools", desc: "Managing your Trezalink account via our command line tool." },
              ].map((item, i) => (
                <div key={i} className="group bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-8 rounded-3xl hover:bg-white dark:hover:bg-white/10 transition-all cursor-pointer">
                  <div className="mb-4 bg-gray-100 dark:bg-white/5 w-12 h-12 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 4: HELP & FOOTER
        ========================================= */}
        <section className="h-screen w-full flex-shrink-0 snap-start flex flex-col justify-between relative">
          <div className="flex-grow flex items-center justify-center px-6">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="max-w-4xl mx-auto w-full bg-gradient-to-br from-blue-600 to-purple-700 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6">Need more help?</h2>
                <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  Our developer support team is available 24/7 to help you with your integration or any technical issues.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-blue-700 font-bold px-10 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-blue-50 transition-all">
                    Contact Support <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="bg-blue-800/40 backdrop-blur-md border border-white/20 text-white font-bold px-10 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-blue-800/60 transition-all">
                    Community Forum
                  </button>
                </div>
              </div>
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