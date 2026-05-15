import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { PublicKey } from "@solana/web3.js";
import { sign } from "tweetnacl";
import bs58 from "bs58";
import prisma from "@/lib/neon";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { publicKey, signature, message } = await req.json();
    const signatureUint8 = bs58.decode(signature);
    const messageUint8 = new TextEncoder().encode(message);
    const pubKeyUint8 = bs58.decode(publicKey);
    const isValid = sign.detached.verify(messageUint8, signatureUint8, pubKeyUint8);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 });
    }

    let merchant = await prisma.merchant.findUnique({
      where: { walletAddress: publicKey }
    });

    if (!merchant) {
      merchant = await prisma.merchant.create({
        data: {
          walletAddress: publicKey,
          businessName: `Merchant ${publicKey.slice(0, 4)}`,
          email: `${publicKey.slice(0, 8)}@wallet.auth`,
          password: "WALLET_AUTH_NO_PASSWORD",
          apiKey: `tl_live_${crypto.randomBytes(32).toString('hex')}`,
        }
      });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ merchantId: merchant.id, wallet: publicKey })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    (await cookies()).set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return NextResponse.json({ success: true, merchantId: merchant.id });

  } catch (error) {
    return NextResponse.json(
        { error: "Authentication failed" },
        { status: 500 });
  }
}