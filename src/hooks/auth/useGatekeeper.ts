// src/hooks/auth/useGatekeeper.ts
import { useState } from "react";

export function useGatekeeper(merchantId: string, currentEmail: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "error" | "success" | "", text: string }>({ type: "", text: "" });

  const completeProfile = async (data: any) => {
    setIsLoading(true);
    setStatusMsg({ type: "", text: "" });

    if (data.password !== data.confirmPassword) {
      setStatusMsg({ type: "error", text: "Passwords do not match. Please try again." });
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/profile/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          merchantId, 
          email: data.email, 
          password: data.password, 
          businessName: data.businessName 
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error);

      setStatusMsg({ type: "success", text: "Verification email sent! Please check your inbox." });
    } catch (error: any) {
      setStatusMsg({ type: "error", text: error.message || "Failed to complete profile." });
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async () => {
    setIsLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const res = await fetch("/api/auth/profile/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchantId, email: currentEmail })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error);

      setStatusMsg({ type: "success", text: "Verification email re-sent! Please check your inbox." });
    } catch (error: any) {
      setStatusMsg({ type: "error", text: error.message || "Failed to resend email." });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, statusMsg, completeProfile, resendVerification };
}