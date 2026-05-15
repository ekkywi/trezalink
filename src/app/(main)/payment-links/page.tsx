// src/app/dashboard/payment-links/page.tsx
import { getCurrentMerchant } from "@/lib/auth-service";
import prisma from "@/lib/neon";
import { redirect } from "next/navigation";
import { CreateLinkButton } from "@/components/dashboard/CreateLinkButton";
import { LinkTable } from "@/components/dashboard/LinkTable";
import { LinkIcon } from "lucide-react";

// Tentukan jumlah data per halaman
const ITEMS_PER_PAGE = 10;

export default async function PaymentLinksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const merchant = await getCurrentMerchant();
  if (!merchant) redirect("/login");

  const params = await searchParams;

  // 1. Ekstrak nilai parameter dari URL
  const page = Number(params.page) || 1;
  const search = typeof params.search === "string" ? params.search : "";
  const statusFilter = typeof params.status === "string" ? params.status : "ALL";

  // 2. Rangkai kondisi filter dinamis untuk Prisma
  const whereCondition: any = {
    merchantId: merchant.id,
  };

  if (search) {
    whereCondition.orderId = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (statusFilter !== "ALL") {
    whereCondition.status = statusFilter;
  }

  // 3. Hitung total data untuk Paginasi
  const totalItems = await prisma.transaction.count({
    where: whereCondition,
  });
  
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  // 4. Ambil HANYA 10 data yang sesuai halaman saat ini (Skip & Take)
  const links = await prisma.transaction.findMany({
    where: whereCondition,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold dark:text-white text-gray-900 flex items-center gap-2">
            <LinkIcon className="text-blue-500" /> Payment Links
          </h2>
          <p className="text-sm text-gray-500 mt-1">Create and manage no-code payment links for your customers.</p>
        </div>

        <CreateLinkButton merchantId={merchant.id} />
      </div>

      {/* 5. Kirim data dan total halaman ke komponen LinkTable yang sudah kita upgrade */}
      <LinkTable links={links} totalPages={totalPages} />
    </div>
  );
}