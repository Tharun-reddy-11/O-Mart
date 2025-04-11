import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublic = ['/login', '/signup'].includes(path)
  const token = request.cookies.get('next-auth.session-token')?.value

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if (isPublic && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
}

export const config = {
  matcher: ['/', '/profile', '/cart', '/orders', '/login', '/signup']
}