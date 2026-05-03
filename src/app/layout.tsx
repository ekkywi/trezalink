import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// 1. Import ThemeProvider yang baru saja Anda buat
import { ThemeProvider } from "@/components/ThemeProvider"; 

// Konfigurasi Font Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kirupay | Web3 Payment Infrastructure",
  description: "Non-custodial Solana payment gateway with atomic split-fee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 2. Tambahkan suppressHydrationWarning di tag html
    <html lang="id" suppressHydrationWarning>
      {/* 3. Gunakan warna dinamis (Terang & Gelap) di Body */}
      <body className={`${poppins.className} antialiased bg-[#F8F9FA] text-gray-900 dark:bg-[#030305] dark:text-white transition-colors duration-300`}>
        
        {/* 4. Bungkus seluruh aplikasi dengan ThemeProvider */}
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem
        >
          {children}
        </ThemeProvider>
        
      </body>
    </html>
  );
}