import { NextRequest, NextResponse } from "next/server";
import { LEADS_SESSION_COOKIE, isValidLeadsSessionToken } from "@/lib/leads/auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/leads/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(LEADS_SESSION_COOKIE)?.value;
  const authed = await isValidLeadsSessionToken(token);

  if (!authed) {
    const loginUrl = new URL("/leads/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/leads/:path*"],
};
