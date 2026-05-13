// src/components/dashboard/developers/TabWebhookLogs.tsx
"use client";

import { Activity, Clock, RefreshCw, XCircle } from "lucide-react";
import { useWebhookLogs } from "@/hooks/api/merchant/useWebhookLogs";

export function TabWebhookLogs({ activeTab }: { activeTab: string }) {
  const { logs, isLoadingLogs, selectedLog, setSelectedLog, fetchLogs } = useWebhookLogs(activeTab);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* MODAL JSON DETAIL */}
      {selectedLog && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-gray-200 dark:border-[#2A2A2A] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-[#2A2A2A] flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Webhook Delivery Detail</h3>
                <p className="text-xs text-gray-500 mt-1">{new Date(selectedLog.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedLog(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-[#2A2A2A] rounded-full text-gray-500 transition-colors"><XCircle size={24} /></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#2A2A2A]">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Status</p>
                  <p className={`text-sm font-bold ${selectedLog.status === 200 ? 'text-green-500' : 'text-red-500'}`}>{selectedLog.status ? `${selectedLog.status} OK` : 'Connection Failed'}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#2A2A2A] truncate">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Event</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{selectedLog.event}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-2">Request Payload (JSON)</p>
                <div className="bg-[#0D0D0D] rounded-xl p-4 overflow-x-auto border border-[#2A2A2A]"><pre className="text-[11px] font-mono text-green-400">{JSON.stringify(JSON.parse(selectedLog.payload), null, 2)}</pre></div>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-2">Server Response</p>
                <div className="bg-gray-50 dark:bg-[#151515] rounded-xl p-4 overflow-x-auto border border-gray-200 dark:border-[#2A2A2A]"><pre className="text-[11px] font-mono text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{selectedLog.response || "No response data"}</pre></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER TABEL */}
      <div className="flex justify-between items-center mb-4">
        <div><h2 className="text-lg font-bold text-gray-900 dark:text-white">Delivery History</h2><p className="text-xs text-gray-500">Show 50 latest webhook events.</p></div>
        <button onClick={fetchLogs} className="p-2 bg-gray-100 dark:bg-[#2A2A2A] rounded-lg text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors"><RefreshCw size={16} className={isLoadingLogs ? "animate-spin" : ""} /></button>
      </div>

      {/* ISI TABEL */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl overflow-hidden shadow-sm">
        {isLoadingLogs && logs.length === 0 ? (
          <div className="p-10 flex flex-col items-center justify-center text-gray-400"><RefreshCw className="animate-spin mb-3" size={24} /><p className="text-sm">Loading logs...</p></div>
        ) : logs.length === 0 ? (
          <div className="p-10 flex flex-col items-center justify-center text-gray-400"><Activity className="mb-3 opacity-20" size={48} /><p className="text-sm font-bold text-gray-600 dark:text-gray-300">No Logs Found</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-[#151515] text-gray-500 text-[11px] uppercase tracking-wider font-bold">
                <tr><th className="p-4">Delivery Time</th><th className="p-4">Event</th><th className="p-4">Status</th><th className="p-4 text-right">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#2A2A2A]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-[#151515]/50 transition-colors">
                    <td className="p-4"><div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><Clock size={14} className="opacity-50" /><span>{new Date(log.createdAt).toLocaleString()}</span></div></td>
                    <td className="p-4"><code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] text-gray-800 dark:text-gray-300 px-2.5 py-1 rounded-md font-bold">{log.event}</code></td>
                    <td className="p-4"><div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${log.status === 200 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}><div className={`w-1.5 h-1.5 rounded-full ${log.status === 200 ? 'bg-green-500' : 'bg-red-500'}`} />{log.status ? `${log.status} OK` : 'Err'}</div></td>
                    <td className="p-4 text-right"><button onClick={() => setSelectedLog(log)} className="text-[11px] font-bold text-blue-600 hover:bg-blue-100 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg">View JSON</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}