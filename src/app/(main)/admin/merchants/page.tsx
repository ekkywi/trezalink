// src/app/(main)/admin/merchants/page.tsx
import prisma from "@/lib/neon";
import { 
  Users, 
  Search, 
  MoreVertical, 
  ShieldAlert, 
  CheckCircle2,
  ExternalLink,
  Activity,
  XCircle // Pastikan XCircle di-import untuk badge status
} from "lucide-react";
import { SuspendButton } from "@/components/admin/SuspendButton"; // Sesuaikan path jika berbeda
import Link from "next/link"; // Pastikan Link di-import

export default async function AdminMerchantsPage({
  searchParams,
}: {
  // 1. UBAH TIPENYA MENJADI PROMISE
  searchParams: Promise<{ search?: string }>;
}) {
  // 2. AWAIT SEARCHPARAMS DI SINI
  const resolvedSearchParams = await searchParams;

  // 3. GUNAKAN VARIABEL YANG SUDAH DI-AWAIT
  const search = resolvedSearchParams.search || "";

  // Bangun query pencarian
  const whereClause: any = {};
  if (search) {
    whereClause.OR = [
      { businessName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  // Fetch data merchant beserta jumlah transaksi mereka
  const merchants = await prisma.merchant.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { transactions: true }
      }
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-200 dark:border-[#2A2A2A]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl shadow-lg shadow-purple-500/20 ring-1 ring-purple-500/50">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Merchant Directory</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">Manage registered businesses and API access</p>
          </div>
        </div>
        
        <div className="px-4 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-[#2A2A2A]">
          <span className="text-sm font-bold text-gray-900 dark:text-white">Total: {merchants.length}</span>
          <span className="text-sm text-gray-500 ml-1">Entities</span>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm flex items-center">
        <form className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by Business Name or Email..."
            className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm outline-none focus:border-purple-500 dark:text-white transition-all"
          />
        </form>
      </div>

      {/* MERCHANTS TABLE */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#151515] border-b border-gray-100 dark:border-[#2A2A2A] text-gray-400 font-black text-[10px] uppercase tracking-widest">
                <th className="p-4 pl-6">Business Profile</th>
                <th className="p-4">Registered Date</th>
                <th className="p-4">Tx Volume</th>
                <th className="p-4">Network Access</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-[#2A2A2A]">
              {merchants.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">
                    <Users className="mx-auto mb-2 opacity-20" size={32} />
                    No merchants found matching your criteria.
                  </td>
                </tr>
              )}
              {merchants.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-[#2A2A2A] dark:to-[#333] flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold font-mono text-lg border border-gray-300 dark:border-[#444]">
                        {merchant.businessName ? merchant.businessName.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 dark:text-white">{merchant.businessName || "Unfinished Setup"}</span>
                        <span className="text-[11px] text-gray-500 font-mono mt-0.5">{merchant.email}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4 text-[12px] text-gray-500 font-medium">
                    {new Date(merchant.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <Activity size={14} className="text-blue-500" />
                      <span className="font-mono font-bold text-xs text-gray-700 dark:text-gray-300">
                        {merchant._count.transactions} <span className="text-[10px] text-gray-400 font-sans">TXs</span>
                      </span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    {merchant.isActive ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 ring-1 ring-green-500/20">
                        <CheckCircle2 size={10} /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 ring-1 ring-red-500/20">
                        <XCircle size={10} /> Suspended
                      </span>
                    )}
                  </td>
                  
                  <td className="p-4 text-right pr-6">
                 <div className="flex items-center justify-end gap-2">
                   <Link 
                     href={`/admin/merchants/${merchant.id}`} 
                     className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors inline-flex" 
                     title="View Merchant Profile"
                   >
                     <ExternalLink size={16} />
                   </Link>

                   {/* INI TOMBOL BARUNYA */}
                   <SuspendButton merchantId={merchant.id} isActive={merchant.isActive} />

                 </div>
               </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}