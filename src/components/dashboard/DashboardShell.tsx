// src/components/dashboard/DashboardShell.tsx
"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

export function DashboardShell({ 
  merchant, 
  children 
}: { 
  merchant: any, 
  children: React.ReactNode 
}) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F5F7] dark:bg-[#121212] transition-colors duration-300">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNav merchant={merchant} />
        
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}