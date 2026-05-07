import { NextResponse } from "next/server";
import prisma from "@/lib/neon";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { token } = body;

        if (!token) {
            return NextResponse.json(
                { error: "Missing activation token." },
                { status: 400 }
            );
        }

        const merchant = await prisma.merchant.findUnique({
            where: { activationToken: token }
        });

        if (!merchant) {
            return NextResponse.json(
                { error: "Invalid or expired activation link." },
                { status: 400 }
            );
        }

        await prisma.merchant.update({
            where: { id: merchant.id },
            data: {
                emailVerified: true,
                activationToken: null,
            }
        });

        return NextResponse.json(
            { message: "Account activated successfully." },
            { status: 200 }
        );
    
    } catch (error) {
        console.error("Activation error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}