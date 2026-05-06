import { NextResponse } from "next/server";
import prisma from "@/lib/neon";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { businessName, email, walletAddress } = body;

        if (!businessName || !email || !walletAddress) {
            return NextResponse.json(
                { error : "Missing required fields" },
                { status: 400 }
            );
        }

        const existingMerchant = await prisma.merchant.findFirst({
            where: {
                OR: [
                    {email: email},
                    {walletAddress: walletAddress}
                ]
            }
        });

        if (existingMerchant) {
            return NextResponse.json(
                { error: "Merchant with this email or wallet address already exists" },
                { status: 409 }
            );
        }

        const newMerchant = await prisma.merchant.create({
            data: {
                businessName,
                email,
                walletAddress
            }
        });

        return NextResponse.json(
            {
                message: "Merchant registered successfully",
                data: {
                    merchantId: newMerchant.id,
                    businessName: newMerchant.businessName,
                    apiKey: newMerchant.apiKey
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error registering merchant:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}