import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const access_token: string | undefined =
    request.cookies.get("access_token")?.value;

  const user: any = access_token && jwtDecode(access_token);

  const publicRoutes = ["/login", "/forgot-password"];

  const path = request?.nextUrl?.pathname;

  const isPublicRoute = publicRoutes.includes(path);
  const isAdmin = user && user?.role === "admin" ? true : false;

  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
