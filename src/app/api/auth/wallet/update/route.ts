// src/app/api/merchant/wallet/update/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import nacl from "tweetnacl";
import bs58 from "bs58";
import prisma from "@/lib/neon";

export async function POST(req: Request) {
    try {
        // 1. Verifikasi Sesi JWT
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "rahasia-super-kuat-123");
        const { payload } = await jwtVerify(token, secret);
        const merchantId = payload.merchantId as string;

        // 2. Ambil data request
        const { action, publicKey, signature, message } = await req.json();

        if (action === "link") {
            if (!publicKey || !signature || !message) {
                return NextResponse.json({ error: "Missing cryptographic proofs" }, { status: 400 });
            }

            // Verifikasi Signature Web3
            const messageUint8 = new TextEncoder().encode(message);
            const signatureUint8 = bs58.decode(signature);
            const publicKeyUint8 = bs58.decode(publicKey);

            const isValid = nacl.sign.detached.verify(messageUint8, signatureUint8, publicKeyUint8);

            if (!isValid) {
                return NextResponse.json({ error: "Invalid signature. Authentication failed." }, { status: 401 });
            }

            // Cek apakah wallet ini sudah dipakai akun lain
            const existingWallet = await prisma.merchant.findUnique({
                where: { walletAddress: publicKey }
            });

            if (existingWallet && existingWallet.id !== merchantId) {
                return NextResponse.json({ error: "This wallet is already linked to another merchant account." }, { status: 409 });
            }

            // Update Database
            await prisma.merchant.update({
                where: { id: merchantId },
                data: { walletAddress: publicKey }
            });

            return NextResponse.json({ message: "Wallet linked successfully", walletAddress: publicKey }, { status: 200 });
        }

        if (action === "unlink") {
            // Karena skema kita mengharuskan walletAddress unik dan bukan null,
            // kita kembalikan ke format "pending" yang unik.
            const placeholderWallet = `pending_${Date.now()}_unlinked`;

            await prisma.merchant.update({
                where: { id: merchantId },
                data: { walletAddress: placeholderWallet }
            });

            return NextResponse.json({ message: "Wallet unlinked successfully", walletAddress: placeholderWallet }, { status: 200 });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });

    } catch (error) {
        console.error("Wallet update error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}