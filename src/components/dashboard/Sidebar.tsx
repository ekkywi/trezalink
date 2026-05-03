import Link from "next/link";
import { LayoutDashboard, CreditCard, Key, Settings, Zap } from "lucide-react";

export const Sidebar = ({ activeTab, setActiveTab }: any) => {
  const menu = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: "transactions", label: "Transactions", icon: <CreditCard size={20} /> },
    { id: "api", label: "API Console", icon: <Key size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-gray-100 dark:border-white/5 bg-white dark:bg-[#030305] h-screen sticky top-0 transition-colors">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 mb-12 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <span className="text-white font-black italic">K</span>
          </div>
          <span className="font-black text-xl tracking-tighter italic dark:text-white">KIRUPAY</span>
        </Link>

        <nav className="space-y-2">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20" 
                  : "text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8">
        <div className="p-6 bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl relative overflow-hidden">
          <Zap className="absolute -right-2 -bottom-2 w-16 h-16 text-blue-500/20" />
          <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase mb-2">Pro Merchant</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">You have 0.01% fee per transaction.</p>
        </div>
      </div>
    </aside>
  );
};