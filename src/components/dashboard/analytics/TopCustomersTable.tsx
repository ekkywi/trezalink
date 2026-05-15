// src/components/dashboard/analytics/TopCustomersTable.tsx
export function TopCustomersTable({ customers }: { customers: any[] }) {
  
  // Jika database masih kosong, tampilkan pesan ini
  if (!customers || customers.length === 0) {
    return (
      <div className="py-8 flex items-center justify-center text-sm font-medium text-gray-400 dark:text-gray-500">
        No customer data available yet.
      </div>
    );
  }

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
            <tr key={i} className="group transition-colors hover:bg-gray-50/50 dark:hover:bg-[#1A1A1A]">
              <td className="py-4">
                {/* 1. Menggunakan displayName hasil dari formatting di server */}
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate max-w-[150px] sm:max-w-none">
                  {c.displayName}
                </p>
                
                {/* 2. Menambahkan badge khusus untuk pengguna anonim Web3 */}
                {!c.customerEmail && c.buyerWallet && (
                  <span className="inline-block mt-1 text-[9px] bg-gray-100 dark:bg-[#2A2D35] px-1.5 py-0.5 rounded text-gray-500 font-bold uppercase tracking-wider">
                    Wallet Address
                  </span>
                )}
              </td>
              <td className="py-4 text-center">
                <span className="text-xs font-medium text-gray-500">{c._count?.id || 0} txs</span>
              </td>
              <td className="py-4 text-right">
                <p className="text-xs font-black text-blue-600 dark:text-blue-400">
                  {(c._sum?.amount || 0).toFixed(3)} SOL
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}