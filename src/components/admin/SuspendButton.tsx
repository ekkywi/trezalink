"use client";

import { ShieldAlert, ShieldCheck, X, AlertTriangle, UserCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { toggleMerchantStatus } from "@/app/(main)/admin/merchants/actions/merchant";
import { toast } from "sonner";

export function SuspendButton({ merchantId, isActive }: { merchantId: string, isActive: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    setShowModal(false);
    
    startTransition(async () => {
      const toastId = toast.loading(`${isActive ? 'Suspending' : 'Activating'} merchant...`);
      
      const result = await toggleMerchantStatus(merchantId, isActive);

      if (result.success) {
        toast.success(
          isActive 
            ? `${result.businessName} has been suspended.` 
            : `${result.businessName} is now active.`,
          { id: toastId }
        );
      } else {
        toast.error(`Error: ${result.error}`, { id: toastId });
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={isPending}
        className={`p-2 rounded-xl transition-all ${
          isActive
            ? "text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            : "text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10 dark:hover:text-green-400"
        } ${isPending ? "opacity-50 cursor-not-allowed animate-pulse" : ""}`}
        title={isActive ? "Suspend Merchant" : "Re-activate Merchant"}
      >
        {isActive ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
      </button>

      {showModal && (
        // Overlay ditambahkan padding p-4 agar modal tidak mentok di pinggir layar kecil
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 p-4">
          
          {/* UBAH DI SINI: Tambahkan max-h-[90vh], overflow-y-auto, dan w-full max-w-md */}
          <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-gray-100 dark:border-[#2A2A2A] animate-in zoom-in-95 duration-300 flex flex-col">
            
            <div className="p-8 pb-3 text-center relative shrink-0">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2A2A2A] transition-colors"
              >
                <X size={18} />
              </button>
              
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg ${
                isActive 
                  ? "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 ring-8 ring-red-50 dark:ring-red-950/20" 
                  : "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400 ring-8 ring-green-50 dark:ring-green-950/20"
              }`}>
                {isActive ? <AlertTriangle size={32} strokeWidth={2.5} /> : <UserCheck size={32} strokeWidth={2.5} />}
              </div>

              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {isActive ? "Confirm Account Suspension" : "Confirm Account Reactivation"}
              </h3>
            </div>

            {/* UBAH DI SINI: Tambahkan break-words dan whitespace-normal */}
            <div className="px-8 pb-8 text-center overflow-y-auto">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium break-words whitespace-normal">
                {isActive 
                  ? "Are you sure? This will instantly revoke their API access. All existing checkout sessions and future API calls for this merchant will be blocked immediately."
                  : "Are you sure? This will restore their API access. They will be able to process transactions and use the Trezalink network again."}
              </p>
            </div>

            <div className="p-5 border-t border-gray-100 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#151515] flex flex-col sm:flex-row gap-3 shrink-0 rounded-b-3xl">
              <button
                onClick={() => setShowModal(false)}
                className="w-full order-2 sm:order-1 px-5 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-[#2A2A2A] hover:bg-gray-100 dark:hover:bg-[#333] border border-gray-200 dark:border-[#3A3A3A] rounded-xl transition-all shadow-sm"
              >
                Cancel, keep as is
              </button>
              <button
                onClick={handleConfirm}
                className={`w-full order-1 sm:order-2 px-5 py-3 text-sm font-black text-white rounded-xl transition-all shadow-lg active:scale-95 ${
                  isActive 
                    ? "bg-red-600 hover:bg-red-700 shadow-red-500/30" 
                    : "bg-green-600 hover:bg-green-700 shadow-green-500/30"
                }`}
              >
                {isActive ? "Yes, Suspend Access" : "Yes, Reactivate Access"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}