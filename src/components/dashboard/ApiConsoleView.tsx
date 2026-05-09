// src/components/dashboard/ApiConsoleView.tsx
import { ApiKeyManager } from "./ApiKeyManager";
import { Terminal, BookOpen } from "lucide-react";

interface ApiConsoleViewProps {
  apiKey: string;
}

export function ApiConsoleView({ apiKey }: ApiConsoleViewProps) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">API Console</h2>
        <p className="text-sm text-gray-500">Manage your developer keys and integration settings for ExecuteFi / Kirupay.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kolom Kiri: Tempat API Key */}
        <div className="md:col-span-2">
          <ApiKeyManager initialApiKey={apiKey} />
        </div>

        {/* Kolom Kanan: Panduan Singkat */}
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold mb-2">
              <Terminal size={18} />
              <h3>Quick Start</h3>
            </div>
            <p className="text-xs text-blue-600/80 dark:text-blue-300/80 mb-4 leading-relaxed">
              Include your API key in the Authorization header of your HTTP requests to authenticate with our servers.
            </p>
            <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
              <pre className="text-[10px] text-green-400 font-mono">
                {`Authorization: Bearer YOUR_API_KEY`}
              </pre>
            </div>
          </div>

          <button className="w-full bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] hover:bg-gray-50 dark:hover:bg-[#2A2A2A] text-gray-700 dark:text-gray-300 rounded-xl p-4 transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <BookOpen size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span className="text-sm font-bold">Read Documentation</span>
            </div>
            <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}