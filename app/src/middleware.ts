/* eslint-disable import/no-unused-modules */
import { type User } from "@/db/schema";
import { env } from "@/env.mjs";
import { getIsUserLoggedIn } from "@/utils/auth";
import { isDevelopment } from "@/utils/env";
import { paths } from "@/utils/paths";
import { queryParams } from "@/utils/query-params";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { type NextMiddleware, NextResponse } from "next/server";

type SubscriptionStatus = Pick<User, "subscriptionStatus">;

export const middleware: NextMiddleware = async (req) =>
{
  const time = new Date().toISOString();
  console.time("Middleware 1 at " + time);

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const getIsUserLoggedInResult = await getIsUserLoggedIn(supabase);

  if(!getIsUserLoggedInResult.isUserLoggedIn)
  {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set(queryParams.redirectedFrom, req.nextUrl.pathname + req.nextUrl.search);
    console.log("User is not logged in. Redirecting to: ", redirectUrl.toString());
    console.timeEnd("Middleware 1 at " + time);
    return NextResponse.redirect(redirectUrl);
  }

  console.time("Middleware 2 at " + time);

  let subscriptionStatus: SubscriptionStatus["subscriptionStatus"] | null = null;

  try
  {
    const response = await fetch((isDevelopment ? "http://localhost:3010" : env.NEXT_PUBLIC_WEBSITE_URL) + `/${paths.getSubscriptionStatus}?secret=${env.GET_SUBSCRIPTION_STATUS_SECRET}&userId=${getIsUserLoggedInResult.user.id}`);
    const data = await response.json() as Pick<User, "subscriptionStatus">;
    subscriptionStatus = data.subscriptionStatus;
  }
  catch (e: unknown)
  {
    console.log("error while fetching subscription status", e);
    return NextResponse.json({
      error: "Error while fetching subscription status",
      success: false
    }, {
      status: 500
    });
  }
  finally
  {
    console.timeEnd("Middleware 2 at " + time);
  }

  const hasSubscription = subscriptionStatus === "active" || subscriptionStatus === "trialing" || subscriptionStatus === "incomplete";

  if(!hasSubscription)
  {
    const redirectUrl = req.nextUrl.clone();

    if(redirectUrl.pathname === paths.profile && redirectUrl.searchParams.get("tab") === "subscription")
    {
      return NextResponse.next();
    }

    console.log("redirecting to subscription tab");
    redirectUrl.pathname = paths.profile;
    redirectUrl.searchParams.set("tab", "subscription");
    return NextResponse.redirect(redirectUrl);
  }

  console.timeEnd("Middleware 1 at " + time);
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
