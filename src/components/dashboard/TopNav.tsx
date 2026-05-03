import { Search, Bell, Plus } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const TopNav = ({ title }: { title: string }) => (
  <header className="h-24 px-8 flex items-center justify-between sticky top-0 bg-[#FDFDFD]/80 dark:bg-[#030305]/80 backdrop-blur-xl z-50 border-b border-gray-100 dark:border-white/5 transition-colors">
    <div>
      <h2 className="text-2xl font-black tracking-tight dark:text-white uppercase">{title}</h2>
      <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-1 italic">
        Kirupay Core Engine
      </p>
    </div>

    <div className="flex items-center gap-3">
      <div className="relative hidden xl:block mr-2">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" placeholder="Search data..." 
          className="bg-gray-100 dark:bg-white/5 border-none focus:ring-2 ring-blue-500 rounded-2xl py-3 pl-12 pr-6 text-sm outline-none w-64 dark:text-white transition-all"
        />
      </div>
      <ThemeToggle /> {/* Saklar Tema di sini */}
      <button className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-500 hover:text-blue-600 transition-all">
        <Bell size={18} />
      </button>
      <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 text-white h-11 px-6 rounded-xl text-sm font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all ml-2">
        <Plus size={18} /> <span className="hidden sm:inline">New Payment</span>
      </button>
    </div>
  </header>
);