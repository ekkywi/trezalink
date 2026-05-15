// src/app/(main)/admin/layout.tsx
import { getCurrentMerchant } from "@/lib/auth-service";
import { redirect } from "next/navigation";

export default async function AdminSecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentMerchant = await getCurrentMerchant();

  // 1. Cek apakah user sudah login
  if (!currentMerchant) {
    redirect("/login");
  }

  // 2. PROTEKSI MUTLAK: Jika role BUKAN ADMIN, tendang keluar!
  if (currentMerchant.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // 3. Jika lolos (role === ADMIN), izinkan sistem merender halaman yang diminta
  return <>{children}</>;
}