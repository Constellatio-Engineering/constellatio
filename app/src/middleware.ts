/* eslint-disable import/no-unused-modules */
import { getIsUserLoggedIn } from "@/utils/auth";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { type NextMiddleware, NextResponse } from "next/server";

const downloadDocuemtPath = "/api/documents/download";

export const middleware: NextMiddleware = async (req) =>
{
  console.log("Middleware", req.nextUrl.pathname);
  console.time("Middleware");

  const res = NextResponse.next();

  console.time("Creating supabase client");
  const supabase = createMiddlewareClient({ req, res });
  console.timeEnd("Creating supabase client");

  console.time("Checking if user is logged in");
  const isUserLoggedIn = await getIsUserLoggedIn(supabase);
  console.timeEnd("Checking if user is logged in");

  console.time("Getting user");
  const { data: { user }, error: getUserError } = await supabase.auth.getUser();
  console.timeEnd("Getting user");

  if(req.nextUrl.pathname === downloadDocuemtPath)
  {
    console.log("is download document path");
  }

  if(!isUserLoggedIn || getUserError)
  {
    if(getUserError)
    {
      console.log("User seems to be logged in but there was an error getting the user. Logging out user.", getUserError);
      await supabase.auth.signOut();
    }
    else
    {
      console.log("User is not logged in.");
    }

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    console.log("Redirecting to: ", redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  }

  if(!user)
  {
    console.log("User is logged in but was null. This should not happen but doing nothing for now. This should be investigated.");
    return NextResponse.next();
  }

  if(!user.confirmed_at)
  {
    // In this case this happens, we should send an additional confirmation email and redirect to an explanation page
    console.warn("User is not confirmed. This should not happen. User: ", user);
  }

  console.timeEnd("Middleware");

  console.log("User " + user.id);

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
