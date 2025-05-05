import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Get token from header
  const token = request.headers.get('authorization')?.split(' ')[1];

  // Check if path is protected
  const isProtectedPath = 
    request.nextUrl.pathname.startsWith('/api/user') ||
    request.nextUrl.pathname.startsWith('/api/admin');

  // Check if admin path
  const isAdminPath = request.nextUrl.pathname.startsWith('/api/admin');

  if (isProtectedPath) {
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      const user = await verifyToken(token);
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        );
      }

      // Check admin access
      if (isAdminPath && user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        );
      }

      // Add user to request headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('user', JSON.stringify(user));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}
