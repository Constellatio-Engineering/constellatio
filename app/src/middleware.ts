/* eslint-disable import/no-unused-modules */
import * as schema from "@/db/schema";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { getIsUserLoggedInServer } from "@/utils/auth";
import { appPaths, authPaths } from "@/utils/paths";
import { queryParams } from "@/utils/query-params";
import { getHasSubscription } from "@/utils/subscription";

import { neonConfig, Pool } from "@neondatabase/serverless";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { eq } from "drizzle-orm";
import { drizzle as drizzleServerless } from "drizzle-orm/neon-serverless";
import { type NextMiddleware, NextResponse } from "next/server";

if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "development")
{
  neonConfig.wsProxy = (host) => `${host}:54330/v1`;
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

// NOTE: As per the docs, you must not reuse the same pool for multiple requests, so we need to create a new one for each request in a serverless/edge function.
// Don't forget to call pool.end() when you're done with the pool.

export const middleware: NextMiddleware = async (req, ctx) =>
{
  const res = NextResponse.next();
  const redirectUrl = req.nextUrl.clone();
  const supabase = createMiddlewareClient({ req, res });
  const getIsUserLoggedInResult = await getIsUserLoggedInServer(supabase);

  if(!getIsUserLoggedInResult.isUserLoggedIn)
  {
    redirectUrl.pathname = authPaths.login;
    redirectUrl.searchParams.set(queryParams.redirectedFrom, req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(redirectUrl);
  }

  const pool = new Pool({ connectionString: env.DATABASE_URL_SERVERLESS });
  const db = drizzleServerless(pool, { schema });

  const user = await db.query.users.findFirst({
    columns: { subscriptionStatus: true },
    where: eq(users.id, getIsUserLoggedInResult.user.id)
  });

  ctx.waitUntil(pool.end());

  if(!user)
  {
    await supabase.auth.signOut();
    redirectUrl.pathname = authPaths.login;
    return NextResponse.redirect(redirectUrl);
  }

  const hasSubscription = getHasSubscription(user.subscriptionStatus);

  if(!hasSubscription)
  {
    if(redirectUrl.pathname.startsWith(appPaths.profile) && redirectUrl.searchParams.get("tab") === "subscription")
    {
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
     * - finish-signup (finish signup route)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.* (favicon files)
     * - extension (Caisy UI extension)
     *
     * CAUTION: This does not work for the root path ("/")!
     */
    "/((?!api|login|register|confirm|finish-signup|recover|static|.*\\..*|_next|extension|tests).*)",
  ],
};
