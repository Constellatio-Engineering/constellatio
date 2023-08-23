/* eslint-disable import/no-unused-modules */
import type { Database } from "@/lib/database.types";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest, NextMiddleware } from "next/server";

export const middleware: NextMiddleware = async (req: NextRequest) =>
{
  console.log("--- middleware ---");

  const res = NextResponse.next();

  console.log("createMiddlewareClient");

  const supabase = createMiddlewareClient<Database>({ req, res }, {
    supabaseUrl: "http://host.docker.internal:54321"
  });

  console.log("supabase client created");

  try
  {
    console.log("try to get session");

    const sessionData = await supabase.auth.getSession();

    if(sessionData.error)
    {
      throw sessionData.error;
    }

    console.log("got sessionData", JSON.stringify(sessionData, null, 2));

  }
  catch (e: any)
  {
    console.log("eeror while getting session", e);
  }

  try
  {
    console.log("try to get userData");

    const userData = await supabase.auth.getUser();

    if(userData.error)
    {
      throw userData.error;
    }

    console.log("got userData", JSON.stringify(userData, null, 2));
  }
  catch (e: any)
  {
    console.log("eeror while getting userData", e);
  }

  return res;

  /* if(session?.user)
  {
    const { data, error } = await supabase.auth.getUser();

    console.log(data);

    /!* if(!data.user?.confirmed_at)
    {
      const redirectUrl = req.nextUrl.clone();

      redirectUrl.pathname = "/confirm";
      redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);

      return NextResponse.redirect(redirectUrl);
    }*!/

    return res;
  }*/

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
     */
    "/((?!api|login|register|confirm|_next/static|_next/image|favicon.*|extension).*)",
  ],
};
