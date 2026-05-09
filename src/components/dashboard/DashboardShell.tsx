// src/components/dashboard/DashboardShell.tsx
"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { ApiConsoleView } from "./ApiConsoleView";
import { TransactionTable } from "./TransactionTable"; // Import ini
import { WebhookSettings } from "./WebhookSettings"; // Komponen yang kita bahas sebelumnya

export function DashboardShell({ 
  merchant, 
  transactions, // Tambahkan props ini
  totalRevenue, // Tambahkan props ini
  children 
}: { 
  merchant: any, 
  transactions: any[],
  totalRevenue: number,
  children: React.ReactNode 
}) {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return children; // Ini akan merender StatCard & WalletOverview dari page.tsx
      case "api":
        return <ApiConsoleView merchant={merchant} />;
      case "payments":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold dark:text-white text-gray-800">Transaction History</h2>
            <TransactionTable transactions={transactions} />
          </div>
        );
      case "settings":
        return (
          <div className="max-w-2xl space-y-6">
            <h2 className="text-xl font-bold dark:text-white text-gray-800">Merchant Settings</h2>
            <WebhookSettings merchant={merchant} />
          </div>
        );
      default:
        return children;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F5F7] dark:bg-[#121212] transition-colors duration-300">
      {/* Hanya ada SATU Sidebar di sini */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNav merchant={merchant} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}