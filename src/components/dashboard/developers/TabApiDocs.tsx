// src/components/dashboard/developers/TabApiDocs.tsx
import { FileJson, Blocks, Terminal } from "lucide-react";

export function TabApiDocs() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-5 flex items-center justify-between group hover:border-orange-500 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center text-orange-500"><FileJson size={20} /></div>
            <div><h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">Postman Collection</h4><p className="text-[11px] text-gray-500">Download the .json collection.</p></div>
          </div>
          <button className="text-[10px] font-bold bg-gray-100 dark:bg-[#2A2A2A] px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300">Download</button>
        </div>
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-5 flex items-center justify-between group hover:border-blue-500 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-500"><Blocks size={20} /></div>
            <div><h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">Platform Plugins</h4><p className="text-[11px] text-gray-500">WooCommerce, Shopify (Coming Soon)</p></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4"><span className="px-2 py-1 bg-green-100 text-green-700 font-black text-[10px] rounded uppercase tracking-widest">POST</span><code className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300">/api/v1/checkout</code></div>
          <p className="text-xs text-gray-500 mb-6">Create a new checkout session and generate a payment URL.</p>
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Request Body Schema</h4>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-[#2A2A2A]"><div className="flex justify-between items-center mb-1"><span className="text-xs font-mono font-bold text-blue-600">orderId</span><span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">REQUIRED</span></div><p className="text-[11px] text-gray-500">String. A unique identifier for the transaction.</p></div>
            <div className="p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-[#2A2A2A]"><div className="flex justify-between items-center mb-1"><span className="text-xs font-mono font-bold text-blue-600">amount</span><span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">REQUIRED</span></div><p className="text-[11px] text-gray-500">Number. The payment amount in SOL.</p></div>
            <div className="p-3 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-[#2A2A2A]"><div className="flex justify-between items-center mb-1"><span className="text-xs font-mono font-bold text-blue-600">currency</span><span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">REQUIRED</span></div><p className="text-[11px] text-gray-500">String. The currency code. Supports "SOL".</p></div>
          </div>
        </div>
        <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-gray-400"><Terminal size={16} /><h4 className="text-xs font-bold">cURL Example</h4></div>
          <div className="flex-1 bg-[#151515] rounded-xl p-4 overflow-x-auto">
<pre className="text-[11px] font-mono text-gray-300 leading-relaxed">
<span className="text-pink-500">curl</span> -X POST https://trezalink.com/api/v1/checkout \
<br/>  -H <span className="text-green-400">"Content-Type: application/json"</span> \
<br/>  -H <span className="text-green-400">"Authorization: Bearer YOUR_API_KEY"</span> \
<br/>  -d <span className="text-yellow-300">'{'{'}</span>
<br/>    <span className="text-blue-300">"orderId"</span>: <span className="text-green-400">"INV-2026-001"</span>,
<br/>    <span className="text-blue-300">"amount"</span>: <span className="text-orange-400">0.5</span>,
<br/>    <span className="text-blue-300">"currency"</span>: <span className="text-green-400">"SOL"</span>
<br/>  <span className="text-yellow-300">{'}'}'</span>
</pre>
          </div>
        </div>
      </div>
    </div>
  );
}