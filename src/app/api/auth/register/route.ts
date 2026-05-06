import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg'; 
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { businessName, email, password, walletAddress } = body;

        if (!businessName || !email || !password || !walletAddress) {
            return NextResponse.json(
                { error : "Missing required fields" },
                { status: 400 }
            );
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        if (!passwordRegex.test(password)) {
            return NextResponse.json(
                { error: "Password does not meet security requirements" },
                { status: 400 }
            );
        }

        const connectionString = process.env.DATABASE_URL;
        
        if (!connectionString) {
            return NextResponse.json(
                { error: "Server Configuration Error" },
                { status: 500 }
            );
        }

        const pool = new Pool({ connectionString });
        const adapter = new PrismaPg(pool);
        const prisma = new PrismaClient({ adapter });

        const existingMerchant = await prisma.merchant.findFirst({
            where: {
                OR: [
                    {email: email},
                    {walletAddress: walletAddress}
                ]
            }
        });

        if (existingMerchant) {
            await prisma.$disconnect(); 
            return NextResponse.json(
                { error: "Merchant with this email or wallet address already exists" },
                { status: 409 }
            );
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newMerchant = await prisma.merchant.create({
            data: {
                businessName,
                email,
                walletAddress,
                password: hashedPassword
            }
        });

        await prisma.$disconnect();

        return NextResponse.json(
            {
                message: "Merchant registered successfully",
                data: {
                    merchantId: newMerchant.id,
                    businessName: newMerchant.businessName,
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