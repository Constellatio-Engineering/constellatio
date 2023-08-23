/* eslint-disable import/no-unused-modules */
import type { Database } from "@/lib/database.types";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest, NextMiddleware } from "next/server";

export const middleware: NextMiddleware = async (req: NextRequest) =>
{
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if(session?.user)
  {
    const { data, error } = await supabase.auth.getUser();

    if(!data.user?.confirmed_at)
    {
      const redirectUrl = req.nextUrl.clone();

      redirectUrl.pathname = "/confirm";
      redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);

      return NextResponse.redirect(redirectUrl);
    }

    return res;
  }

  const redirectUrl = req.nextUrl.clone();

  redirectUrl.pathname = "/login";
  redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);

  return NextResponse.redirect(redirectUrl);
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - login (login route)
     * - register (registration route)
     * - confirm (email confirmation route)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - extension (Caisy UI extension)
     * - test (test route)
     */
    "/((?!api|login|register|confirm|_next/static|_next/image|favicon.*|extension|test).*)",
  ],
};
