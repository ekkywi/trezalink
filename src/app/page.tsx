"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Globe, Zap, Shield, Check, TrendingDown, ArrowUpRight, Link as LinkIcon, QrCode, Copy, Send, LayoutTemplate } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
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
    // PENTING: Kelas utama dibersihkan, warna background diturunkan dari layout.tsx
    <div className="font-sans selection:bg-blue-200 dark:selection:bg-purple-500/30 selection:text-blue-900 dark:selection:text-purple-200 overflow-hidden h-screen w-full relative transition-colors duration-300">
      
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>

      <main className="h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth">
        
        {/* =========================================
            SECTION 1: HERO
        ========================================= */}
        <section className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden">
          {/* Ambient Background - Terang di Light Mode, Gelap di Dark Mode */}
          <div className="absolute top-[0%] left-[-10%] w-[50%] h-[50%] bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-[150px] pointer-events-none transition-colors"></div>
          <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-[150px] pointer-events-none transition-colors"></div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }}
            className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 relative z-10 pt-16"
          >
            <motion.div variants={slideRight} className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm transition-colors">
                <TrendingDown className="w-4 h-4 text-purple-600 dark:text-purple-400" /> 0.3% Flat Fee. Absolute Trust.
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900 dark:text-white leading-[1.1] mb-6 transition-colors">
                Global payments.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Minus the bank fees.
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed transition-colors">
                The smart way for freelancers and startups to get paid. Accept Digital Dollars (USDC) from anywhere in the world and settle instantly. 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/register" className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(37,99,235,0.2)] dark:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 border border-blue-500/50">
                  Open an account <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            {/* Glassmorphic UI Card (White Glass di Light Mode, Dark Glass di Dark Mode) */}
            <motion.div variants={popUp} className="flex-1 w-full max-w-md mx-auto relative hidden md:block">
              <div className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-white dark:border-white/10 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative z-10 transform hover:rotate-2 transition-all duration-500">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-white/10 border border-gray-100 dark:border-white/10 rounded-full mx-auto flex items-center justify-center mb-4 backdrop-blur-md transition-colors">
                    <span className="text-2xl">🇺🇸</span>
                  </div>
                  <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm transition-colors">Client sends</h3>
                  <div className="text-4xl font-extrabold text-gray-900 dark:text-white transition-colors">1,000.00 <span className="text-2xl text-gray-400 dark:text-gray-500">USDC</span></div>
                </div>
                <div className="space-y-4 relative">
                  <div className="absolute left-5 top-8 bottom-8 w-[1px] bg-gray-200 dark:bg-white/10 transition-colors"></div>
                  <div className="flex items-center gap-4 bg-white/60 dark:bg-white/5 backdrop-blur-md p-4 rounded-2xl relative z-10 border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none transition-colors">
                    <div className="bg-purple-100 dark:bg-purple-500/20 p-2 rounded-full border border-purple-200 dark:border-purple-500/30 transition-colors">
                      <TrendingDown className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-900 dark:text-gray-200 transition-colors">Kirupay Fee (0.3%)</div>
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white transition-colors">-3.00</div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 text-center transition-colors">
                  <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm transition-colors">You receive</h3>
                  <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 transition-colors">997.00 <span className="text-2xl text-blue-400 dark:text-blue-600 transition-colors">USDC</span></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* =========================================
            SECTION 2: KEUNGGULAN
        ========================================= */}
        <section className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden">
          <div className="absolute top-[20%] left-[50%] translate-x-[-50%] w-[60%] h-[60%] bg-blue-300/40 dark:bg-blue-900/30 rounded-full blur-[150px] pointer-events-none transition-colors"></div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} 
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-6 w-full relative z-10 pt-16"
          >
            <motion.div variants={popUp} className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight transition-colors">Everything you need to scale.</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors">We rebuilt the cross-border payment engine to be faster, cheaper, and strictly non-custodial.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div variants={staggerItem} className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:bg-white dark:hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <Globe className="w-7 h-7 text-blue-600 dark:text-blue-300 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">Borderless by Default</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                  Accept payments from anywhere. They pay in Digital Dollars, you receive Digital Dollars. No FX conversions.
                </p>
              </motion.div>

              <motion.div variants={staggerItem} className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:bg-white dark:hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <Zap className="w-7 h-7 text-purple-600 dark:text-purple-300 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">Millisecond Settlement</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                  Forget T+2 days. By utilizing high-throughput non-custodial networks, your funds land directly in your wallet.
                </p>
              </motion.div>

              <motion.div variants={staggerItem} className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:bg-white dark:hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <Shield className="w-7 h-7 text-indigo-600 dark:text-indigo-300 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">Chargeback Proof</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                  Cryptographic finality ensures that once a payment hits your wallet, no central authority can roll it back.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* =========================================
            SECTION 3: NO-CODE INVOICING
        ========================================= */}
        <section className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-purple-300/40 dark:bg-purple-600/20 rounded-full blur-[150px] pointer-events-none transition-colors"></div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }}
            className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-16 relative z-10 pt-16"
          >
            <motion.div variants={slideRight} className="flex-1">
              <div className="w-14 h-14 bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md transition-colors">
                <LinkIcon className="w-7 h-7 text-blue-600 dark:text-blue-300 transition-colors" />
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white transition-colors">Share a link.<br/>Get paid.</h2>
              <p className="text-gray-600 dark:text-gray-400 text-xl mb-10 leading-relaxed transition-colors">
                No technical skills required. Generate professional payment links in seconds and share them via email, WhatsApp, or anywhere your clients are.
              </p>
              <ul className="space-y-6 mb-10 text-lg">
                <li className="flex items-center gap-4">
                  <div className="bg-blue-100 dark:bg-blue-500/20 p-1.5 rounded-full border border-blue-200 dark:border-blue-500/30 transition-colors"><LayoutTemplate className="w-5 h-5 text-blue-600 dark:text-blue-300" /></div> 
                  <span className="text-gray-700 dark:text-gray-300 transition-colors">Customizable Checkout Page</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-blue-100 dark:bg-blue-500/20 p-1.5 rounded-full border border-blue-200 dark:border-blue-500/30 transition-colors"><QrCode className="w-5 h-5 text-blue-600 dark:text-blue-300" /></div> 
                  <span className="text-gray-700 dark:text-gray-300 transition-colors">Instant QR Code Generation</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-blue-100 dark:bg-blue-500/20 p-1.5 rounded-full border border-blue-200 dark:border-blue-500/30 transition-colors"><Send className="w-5 h-5 text-blue-600 dark:text-blue-300" /></div> 
                  <span className="text-gray-700 dark:text-gray-300 transition-colors">Automated Client Receipts</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={slideLeft} className="flex-1 w-full hidden md:block">
              <div className="bg-white/80 dark:bg-[#0a0a0f]/60 backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_50px_rgba(37,99,235,0.2)] relative transform hover:-rotate-1 transition-all duration-500">
                
                <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-white/10 pb-4 transition-colors">
                   <span className="text-gray-900 dark:text-white font-medium flex items-center gap-2 transition-colors">
                     <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span> Create Payment Link
                   </span>
                   <span className="text-xs bg-gray-100 dark:bg-white/10 px-2 py-1 rounded-md text-gray-500 dark:text-gray-400 transition-colors">Step 1 of 2</span>
                </div>

                <div className="space-y-5">
                   <div>
                     <div className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider transition-colors">Project Description</div>
                     <div className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors">
                        UI/UX Mobile App Design
                     </div>
                   </div>
                   
                   <div>
                     <div className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider transition-colors">Amount to Collect</div>
                     <div className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-gray-900 dark:text-white font-bold flex justify-between items-center transition-colors">
                        <span className="text-lg">500.00</span>
                        <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-500/20 px-2 py-1 rounded text-blue-700 dark:text-blue-300 transition-colors">
                           <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" className="w-4 h-4 grayscale opacity-80" alt="USDC"/> USDC
                        </div>
                     </div>
                   </div>

                   <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 transition-colors">
                     <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider transition-colors">Payment Link Ready</div>
                     <div className="flex items-center gap-2">
                        <div className="flex-1 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-3.5 text-xs text-blue-700 dark:text-blue-300 font-mono truncate transition-colors">
                           kirupay.com/pay/inv-8892x
                        </div>
                        <div className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 cursor-pointer p-3.5 rounded-xl transition-colors border border-transparent dark:border-white/10">
                           <Copy className="w-4 h-4 text-gray-600 dark:text-white" />
                        </div>
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* =========================================
            SECTION 4: CTA
        ========================================= */}
        <section className="h-screen w-full snap-start relative flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay"></div>
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] h-[80%] bg-gradient-to-r from-blue-300/40 to-purple-300/40 dark:from-blue-900/40 dark:to-purple-900/40 rounded-full blur-[150px] pointer-events-none transition-colors"></div>
          
          <div className="flex-grow flex items-center justify-center pt-16">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={popUp}
              className="max-w-4xl mx-auto px-6 w-full text-center relative z-10"
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tighter text-gray-900 dark:text-white transition-colors">Stop leaving money on the table.</h2>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-blue-200 mb-12 leading-relaxed max-w-3xl mx-auto transition-colors">
                Join thousands of freelancers, remote developers, and digital agencies who have upgraded their payment stack. 
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/register" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl px-12 py-5 rounded-full hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(37,99,235,0.2)] dark:shadow-[0_0_40px_rgba(147,51,234,0.4)] border border-transparent dark:border-white/20 flex items-center justify-center gap-2">
                  Get Started for Free <ArrowRight className="w-6 h-6" />
                </Link>
                <Link href="/docs" className="bg-gradient-to-r from-white-600 to-blue-600 text-white font-bold text-xl px-12 py-5 rounded-full hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(37,99,235,0.2)] dark:shadow-[0_0_40px_rgba(147,51,234,0.4)] border border-transparent dark:border-white/20 flex items-center justify-center gap-2">
                  Documentation<ArrowUpRight className="w-6 h-6 text-gray-400" />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="relative z-50 w-full bg-white/60 dark:bg-white/5 backdrop-blur-lg border-t border-gray-200 dark:border-white/10 pb-4 transition-colors">
            <Footer />
          </div>
        </section>

      </main>
    </div>
  );
}