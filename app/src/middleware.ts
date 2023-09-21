/* eslint-disable import/no-unused-modules */
import type { Database } from "@/lib/database.types";

import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest, NextMiddleware } from "next/server";

export const middleware: NextMiddleware = async (req: NextRequest) =>
{
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });
  const { data: { session }, error: getSessionError } = await supabase.auth.getSession();
  const { data: { user }, error: getUserError } = await supabase.auth.getUser();
  let didErrorOccur = false;

  if(getSessionError)
  {
    console.warn("Error getting session", getSessionError);
    didErrorOccur = true;
  }

  if(getUserError)
  {
    console.warn("Error getting user", getUserError);
    didErrorOccur = true;
  }

  if(didErrorOccur || !session?.user)
  {
    console.log("User is not logged in, redirecting to login");

    const redirectUrl = req.nextUrl.clone();

    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);

    return NextResponse.redirect(redirectUrl);
  }

  if(!user?.confirmed_at)
  {
    console.log("User is not confirmed, redirecting to confirm");

    const redirectUrl = req.nextUrl.clone();

    redirectUrl.pathname = "/confirm";
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);

    return NextResponse.redirect(redirectUrl);
  }

  return res;
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
