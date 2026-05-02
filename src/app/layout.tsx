import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

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
    <html lang="id">
      <body className={`${poppins.className} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}