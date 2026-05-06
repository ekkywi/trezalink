import { Clock, ExternalLink } from "lucide-react";

const mockTransactions = [
  { id: "TX-9921", name: "Coffee POS", type: "Income", amount: "45.000", time: "12:41:05", status: "Success" },
  { id: "TX-9920", name: "AWS Cloud", type: "Expense", amount: "1.200.000", time: "12:38:12", status: "Pending" },
  { id: "TX-9919", name: "Digital Goods", type: "Income", amount: "850.000", time: "12:15:00", status: "Success" },
];

export const TransactionTable = () => (
  <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg overflow-hidden flex flex-col h-full transition-colors">
    <div className="p-3 border-b border-gray-200 dark:border-[#2A2A2A] flex justify-between items-center bg-gray-50/50 dark:bg-[#1A1A1A]">
      <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Recent Activity</h3>
      <button className="text-[10px] font-bold text-blue-600 hover:underline">View Stream</button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#F4F5F7] dark:bg-[#1A1A1A] text-[10px] uppercase font-bold text-gray-400 border-b border-gray-200 dark:border-[#2A2A2A]">
          <tr>
            <th className="px-4 py-2">Transaction / ID</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2 text-right">Amount (IDR)</th>
            <th className="px-4 py-2 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-[#222222]">
          {mockTransactions.map((tx, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors cursor-pointer group">
              <td className="px-4 py-3">
                <span className="text-xs font-bold block dark:text-gray-200">{tx.name}</span>
                <span className="text-[10px] text-gray-400 font-mono">{tx.id}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">{tx.type}</span>
              </td>
              <td className={`px-4 py-3 text-right font-mono text-xs font-bold ${tx.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                {tx.type === 'Income' ? '+' : '-'}{tx.amount}
              </td>
              <td className="px-4 py-3 text-center">
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                  tx.status === 'Success' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                }`}>
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);