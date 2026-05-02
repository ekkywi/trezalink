import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DeveloperPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 w-full flex flex-col lg:flex-row gap-12 mt-10">
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Integrasi Backend</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            API dirancang dengan pendekatan RESTful. Kirim payload harga dan kunci referensi, terima URL transaksi raw yang siap ditandatangani oleh dompet klien.
          </p>
          
          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex gap-4 border-b border-white/5 pb-4">
              <div className="font-mono text-emerald-400 font-bold w-12">POST</div>
              <div className="font-mono">/api/v1/checkout</div>
            </div>
            <div className="flex gap-4 border-b border-white/5 pb-4">
              <div className="font-mono text-cyan-400 font-bold w-12">GET</div>
              <div className="font-mono">/api/v1/invoices/:id</div>
            </div>
            <div className="flex gap-4 pb-4">
              <div className="font-mono text-purple-400 font-bold w-12">WSS</div>
              <div>Listener status transaksi on-chain</div>
            </div>
          </div>
        </div>
        
        {/* Code Block */}
        <div className="flex-1 w-full bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="ml-2 text-xs text-gray-500 font-mono">kirupay-init.ts</span>
          </div>
          <div className="p-6 overflow-x-auto text-sm font-mono text-gray-300">
            <pre>
              <code className="language-typescript">
<span className="text-gray-500">// Payload inisialisasi invoice via Next.js backend</span>{'\n'}
<span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> fetch(<span className="text-emerald-300">'https://api.kirupay.com/v1/checkout'</span>, {'{'}{'\n'}
{'  '}method: <span className="text-emerald-300">'POST'</span>,{'\n'}
{'  '}headers: {'{'}{'\n'}
{'    '}<span className="text-cyan-400">'Authorization'</span>: <span className="text-emerald-300">`Bearer ${'{'}process.env.KIRU_SECRET_KEY{'}'}`</span>,{'\n'}
{'    '}<span className="text-cyan-400">'Content-Type'</span>: <span className="text-emerald-300">'application/json'</span>{'\n'}
{'  }'},{'\n'}
{'  '}body: JSON.stringify({'{'}{'\n'}
{'    '}reference_id: <span className="text-emerald-300">'INV-9092-A'</span>,{'\n'}
{'    '}amount: <span className="text-cyan-400">500000</span>, <span className="text-gray-500">// Tipe data integer (Rupiah)</span>{'\n'}
{'    '}currency: <span className="text-emerald-300">'IDR'</span>,{'\n'}
{'    '}webhook_url: <span className="text-emerald-300">'https://toko.com/api/webhook/kirupay'</span>{'\n'}
{'  }'}){'\n'}
{'}'});{'\n\n'}
<span className="text-purple-400">const</span> {'{ payment_url }'} = <span className="text-purple-400">await</span> response.json();
              </code>
            </pre>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}