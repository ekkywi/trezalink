// src/app/pay/[id]/page.tsx
import prisma from "@/lib/neon";
import { notFound } from "next/navigation";
import { CheckoutCard } from "@/components/checkout/CheckoutCard";
import { ShieldCheck, Lock } from "lucide-react";

// PERUBAHAN 1: Jadikan params sebagai Promise
export default async function CheckoutPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // PERUBAHAN 2: Await params untuk mengekstrak 'id'
  const { id } = await params;

  // 1. Ambil data transaksi & merchant terkait
  const transaction = await prisma.transaction.findUnique({
    where: { id: id }, // PERUBAHAN 3: Gunakan variabel 'id' yang sudah di-await
    include: {
      merchant: {
        select: {
          businessName: true,
          walletAddress: true,
        }
      }
    }
  });

  // 2. Jika transaksi tidak ditemukan, tampilkan 404
  if (!transaction) {
    notFound();
  }

  // 3. Jika sudah dibayar, kita arahkan ke halaman sukses (nanti kita buat)
  if (transaction.status === "PAID") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">This invoice has been paid!</h1>
          <p className="text-gray-500">Thank you for your purchase.</p>
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

      {/* Komponen Utama Pembayaran */}
      <CheckoutCard transaction={transaction} />

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400">
          Powered by <span className="font-bold text-gray-600">Trezalink</span>
        </p>
      </div>
    </div>
  );
}