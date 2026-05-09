import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import crypto from "crypto";
import prisma from "@/lib/neon";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        const merchantId = payload.merchantId as string;
        const newApiKey = crypto.randomUUID();

        await prisma.merchant.update({
            where: { id: merchantId },
            data: { apiKey: newApiKey }
        });

        return NextResponse.json({
            message: "API key regenerated successfully",
            apiKey: newApiKey
        }, { status: 200 });
    
    } catch (error) {
        console.error("Api Key regeneration error:", error);
        return NextResponse.json(
            { error: "Internal Server Error"},
            { status: 500 }
        );
    }
}