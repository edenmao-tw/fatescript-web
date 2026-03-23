import { NextRequest, NextResponse } from 'next/server';

const locales = ['zh-TW', 'en'] as const;

function getLocaleFromHost(host: string): string {
  if (host.startsWith('tw.')) return 'zh-TW';
  return 'en';
}

function stripLocalePrefix(pathname: string): string {
  for (const loc of locales) {
    if (pathname === `/${loc}`) return '/';
    if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1);
  }
  return pathname;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const locale = getLocaleFromHost(host);
  const pathname = request.nextUrl.pathname;

  const cleanPath = stripLocalePrefix(pathname);

  // If URL has a visible locale prefix, redirect to strip it
  if (cleanPath !== pathname) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = cleanPath;
    return NextResponse.redirect(redirectUrl);
  }

  // Internally rewrite to /{locale}/path for [locale] App Router routing
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
