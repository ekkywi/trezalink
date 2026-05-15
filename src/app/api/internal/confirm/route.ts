// src/app/api/internal/confirm/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/neon";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { transactionId, signature, buyerWallet, walletProvider } = await req.json();

    if (!transactionId || !signature) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // 1. Ambil data transaksi lama untuk mengetahui nominal awal (Gross)
    const existingTx = await prisma.transaction.findUnique({
      where: { id: transactionId }
    });

    if (!existingTx) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    // 2. Hitung Fee 0.3% dan Net Amount
    const grossAmount = existingTx.amount;
    const feeAmount = grossAmount * 0.003; 
    const netAmount = grossAmount - feeAmount;

    // 3. Update status beserta perhitungan fee
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { 
        status: "PAID",
        txSignature: signature,
        buyerWallet: buyerWallet || null,
        walletProvider: walletProvider || null,
        feeAmount: feeAmount,
        netAmount: netAmount
      },
      include: {
        merchant: true 
      }
    });

    const webhookUrl = updatedTransaction.merchant.webhookUrl;
    const webhookSecret = updatedTransaction.merchant.webhookSecret;
    
    let webhookLogId: string | null = null;

    if (webhookUrl) {
      const payloadData = {
        event: "payment.success",
        data: {
          orderId: updatedTransaction.orderId,
          transactionId: updatedTransaction.id,
          grossAmount: updatedTransaction.amount,
          platformFee: updatedTransaction.feeAmount,
          netAmount: updatedTransaction.netAmount,
          currency: updatedTransaction.currency,
          status: updatedTransaction.status,
          txSignature: updatedTransaction.txSignature,
          buyerWallet: updatedTransaction.buyerWallet,
          walletProvider: updatedTransaction.walletProvider,
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

      let statusCode: number | null = null;
      let responseText: string | null = null;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: headers,
          body: payloadString,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        statusCode = response.status;
        const rawText = await response.text();
        responseText = rawText ? rawText.substring(0, 1000) : "No Response Body";

      } catch (webhookError: any) {
        statusCode = null;
        responseText = webhookError.message || "Connection Failed / Timeout";
        console.error(`[CONFIRM API] Webhook Error to ${webhookUrl}:`, webhookError.message);
      }

      try {
        const newLog = await prisma.webhookLog.create({
          data: {
            merchantId: updatedTransaction.merchantId,
            event: "payment.success",
            url: webhookUrl,
            status: statusCode,
            payload: payloadString,
            response: responseText,
          }
        });
        
        webhookLogId = newLog.id;
      } catch (dbLogError) {
        console.error("[CONFIRM API] Database Log Error:", dbLogError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Transaction marked as PAID",
      webhookLogId: webhookLogId,
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