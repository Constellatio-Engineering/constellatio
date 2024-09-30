/* eslint-disable import/no-unused-modules */
import { type User } from "@/db/schema";
import { env } from "@/env.mjs";
import { getIsUserLoggedInServer } from "@/utils/auth";
import { isDevelopment } from "@/utils/env";
import { apiPaths, appPaths, authPaths } from "@/utils/paths";
import { queryParams } from "@/utils/query-params";
import { getHasSubscription } from "@/utils/subscription";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { type NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (req) =>
{
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const getIsUserLoggedInResult = await getIsUserLoggedInServer(supabase);

  if(!getIsUserLoggedInResult.isUserLoggedIn)
  {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = authPaths.login;
    redirectUrl.searchParams.set(queryParams.redirectedFrom, req.nextUrl.pathname + req.nextUrl.search);
    console.info("User is not logged in. Redirecting to: ", redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  }

  let subscriptionStatus: Pick<User, "subscriptionStatus">["subscriptionStatus"] | null = null;

  try
  {
    const response = await fetch((isDevelopment ? "http://localhost:3010" : env.NEXT_PUBLIC_WEBSITE_URL) + `/${apiPaths.getSubscriptionStatus}?secret=${env.GET_SUBSCRIPTION_STATUS_SECRET}&userId=${getIsUserLoggedInResult.user.id}`);
    subscriptionStatus = (await response.json() as Pick<User, "subscriptionStatus">).subscriptionStatus;
  }
  catch (e: unknown)
  {
    console.error("error while fetching subscription status", e);
    return NextResponse.json({
      error: "Error while fetching subscription status",
      success: false
    }, {
      status: 500
    });
  }

  const hasSubscription = getHasSubscription(subscriptionStatus);

  if(!hasSubscription)
  {
    console.info("User does not have a subscription. Redirecting to subscription tab", subscriptionStatus);

    const redirectUrl = req.nextUrl.clone();

    if(redirectUrl.pathname.startsWith(appPaths.profile) && redirectUrl.searchParams.get("tab") === "subscription")
    {
      console.log("User is already on subscription tab. Not redirecting.");
      return NextResponse.next();
    }

    redirectUrl.pathname = appPaths.profile;
    redirectUrl.searchParams.set("tab", "subscription");
    return NextResponse.redirect(redirectUrl);
  }

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
