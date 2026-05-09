import { NextResponse } from "next/server";
import prisma from "@/lib/neon";
import { parse } from "path";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Missing or invalid Authorization header. Format: Bearer <YOUR_API_KEY>" },
                { status: 401, headers: corsHeaders }
            );
        }

        const apiKey = authHeader.split(" ")[1];
        const merchant = await prisma.merchant.findUnique({
            where: { apiKey }
        });

        if (!merchant || !merchant.isActive) {
            return NextResponse.json(
                { error: "Invalid or inactive API Key" },
                { status: 401, headers: corsHeaders }
            );
        }

        if (!merchant.walletAddress || merchant.walletAddress.includes("pending")) {
            return NextResponse.json(
                { error: "Merchant has not linked a settlement wallet yet." },
                { status: 400, headers: corsHeaders }
            );
        }

        const body = await req.json();
        const {
            orderId,
            amount,
            currency = "SOL",
            customerEmail,
            successUrl,
            cancelUrl,
        } = body;

        if (!orderId || !amount) {
            return NextResponse.json(
                { error: "Missing required fields: 'orderId' and 'amount'" },
                { status: 400, headers: corsHeaders }
            );
        }

        const existingTransaction = await prisma.transaction.findFirst({
            where: {
                merchantId: merchant.id,
                orderId: String(orderId),
            }
        });

        if (existingTransaction) {
            return NextResponse.json(
                {
                    error: "Duplicate Order ID",
                    details: `Transaction with orderID '${orderId}' already exists. Please use a unique orderId.`
                },
                { status: 409, headers: corsHeaders }
            );
        }

        const transaction = await prisma.transaction.create({
            data: {
                merchantId: merchant.id,
                orderId: String(orderId),
                amount: parseFloat(amount),
                currency: currency.toUpperCase(),
                customerEmail: customerEmail || null,
                successUrl: successUrl || null,
                cancelUrl: cancelUrl || null,
                status: "PENDING",
                createdAt: new Date(),
            },
        });

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const checkoutUrl = `${baseUrl}/pay/${transaction.id}`;

        return NextResponse.json({
            message: "Checkout session created successfully",
            transactionId: transaction.id,
            checkoutUrl: checkoutUrl,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        }, { status: 201, headers: corsHeaders });
    
    } catch (error: any) {
        console.error("Checkout API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}