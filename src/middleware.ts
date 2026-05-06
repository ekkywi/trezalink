import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Tentukan kategori rute
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isDashboardPage = pathname.startsWith('/dashboard');

  // Kunci rahasia untuk verifikasi
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "rahasia-super-kuat-123");

  // Kasus A: User memiliki token
  if (token) {
    try {
      // Verifikasi tokennya
      await jwtVerify(token, secret);

      // Jika token VALID dan user mencoba buka halaman Login/Register
      if (isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      
      // Jika token VALID dan user ke dashboard, izinkan lewat
      return NextResponse.next();
      
    } catch (err) {
      // Jika token EXPIRED atau PALSU
      if (isDashboardPage) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('auth-token'); // Bersihkan cookie sampah
        return response;
      }
    }
  }

  // Kasus B: User TIDAK memiliki token
  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Tambahkan '/login' dan '/register' ke dalam matcher
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};