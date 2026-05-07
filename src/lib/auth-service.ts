import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/lib/neon";

export async function getCurrentMerchant() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    const { payload } = await jwtVerify(token, secret);

    const liveMerchant = await prisma.merchant.findUnique({
      where: { id: payload.merchantId as string }
    });

    return liveMerchant;
    
  } catch (error) {
    console.error("Error getting current merchant:", error);
    return null;
  }
}