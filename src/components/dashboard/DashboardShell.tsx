// src/components/dashboard/DashboardShell.tsx
"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { ApiConsoleView } from "./ApiConsoleView";

export function DashboardShell({ 
  merchant, 
  children 
}: { 
  merchant: any, 
  children: React.ReactNode 
}) {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return children; 
      case "api":
        return <ApiConsoleView apiKey={merchant.apiKey} />;
      case "payments":
        return (
          <div className="flex h-full items-center justify-center text-gray-500 font-medium">
            Transactions View Coming Soon...
          </div>
        );
      case "settings":
        return (
          <div className="flex h-full items-center justify-center text-gray-500 font-medium">
            Settings View Coming Soon...
          </div>
        );
      default:
        return children;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F5F7] dark:bg-[#121212] transition-colors duration-300">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNav merchant={merchant} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {/* Eksekusi fungsi penukar layar di sini */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}