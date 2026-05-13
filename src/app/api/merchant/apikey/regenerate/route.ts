import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/neon";
import { getCurrentMerchant } from "@/lib/auth-service";

export async function POST() {
    try {
        const merchant = await getCurrentMerchant();
        
        if (!merchant) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const newApiKey = `tl_live_${crypto.randomBytes(32).toString('hex')}`;

        await prisma.merchant.update({
            where: { id: merchant.id },
            data: { apiKey: newApiKey }
        });

        return NextResponse.json({
            success: true,
            message: "API key regenerated successfully",
            apiKey: newApiKey
        }, { status: 200 });
    
    } catch (error) {
        console.error("Api Key regeneration error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}