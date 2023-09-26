/* eslint-disable import/no-unused-modules */
import { getIsUserLoggedIn } from "@/utils/auth";

import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (req) =>
{
  console.log("--- Middleware ---");

  console.log("req.url", req.url);
  console.log("req.nextUrl", req.nextUrl.pathname);

  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });

  const isUserLoggedIn = await getIsUserLoggedIn(supabase);

  if(!isUserLoggedIn)
  {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    console.log("User is not logged in. Redirecting to: ", redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  }

  const { data: { user }, error: getUserError } = await supabase.auth.getUser();

  if(getUserError)
  {
    console.log("Error getting user. Do nothing for now", getUserError);
    return res;
  }

  if(!user)
  {
    console.log("User was null. This should not happen. Do nothing for now");
    return res;
  }

  if(!user.confirmed_at)
  {
    // In this case this happens, we should send an additional confirmation email and redirect to an explanation page
    console.warn("User is not confirmed. This should not happen. User: ", user);
  }

  console.log("User is logged in. Do nothing.");
  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - login (login route)
     * - register (registration route)
     * - recover (recover password route)
     * - confirm (email confirmation route)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.* (favicon files)
     * - extension (Caisy UI extension)
     *
     * CAUTION: This does not work for the root path ("/")!
     */
    "/((?!api|login|register|confirm|recover|_next/static|_next/image|favicon.*|extension).*)",
  ],
};
