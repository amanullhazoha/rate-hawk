import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const access_token: string | undefined =
    request.cookies.get("access_token")?.value;

  const user: any = access_token && jwtDecode(access_token);

  const adminRoutes = [
    "/admin/dashboard",
    "/admin/user",
    "/admin/order",
    "/admin/order-info",
    "/admin/transaction-history",
  ];

  const publicRoutes = [
    "/login",
    "/signup",
    "/admin/login",
    "/forget-password",
    "/reset-password",
  ];

  const userRoutes = [
    "/reserve/",
    "/profile",
    "/save-list",
    "/my-booking",
    "/change-password",
  ];

  const path = request?.nextUrl?.pathname;

  const isUserRoute = userRoutes.some((route) => path.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  const isAdmin = user && user?.role === "admin" ? true : false;

  if (!user && (isUserRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (user && !isAdmin && isAdminRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
  //matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
