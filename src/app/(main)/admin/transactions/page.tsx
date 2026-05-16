// src/app/(main)/admin/transactions/page.tsx
import prisma from "@/lib/neon";
import { Globe, Search, Filter, ArrowUpRight, Activity } from "lucide-react";

export default async function AdminTransactionsPage({
  searchParams,
}: {
  // 1. UBAH TIPENYA MENJADI PROMISE
  searchParams: Promise<{ search?: string; status?: string; page?: string }>; 
}) {
  // 2. AWAIT SEARCHPARAMS DI SINI
  const resolvedSearchParams = await searchParams;

  // 3. GUNAKAN VARIABEL YANG SUDAH DI-AWAIT
  const page = Number(resolvedSearchParams.page) || 1;
  const limit = 20; 
  const skip = (page - 1) * limit;

  const search = resolvedSearchParams.search || "";
  const status = resolvedSearchParams.status || "ALL";

  // Bangun query dinamis berdasarkan filter
  const whereClause: any = {};
  if (search) {
    whereClause.orderId = { contains: search, mode: "insensitive" };
  }
  if (status !== "ALL") {
    whereClause.status = status;
  }

  // Tarik data secara paralel
  const [transactions, totalCount] = await Promise.all([
    prisma.transaction.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: { 
        merchant: { select: { businessName: true, email: true } } 
      }
    }),
    prisma.transaction.count({ where: whereClause })
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-200 dark:border-[#2A2A2A]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-slate-700 to-gray-900 text-white rounded-2xl shadow-lg">
            <Globe size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Global Ledger</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">Master record of all network transactions ({totalCount} total)</p>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH (Versi HTML Native untuk Server Component) */}
      <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm">
        <form className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search by Order ID..."
              className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm outline-none focus:border-blue-500 dark:text-white"
            />
          </div>
          <select
            name="status"
            defaultValue={status}
            className="w-full sm:w-auto px-4 py-2 bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500 appearance-none"
          >
            <option value="ALL">All Status</option>
            <option value="PAID">PAID</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>
          </select>
          <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-colors">
            Search
          </button>
        </form>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#151515] border-b border-gray-100 dark:border-[#2A2A2A] text-gray-400 font-black text-[10px] uppercase tracking-widest">
                <th className="p-4 pl-6">Merchant Entity</th>
                <th className="p-4">Order Ref</th>
                <th className="p-4">Gross Vol</th>
                <th className="p-4">Platform Fee</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4 text-right pr-6">Explorer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-[#2A2A2A]">
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-500">
                    <Activity className="mx-auto mb-2 opacity-20" size={32} />
                    No transactions found matching your criteria.
                  </td>
                </tr>
              )}
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 dark:text-white">{tx.merchant.businessName}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{tx.merchant.email}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-gray-500">{tx.orderId}</td>
                  <td className="p-4 font-mono font-bold text-xs">{tx.amount} SOL</td>
                  <td className="p-4 font-mono text-xs text-green-600 dark:text-green-500">
                    {tx.feeAmount ? `+${tx.feeAmount}` : "0"} SOL
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${
                      tx.status === "PAID" ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400" :
                      tx.status === "FAILED" ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400" :
                      "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-[11px] text-gray-500">
                    {new Date(tx.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4 text-right pr-6">
                    <a 
                      href={tx.txSignature ? `https://explorer.solana.com/tx/${tx.txSignature}?cluster=devnet` : '#'} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex p-2 rounded-lg transition-all ${
                        tx.txSignature ? "text-gray-400 hover:text-blue-600 hover:bg-blue-50" : "text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SIMPLE PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-white dark:bg-[#1E1E1E] p-4 rounded-xl border border-gray-200 dark:border-[#2A2A2A]">
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            {page > 1 && (
              <a href={`?page=${page - 1}&search=${search}&status=${status}`} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#2A2A2A] dark:border-[#2A2A2A]">Previous</a>
            )}
            {page < totalPages && (
              <a href={`?page=${page + 1}&search=${search}&status=${status}`} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#2A2A2A] dark:border-[#2A2A2A]">Next</a>
            )}
          </div>
        </div>
      )}

    </div>
  );
}