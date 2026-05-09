// components/dashboard/TransactionTable.tsx
export function TransactionTable({ transactions }: { transactions: any[] }) {
  if (!transactions || transactions.length === 0) {
    return <div className="p-8 text-center text-gray-400 text-sm italic">No transactions found yet.</div>;
  }

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 dark:bg-[#1A1A1A] border-b border-gray-100 dark:border-[#2A2A2A]">
            <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
            <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
            <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
            <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-[#2A2A2A]">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-[#252525] transition-colors">
              <td className="p-4 text-xs font-bold text-gray-700 dark:text-gray-300">{tx.orderId}</td>
              <td className="p-4 text-xs font-mono font-bold text-blue-600">{tx.amount} {tx.currency}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase ${
                  tx.status === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {tx.status}
                </span>
              </td>
              <td className="p-4 text-[10px] text-gray-400 font-medium">
                {new Date(tx.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}