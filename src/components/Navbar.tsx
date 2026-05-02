import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl w-full mx-auto border-b border-white/10 backdrop-blur-md">
      <Link href="/" className="text-xl font-bold tracking-tight">
        Kiru<span className="text-emerald-500">pay.</span>
      </Link>
      <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
        <Link href="#architecture" className="hover:text-emerald-400 transition-colors">Arsitektur</Link>
        <Link href="/developer" className="hover:text-emerald-400 transition-colors">Developer API</Link>
        <Link href="/docs" className="hover:text-emerald-400 transition-colors">Dokumentasi</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="bg-white text-black text-sm font-semibold px-4 py-2 rounded hover:bg-gray-200 transition-colors flex items-center gap-2">
          Akses Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </nav>
  );
}