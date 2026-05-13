// src/app/api/merchant/webhook/logs/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/neon";
import { getCurrentMerchant } from "@/lib/auth-service";

export async function GET() {
    try {
        const merchant = await getCurrentMerchant();
        if (!merchant) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401}
            );
        }

        const logs = await prisma.webhookLog.findMany({
            where: { merchantId: merchant.id },
            orderBy: { createdAt: "desc" },
            take: 50
        });

        return NextResponse.json(
            { success: true, data: logs},
            { status: 200 }
        );
    
    } catch (error) {
        console.error("Fetch Webhook Logs Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}