// src/app/api/internal/confirm/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/neon";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { transactionId, signature } = await req.json();

    if (!transactionId || !signature) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { 
        status: "PAID",
        txSignature: signature
      },
      include: {
        merchant: true 
      }
    });

    const webhookUrl = updatedTransaction.merchant.webhookUrl;
    const webhookSecret = updatedTransaction.merchant.webhookSecret;
    
    if (webhookUrl) {
      try {
        const payloadData = {
          event: "payment.success",
          data: {
            orderId: updatedTransaction.orderId,
            transactionId: updatedTransaction.id,
            amount: updatedTransaction.amount,
            currency: updatedTransaction.currency,
            status: updatedTransaction.status,
            txSignature: updatedTransaction.txSignature,
            paidAt: updatedTransaction.updatedAt
          }
        };

        const payloadString = JSON.stringify(payloadData);
        
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        if (webhookSecret) {
          const hmacSignature = crypto
            .createHmac("sha256", webhookSecret)
            .update(payloadString)
            .digest("hex");
            
          headers["X-Trezalink-Signature"] = hmacSignature;
        }

        await fetch(webhookUrl, {
          method: "POST",
          headers: headers,
          body: payloadString,
        });
      } catch (webhookError) {
        console.error(`Error sending webhook to ${webhookUrl}:`, webhookError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Transaction marked as PAID",
      data: updatedTransaction 
    });

  } catch (error: any) {
    console.error("Confirmation API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}