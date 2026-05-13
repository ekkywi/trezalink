// src/hooks/api/transactions/useCreatePaymentLink.ts
import { useState } from "react";
import { createManualPaymentLink } from "@/app/actions/payment-link";

export function useCreatePaymentLink(merchantId: string) {
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const generateLink = async (formData: FormData) => {
    setLoading(true);
    setErrorMsg("");
    
    try {
      const result = await createManualPaymentLink({
        merchantId,
        amount: parseFloat(formData.get("amount") as string),
        orderId: formData.get("orderId") as string,
        // Jika form nanti ditambah input email, tinggal tambahkan di sini:
        // customerEmail: formData.get("email") as string, 
      });

      if (result.success) {
        const url = `${window.location.origin}/pay/${result.transactionId}`;
        setGeneratedLink(url);
        return true;
      } else {
        setErrorMsg(result.error || "An error occurred while generating the link.");
        return false;
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Network or server error.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setGeneratedLink("");
    setErrorMsg("");
  };

  return { loading, generatedLink, errorMsg, generateLink, resetState };
}