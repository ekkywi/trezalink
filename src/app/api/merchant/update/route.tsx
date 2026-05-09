// app/api/merchant/update/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/neon";
import { getCurrentMerchant } from "@/lib/auth-service";

export async function POST(req: Request) {
  try {
    const merchant = await getCurrentMerchant();
    if (!merchant) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { webhookUrl, businessName } = await req.json();

    const updated = await prisma.merchant.update({
      where: { id: merchant.id },
      data: { 
        webhookUrl: webhookUrl || undefined,
        businessName: businessName || undefined 
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}