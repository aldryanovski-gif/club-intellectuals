import { NextResponse, type NextRequest } from 'next/server';

const locales = ['en', 'sk'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin')) return;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
