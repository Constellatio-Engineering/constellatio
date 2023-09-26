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
  const user = session?.user;

  if(getSessionError || !user)
  {
    if(getSessionError)
    {
      console.warn("Error getting session, redirecting to login", getSessionError);
    }
    else
    {
      console.log("User is not logged in, redirecting to login. Session: ", session);
    }

    const redirectUrl = req.nextUrl.clone();

    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);

    return NextResponse.redirect(redirectUrl);
  }

  if(!user.confirmed_at)
  {
    // In this case this happens, we should send an additional confirmation email and redirect to an explanation page

    console.log("User is not confirmed, this should not happen");

    const { data, error } = await supabase.auth.getUser();

    if(error)
    {
      console.log("Error getting user", error);
    }

    console.warn("User is not confirmed. This should not happen. User: ", user, data.user);
  }

  return res;
};

export const config = {
  matcher: [
    "/", // Match the index route
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
     */
    "/((?!api|login|register|confirm|_next/static|_next/image|favicon.*|extension).*)",
  ],
};
