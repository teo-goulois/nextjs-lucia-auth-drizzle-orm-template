import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getSessionForMiddleware } from "./lib/auth/utils";

const AuthRoutes = "/auth";
const ProtectedRoutes = ["/protected"];

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const sessionId = cookies().get("auth_session")?.value ?? null;
  const { user } = await getSessionForMiddleware(sessionId);

  const isAuthRoute = nextUrl.pathname.startsWith(AuthRoutes);
  const isProtectedRoute = ProtectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (user && isAuthRoute) {
    const url = new URL("/protected", nextUrl.origin);
    return NextResponse.redirect(url);
  }

  if (!user && isProtectedRoute) {
    const url = new URL("/auth/login", nextUrl.origin);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
