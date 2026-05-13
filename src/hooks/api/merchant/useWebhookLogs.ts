// src/hooks/api/merchant/useWebhookLogs.ts
import { useState, useEffect } from "react";

export function useWebhookLogs(activeTab: string) {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  const fetchLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const res = await fetch("/api/merchant/webhook/logs");
      const json = await res.json();
      if (json.success) {
        setLogs(json.data);
      }
    } catch (error) {
      console.error("Gagal mengambil log webhook", error);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  // Otomatis fetch saat tab berubah menjadi "logs"
  useEffect(() => {
    if (activeTab === "logs") {
      fetchLogs();
    }
  }, [activeTab]);

  return { logs, isLoadingLogs, selectedLog, setSelectedLog, fetchLogs };
}