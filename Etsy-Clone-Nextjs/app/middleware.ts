// middleware.ts or middleware.js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/seller", "/profile/:path*", "/cart", "/favorites"],
};

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");

  if (!authToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
