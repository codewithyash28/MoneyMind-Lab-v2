import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';

/**
 * Custom proxy for session management.
 * In this Next.js environment, middleware.ts is deprecated.
 * This proxy handles authentication checks for protected routes.
 */
export async function proxy(req: NextRequest) {
  const sessionToken = req.cookies.get('session')?.value;
  const path = req.nextUrl.pathname;

  // Paths that require authentication
  const protectedPaths = ['/chat', '/scenarios', '/games', '/profile'];
  const isProtected = protectedPaths.some(p => path.startsWith(p));

  if (isProtected) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const session = await verifySession(sessionToken);
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}
