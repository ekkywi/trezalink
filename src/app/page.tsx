"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Split, Coins, Lock, CheckCircle2, Wallet, ArrowRight, Link as LinkIcon, QrCode } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black text-white selection:bg-emerald-500/30 selection:text-emerald-200 font-sans">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[150px] pointer-events-none" />

      <Navbar />

      {/* HERO SECTION - 2 COLUMN LAYOUT */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 pt-24 pb-20 max-w-7xl mx-auto w-full gap-12">
        
        {/* Left: Copywriting */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 uppercase backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          >
            🚀 LEWATI POTONGAN TRANSFER YANG MAHAL
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-6"
          >
            Terima Pembayaran Global. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400">
              Detik Ini Juga. <br className="hidden lg:block"/> Potongan 0.3%.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Solusi penerimaan dana tanpa batas negara untuk freelancer dan kreator digital. Tinggalkan perantara lama yang menahan uang Anda berhari-hari. Dapatkan pembayaran Anda dalam Dolar Digital (USDC).
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button className="relative group bg-emerald-500 text-black font-bold px-8 py-4 rounded-lg overflow-hidden transition-all flex items-center justify-center gap-2">
              <span className="relative z-10 flex items-center gap-2">
                Buat Payment Link <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="border border-white/20 bg-white/5 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all">
              Lihat Demo
            </button>
          </motion.div>
        </div>

        {/* Right: Floating UI Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 w-full max-w-md relative hidden md:block"
        >
          {/* Animated Glow behind the mockup */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-cyan-500/30 blur-2xl rounded-3xl"
          />
          
          {/* Mockup Card Floating Animation */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative bg-[#0d0d0d] border border-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-xl"
          >
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span className="font-semibold text-sm">Menunggu Pembayaran</span>
              </div>
              <span className="text-xs text-gray-500 font-mono">INV-8892</span>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-gray-400 text-sm mb-1">Desain UI/UX Mobile App</div>
              <div className="text-4xl font-bold text-white tracking-tight">500.00 USDC</div>
              <div className="text-xs text-gray-500 mt-2">≈ Rp 8.050.000</div>
            </div>

            <div className="bg-[#141414] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center mb-4">
              <QrCode className="w-32 h-32 text-gray-300 mb-4 opacity-50" />
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <LinkIcon className="w-3 h-3" /> kirupay.com/pay/inv-8892
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500 px-2 font-mono">
              <span>Powered by Kirupay</span>
              <span>Secure Network</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* INFINITE MARQUEE (TRUST INDICATOR) */}
      <div className="relative z-10 w-full border-y border-white/5 bg-white/[0.02] py-4 overflow-hidden mt-8">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-sm font-semibold text-gray-500 tracking-widest uppercase gap-16 items-center"
        >
          <span>✦ Dirancang Untuk Freelancer Global</span>
          <span>✦ UI/UX Designer</span>
          <span>✦ Remote Web Developer</span>
          <span>✦ Digital Agency</span>
          <span>✦ Indie Hacker</span>
          <span>✦ Game Asset Creator</span>
          <span>✦ Affiliate Marketer</span>
          <span>✦ Dirancang Untuk Freelancer Global</span>
          <span>✦ UI/UX Designer</span>
          <span>✦ Remote Web Developer</span>
        </motion.div>
      </div>

      {/* INTERACTIVE VISUALIZATION SECTION */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Bagaimana Dana Anda Terbagi?</h2>
          <p className="text-gray-400">Eksekusi otomatis di lapisan protokol. Transparan dan tanpa biaya tersembunyi.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Klien / Pembayar */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-transform hover:scale-110">
                <Wallet className="w-8 h-8 text-gray-300" />
              </div>
              <h4 className="font-bold text-lg">Klien</h4>
              <p className="text-xs text-gray-500 mt-1">Membayar 100 USDC</p>
            </div>

            {/* Jalur Eksekusi */}
            <div className="flex flex-col items-center justify-center relative h-32 md:h-auto">
               <div className="absolute w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2 hidden md:block"></div>
               <div className="absolute h-full w-[1px] bg-white/10 left-1/2 -translate-x-1/2 block md:hidden"></div>
               
               <motion.div 
                  animate={{ 
                    boxShadow: ["0px 0px 0px 0px rgba(16,185,129,0.4)", "0px 0px 20px 10px rgba(16,185,129,0)"] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center z-10 relative"
               >
                 <Split className="w-6 h-6 text-black" />
               </motion.div>
               
               <div className="text-[10px] font-bold text-emerald-400 mt-4 uppercase tracking-widest bg-[#050505] px-2 relative z-10">
                 Auto-Split Fee
               </div>
            </div>

            {/* Akun Pengguna / Freelancer */}
            <div className="flex flex-col gap-3">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex justify-between items-center transform transition-transform hover:scale-105">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Masuk ke Akun Anda</div>
                  <div className="font-bold text-white flex items-center gap-2">
                    99.70 USDC <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center opacity-60 hover:opacity-100 transition-opacity">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Biaya Platform (0.3%)</div>
                  <div className="font-mono text-sm text-gray-400">0.30 USDC</div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* VALUE PROPOSITION (4 KOTAK) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full border-t border-white/10">
        <div className="mb-16 text-center max-w-3xl mx-auto pt-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Kendali Penuh di Tangan Anda</h2>
          <p className="text-gray-400 text-lg">Infrastruktur pembayaran yang dirancang untuk memangkas birokrasi, menghemat waktu, dan mengamankan pendapatan Anda.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Box 1 */}
          <motion.div variants={itemVariants} className="group bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl hover:bg-white/[0.03] hover:border-emerald-500/30 transition-all duration-300">
            <div className="bg-emerald-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-emerald-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">100% Hak Milik Anda</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Kami tidak bertindak sebagai brankas perantara. Dana dibayarkan secara langsung (Peer-to-Peer) dan masuk ke akun Anda dalam hitungan milidetik. Tidak ada risiko pembekuan sepihak.
            </p>
          </motion.div>

          {/* Box 2 */}
          <motion.div variants={itemVariants} className="group bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl hover:bg-white/[0.03] hover:border-cyan-500/30 transition-all duration-300">
            <div className="bg-cyan-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-cyan-400">
              <Split className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Biaya Flat 0.3%</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Kenapa harus merelakan 4% - 5% hasil kerja keras Anda? Teknologi kami memangkas jalur birokrasi, membatasi biaya hanya 0.3% untuk setiap transaksi yang berhasil tanpa biaya siluman.
            </p>
          </motion.div>

          {/* Box 3 */}
          <motion.div variants={itemVariants} className="group bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl hover:bg-white/[0.03] hover:border-blue-500/30 transition-all duration-300">
            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-blue-400">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Stabil & Anti-Fluktuasi</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Eksekusi pembayaran menggunakan Dolar Digital (USDC). Nilainya dipatok kuat 1:1 dengan Dolar AS. Anda terbebas dari kekhawatiran nilai kurs yang naik-turun secara liar.
            </p>
          </motion.div>

          {/* Box 4 */}
          <motion.div variants={itemVariants} className="group bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl hover:bg-white/[0.03] hover:border-purple-500/30 transition-all duration-300">
            <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-purple-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Kebal Chargeback</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Sistem pencatatan digital kami bersifat permanen. Lindungi karya dari klien nakal. Begitu dana masuk ke akun Anda, tidak ada pihak manapun yang bisa menariknya kembali.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}