"use client";

import Link from "next/link";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  // Hook dari next-themes untuk mengendalikan mode terang/gelap
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mencegah hydration mismatch (error warna berbeda antara server dan client)
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 max-w-6xl w-full mx-auto border-b border-gray-200 dark:border-white/10 md:border md:border-gray-200 dark:md:border-white/10 bg-white/60 dark:bg-[#0a0a0f]/60 backdrop-blur-xl md:rounded-full md:mt-6 shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-colors duration-300">
      
      {/* Logo Kirupay Disambung Tanpa Span */}
      <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-1.5 hover:opacity-80 transition-opacity">
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
        Kirupay
      </Link>

      <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600 dark:text-gray-400">
        <Link href="/architecture" className="hover:text-blue-600 dark:hover:text-white transition-colors">Architecture</Link>
        <Link href="/developer" className="hover:text-blue-600 dark:hover:text-white transition-colors">Developer</Link>
        <Link href="/docs" className="hover:text-blue-600 dark:hover:text-white transition-colors">Documentation</Link>
      </div>

      <div className="flex items-center gap-4">
        
        {/* === SAKELAR LIGHT / DARK MODE DI SINI === */}
        {mounted && (
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        )}

        <Link 
          href="/login" 
          className="bg-blue-600 dark:bg-white/10 border border-transparent dark:border-white/10 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-blue-700 dark:hover:bg-white/20 dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex items-center gap-2 group backdrop-blur-md"
        >
          Try Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </nav>
  );
}