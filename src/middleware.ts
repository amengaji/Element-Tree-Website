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

  // If MFA not configured → force setup
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/mfa")) {
    const secret = process.env.ADMIN_TOTP_SECRET;
    if (!secret || secret.trim().length < 16) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/mfa/setup";
      return NextResponse.redirect(url);
    }
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
