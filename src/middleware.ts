import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Allow MFA setup page BEFORE login
  if (pathname.startsWith("/admin/mfa/setup")) {
    return NextResponse.next();
  }

  // Protect everything else under /admin
  if (pathname.startsWith("/admin")) {
    const session = req.cookies.get("admin_session")?.value;
    if (session !== "active") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
