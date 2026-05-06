import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/lib/neon";

export async function getCurrentMerchant() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    const merchantId = payload.merchantId as string;

    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
      select: { 
        id: true, 
        businessName: true, 
        email: true 
      }
    });

    return merchant;
  } catch (error) {
    return null;
  }
}