/* eslint-disable import/no-unused-modules */
import { getIsUserLoggedIn } from "@/utils/auth";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { type NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (req) =>
{
  console.time("Middleware");

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { isUserLoggedIn } = await getIsUserLoggedIn(supabase);

  if(!isUserLoggedIn)
  {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    console.log("User is not logged in. Redirecting to: ", redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  }

  console.timeEnd("Middleware");
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
    "/((?!api|login|register|confirm|recover|static|.*\\..*|_next|extension|tests).*)",
  ],
};
