// src/components/dashboard/LinkTable.tsx
"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import Link from "next/link";

export function LinkTable({ links }: { links: any[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string) => {
    const url = `${window.location.origin}/pay/${id}`;
    navigator.clipboard.writeText(url);
    
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!links || links.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 dark:bg-[#151515] rounded-full flex items-center justify-center mb-4">
          <ExternalLink className="text-gray-400" size={24} />
        </div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Belum Ada Payment Link</h3>
        <p className="text-xs text-gray-500 max-w-sm">
          Anda belum membuat tagihan manual. Klik tombol "Create Link" di atas untuk mulai menerima pembayaran.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-200 dark:border-[#2A2A2A] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 dark:bg-[#151515] text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2A2A2A]">
            <tr>
              <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Reference ID</th>
              <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Created At</th>
              <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#2A2A2A]">
            {links.map((link) => (
              <tr key={link.id} className="hover:bg-gray-50 dark:hover:bg-[#2A2D35] transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-gray-900 dark:text-white">
                  {link.orderId}
                </td>
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                  {link.amount} SOL
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${
                    link.status === "PAID" 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" :
                    link.status === "FAILED" 
                      ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" :
                    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                  }`}>
                    {link.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-xs">
                  {new Date(link.createdAt).toLocaleDateString("en-US", {
                    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                  })}
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <button
                    onClick={() => handleCopy(link.id)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Copy Link"
                  >
                    {copiedId === link.id ? <Check size={16} className="text-green-500"/> : <Copy size={16}/>}
                  </button>
                  <Link
                    href={`/pay/${link.id}`}
                    target="_blank"
                    className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2A2A2A] rounded-lg transition-colors"
                    title="Open Link in New Tab"
                  >
                    <ExternalLink size={16}/>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}