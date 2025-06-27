import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')?.value;

  if (!authToken) {
    // If the user is not authenticated, redirect them to the login page.
    // We can also add a `from` parameter to redirect them back after login.
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" in Next.js documentation for more details.
export const config = {
  matcher: ['/competition/vote', '/dashboard/:path*'],
};
