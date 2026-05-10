// src/components/dashboard/DashboardShell.tsx
"use client";

import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

export function DashboardShell({ 
  merchant, 
  children 
}: { 
  merchant: any, 
  transactions: any[],
  totalRevenue: number,
  children: React.ReactNode 
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F5F7] dark:bg-[#121212] transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNav merchant={merchant} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}