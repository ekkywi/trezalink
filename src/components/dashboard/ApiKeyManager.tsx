// src/components/dashboard/ApiKeyManager.tsx
"use client";

import { useState } from "react";
import { Key, Copy, RefreshCw, Eye, EyeOff, CheckCircle2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ApiKeyManagerProps {
  initialApiKey: string;
}

export function ApiKeyManager({ initialApiKey }: ApiKeyManagerProps) {
  const router = useRouter();
  const [apiKey, setApiKey] = useState(initialApiKey);
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRegenerate = async () => {
    const confirmed = confirm(
      "WARNING: Regenerating your API Key will instantly break any existing integrations using the old key. Are you absolutely sure?"
    );
    
    if (!confirmed) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/merchant/apikey/regenerate", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setApiKey(data.apiKey);
      setIsVisible(true);
      router.refresh();
    } catch (error) {
      alert("Failed to regenerate API Key.");
    } finally {
      setIsLoading(false);
    }
  };

  const maskedKey = apiKey 
    ? `${apiKey.slice(0, 8)}${"•".repeat(16)}${apiKey.slice(-4)}`
    : "No API Key found";

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-gray-500" />
          <h3 className="font-bold text-gray-900 dark:text-white">Production API Key</h3>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-4 leading-relaxed">
        Use this key to authenticate API requests from your backend server. <strong className="text-red-500 dark:text-red-400">Never expose it in client-side code</strong> (e.g., React, Vue, or plain HTML).
      </p>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 flex items-center justify-between bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-[#333] rounded-lg px-3 py-2.5">
          <code className="text-sm font-mono text-gray-800 dark:text-gray-200 truncate">
            {isVisible ? apiKey : maskedKey}
          </code>
          <button 
            onClick={() => setIsVisible(!isVisible)}
            className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            title={isVisible ? "Hide Key" : "Reveal Key"}
          >
            {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        
        <button 
          onClick={handleCopy}
          className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black p-2.5 rounded-lg transition-colors flex items-center justify-center shrink-0"
          title="Copy to Clipboard"
        >
          {isCopied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>

      <button 
        onClick={handleRegenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
        {isLoading ? "Generating..." : "Roll API Key"}
      </button>
    </div>
  );
}