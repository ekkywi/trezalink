// src/app/dashboard/payments/page.tsx
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { getCurrentMerchant } from "@/lib/auth-service";
import prisma from "@/lib/neon";
import { redirect } from "next/navigation";

// Tentukan berapa banyak baris per halaman
const ITEMS_PER_PAGE = 10;

export default async function PaymentsPage({
  searchParams,
}: {
  // Tangkap parameter dari URL (dari komponen TransactionTable)
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const merchant = await getCurrentMerchant();
  if (!merchant) redirect("/login");

  const params = await searchParams;

  // 1. Ekstrak nilai dari URL
  const page = Number(params.page) || 1;
  const search = typeof params.search === "string" ? params.search : "";
  const statusFilter = typeof params.status === "string" ? params.status : "ALL";

  // 2. Buat kondisi filter untuk Prisma (WHERE clause dinamis)
  const whereCondition: any = {
    merchantId: merchant.id,
  };

  // Jika ada pencarian (Search)
  if (search) {
    whereCondition.orderId = {
      contains: search,
      mode: "insensitive", // Case-insensitive (huruf besar/kecil tidak masalah)
    };
  }

  // Jika ada filter status (PAID atau PENDING)
  if (statusFilter !== "ALL") {
    whereCondition.status = statusFilter;
  }

  // 3. Hitung TOTAL SELURUH DATA (untuk membuat nomor halaman)
  const totalItems = await prisma.transaction.count({
    where: whereCondition,
  });
  
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  // 4. Ambil HANYA 10 DATA sesuai halaman saat ini (Pagination)
  const transactions = await prisma.transaction.findMany({
    where: whereCondition,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold dark:text-white text-gray-900">Transaction History</h2>
          <p className="text-xs text-gray-500 mt-1">View and manage your incoming Solana payments.</p>
        </div>
      </div>
      
      {/* Kirim data yang sudah difilter dan total halaman ke tabel */}
      <TransactionTable 
        transactions={transactions} 
        totalPages={totalPages} 
      />
    </div>
  );
}