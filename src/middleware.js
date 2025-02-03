import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken');

  const publicRoutes = ['/login'];

  if (!publicRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (publicRoutes.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL('/product/save/1', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',                
    '/product/:path*',  
    '/category/:path*',
    '/login',
  ],
};