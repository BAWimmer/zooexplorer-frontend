import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  // Get the pathname from the URL
  const path = request.nextUrl.pathname;
  
  // Check for authentication token with a secret
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  // Define which routes need protection
  const isAuthRoute = path.startsWith('/profile') || path.startsWith('/admin');
  const isAdminRoute = path.startsWith('/admin');
  const isApiAdminRoute = path.startsWith('/api/admin') || 
                         (path.startsWith('/api/animals') && 
                          (request.method === 'POST' || 
                           request.method === 'PUT' || 
                           request.method === 'DELETE'));

  // For API routes that require admin access
  if (isApiAdminRoute) {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (token.role !== 'Admin') {
      return new NextResponse(
        JSON.stringify({ error: 'Forbidden: Admin access required' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // Redirect unauthenticated users trying to access protected routes
  if (isAuthRoute && !token) {
    // Remember the page they tried to visit for post-login redirect
    const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
    return NextResponse.redirect(new URL(`/signin?callbackUrl=${callbackUrl}`, request.url));
  }

  // Restrict admin routes to admin users only
  if (isAdminRoute && token?.role !== 'Admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Define which routes this middleware applies to
export const config = {
  matcher: [
    '/profile/:path*', 
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/animals/:path*'
  ]
};