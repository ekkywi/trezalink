// src/app/api/internal/confirm/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/neon";

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
    
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Di level enterprise, Anda bisa menambahkan header verifikasi seperti:
            // "X-Trezalink-Signature": "hash_rahasia_untuk_keamanan"
          },
          body: JSON.stringify({
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
          }),
        });
        console.log(`Webhook sukses ditembak ke: ${webhookUrl}`);
      } catch (webhookError) {
        // Jika server merchant sedang down, kita cukup catat error-nya
        // Transaksi di Kirupay tetap dianggap sukses.
        console.error(`Gagal mengirim webhook ke ${webhookUrl}:`, webhookError);
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