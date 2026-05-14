// src/components/dashboard/analytics/TopCustomersTable.tsx
export function TopCustomersTable({ customers }: { customers: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-[#2A2A2A]">
            <th className="pb-4">Customer</th>
            <th className="pb-4 text-center">Orders</th>
            <th className="pb-4 text-right">Total Spent</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-[#2A2A2A]">
          {customers.map((c, i) => (
            <tr key={i} className="group transition-colors">
              <td className="py-4">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate max-w-[150px] sm:max-w-none">
                  {c.customerEmail || "Anonymous Wallet"}
                </p>
              </td>
              <td className="py-4 text-center">
                <span className="text-xs font-medium text-gray-500">{c._count.id} txs</span>
              </td>
              <td className="py-4 text-right">
                <p className="text-xs font-black text-blue-600 dark:text-blue-400">
                  {c._sum.amount.toFixed(3)} SOL
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}