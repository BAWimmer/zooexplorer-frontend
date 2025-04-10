import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  // Check for authentication token
  const token = await getToken({ req: request });
  
  // Define which routes need protection
  const isAuthRoute = request.nextUrl.pathname.startsWith('/profile') || 
                     request.nextUrl.pathname.startsWith('/admin');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  // Redirect unauthenticated users trying to access protected routes
  if (isAuthRoute && !token) {
    return NextResponse.redirect(new URL('/signin', request.url));
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
  matcher: ['/profile/:path*', '/admin/:path*']
};