import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken');

  const publicRoutes = ['/login'];
  const privateRoutes = ['/product', '/category', '/listid'];

  if (privateRoutes.some((route) => pathname.startsWith(route))) {
    if (!token)
      return NextResponse.redirect(new URL('/login', request.url));
    else
      return NextResponse.next();
  }

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    if (token)
      return NextResponse.redirect(new URL('/product', request.url));
    else
      return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/product', request.url));
}

export const config = {
  matcher: [
    '/product/:path*',
    '/category/:path*',
    '/listid/:path*',
    '/login',
    '/',
  ],
};