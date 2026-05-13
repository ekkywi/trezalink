// src/components/dashboard/developers/DeveloperView.tsx
"use client";

import { useState } from "react";
import { Key, BookOpen, Activity } from "lucide-react";
import { TabCredentials } from "./TabCredentials";
import { TabApiDocs } from "./TabApiDocs";
import { TabWebhookLogs } from "./TabWebhookLogs";

export function DeveloperView({ merchant }: { merchant: any }) {
  const [activeTab, setActiveTab] = useState<"credentials" | "docs" | "logs">("credentials");

  return (
    <div className="space-y-6 relative">
      {/* TAB NAVIGATION HEADER */}
      <div className="flex gap-6 border-b border-gray-200 dark:border-[#2A2A2A] overflow-x-auto hide-scrollbar">
        <button onClick={() => setActiveTab("credentials")} className={`pb-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${activeTab === "credentials" ? "border-blue-500 text-blue-600 dark:text-blue-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
          <Key size={16} /> API & Credentials
        </button>
        <button onClick={() => setActiveTab("docs")} className={`pb-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${activeTab === "docs" ? "border-purple-500 text-purple-600 dark:text-purple-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
          <BookOpen size={16} /> API Docs
        </button>
        <button onClick={() => setActiveTab("logs")} className={`pb-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${activeTab === "logs" ? "border-orange-500 text-orange-600 dark:text-orange-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
          <Activity size={16} /> Webhook Logs
        </button>
      </div>

      {/* RENDER SUB-COMPONENTS BERDASARKAN TAB AKTIF */}
      {activeTab === "credentials" && <TabCredentials merchant={merchant} />}
      {activeTab === "docs" && <TabApiDocs />}
      {activeTab === "logs" && <TabWebhookLogs activeTab={activeTab} />}
    </div>
  );
}