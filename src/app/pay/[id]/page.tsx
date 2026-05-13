// src/app/pay/[id]/page.tsx
import prisma from "@/lib/neon";
import { notFound } from "next/navigation";
import { CheckoutCard } from "@/components/checkout/CheckoutCard";
import { ShieldCheck, Lock, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

// --- UPGRADE 1: DYNAMIC METADATA UNTUK PREVIEW WHATSAPP/TELEGRAM ---
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const transaction = await prisma.transaction.findUnique({
    where: { id },
    include: { merchant: { select: { businessName: true } } }
  });

  if (!transaction) return { title: "Invoice Not Found | Trezalink" };

  return {
    title: `Pay ${transaction.amount} ${transaction.currency} to ${transaction.merchant.businessName}`,
    description: `Secure Web3 checkout for Order #${transaction.orderId}`,
  };
}

export default async function CheckoutPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  const transaction = await prisma.transaction.findUnique({
    where: { id: id },
    include: {
      merchant: {
        select: {
          businessName: true,
          walletAddress: true,
        }
      }
    }
  });

  if (!transaction) {
    notFound();
  }

  // --- UPGRADE 2: PENANGANAN SUCCESS URL SAAT STATUS PAID ---
  if (transaction.status === "PAID") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">
          <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-500 mb-8">
            Thank you for your purchase from <strong>{transaction.merchant.businessName}</strong>.
          </p>
          
          {/* Jika merchant memiliki successUrl, beri jalan pulang ke toko mereka */}
          {transaction.successUrl ? (
            <Link 
              href={transaction.successUrl}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-bold transition-colors"
            >
              Return to Merchant <ArrowRight size={18} />
            </Link>
          ) : (
            <div className="text-sm font-medium text-gray-400 bg-gray-50 py-3 rounded-xl border border-gray-100">
              You may now close this window.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-4">
      {/* Header Keamanan Singkat */}
      <div className="flex items-center gap-2 mb-8 text-gray-400">
        <Lock size={14} />
        <span className="text-xs font-medium uppercase tracking-widest">Secure Solana Payment</span>
      </div>

      {/* Komponen Utama Pembayaran (The Engine) */}
      <CheckoutCard transaction={transaction} />

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
          Secured by <Lock size={12} className="inline" /> <span className="font-bold text-gray-800 dark:text-gray-300">Trezalink</span>
        </p>
      </div>
    </div>
  );
}