import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg'; 
import { PrismaPg } from '@prisma/adapter-pg';
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error : "Missing required fields" },
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

        const merchant = await prisma.merchant.findUnique({
            where: { email: email }
        });

        if (!merchant) {
            await prisma.$disconnect(); 
            return NextResponse.json(
                { error: "Invalid email or password" }, 
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, merchant.password);
        
        if (!isPasswordValid) {
            await prisma.$disconnect();
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({
            merchantId: merchant.id,
            email: merchant.email,
        })
            .setProtectedHeader({ alg: "HS256"})
            .setIssuedAt()
            .setExpirationTime("24h")
            .sign(secret);
        
        const cookieStore = await cookies();
        cookieStore.set("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        await prisma.$disconnect();

        return NextResponse.json(
            { 
                message: "Login successful",
                merchant: {
                    id: merchant.id,
                    businessName: merchant.businessName,
                    email: merchant.email,
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}