import { ArrowDownLeft, ArrowUpRight, MoreHorizontal } from "lucide-react";

const mockTransactions = [
  { name: "Coffee POS", type: "Income", amount: "+IDR 45.000", time: "Just now", status: "success" },
  { name: "AWS Cloud", type: "Expense", amount: "-IDR 1.200.000", time: "2h ago", status: "pending" },
  { name: "Digital Goods", type: "Income", amount: "+IDR 850.000", time: "Yesterday", status: "success" },
];

export const TransactionTable = () => (
  <div className="bg-white dark:bg-[#0A0A0C] border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-8 transition-colors">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-xl font-black tracking-tight dark:text-white">Recent Activity</h3>
      <button className="text-sm font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 px-4 py-2 rounded-xl transition-colors">View All</button>
    </div>

    <div className="space-y-4">
      {mockTransactions.map((tx, i) => (
        <div key={i} className="flex items-center justify-between group p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-gray-100 dark:hover:border-white/5">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              tx.amount.startsWith('+') 
                ? 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400' 
                : 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400'
            }`}>
              {tx.amount.startsWith('+') ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
            </div>
            <div>
              <p className="text-sm font-black dark:text-white">{tx.name}</p>
              <p className="text-[10px] uppercase font-bold text-gray-400">{tx.type} • {tx.time}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm font-black ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {tx.amount}
            </p>
            <button className="text-gray-300 hover:text-blue-600 mt-1 transition-colors"><MoreHorizontal size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);