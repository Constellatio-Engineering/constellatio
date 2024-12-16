import { env } from "@constellatio/env";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// import { CLAN_SEARCH_FILTER } from "@acme/constants";
// import { clanTagValidator } from "@acme/validators";

// import { api, caller } from "~/trpc/server";

export async function updateSession(request: NextRequest) 
{
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() 
        {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) 
        {
          cookiesToSet.forEach(({ name, options, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, options, value }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // ROUTE CLASSIFICATION
  const protectedRoutes = [
    "",
    "",
    "",
  ];

  const authRoutes = ["/sign-in", "/sign-up"];

  const { headers, nextUrl } = request;

  // ROUTE VALIDATION
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  // const isProtectedClanRoute = () => {
  //   const expArr = /^\/clans\/([^/]+)\/([^/]+)/.exec(request.nextUrl.pathname);
  //   if (expArr) {
  //     return {
  //       isClanTagProtectedSubRoute: true,
  //       clanTag: expArr[1],
  //       subRoute: expArr[2],
  //     };
  //   } else {
  //     return {
  //       isClanTagProtectedSubRoute: false,
  //     };
  //   }
  // };

  // const { clanTag, isClanTagProtectedSubRoute, subRoute } =
  //   isProtectedClanRoute();

  const isAuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  // ROUTE DEFINITIONS
  if(isAuthRoute && user) 
  {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // FIXME: protected should all sub routes of clans and players
  if(isProtectedRoute) 
  {
    console.log(" 4 isProtected )---------------------->");
    if(!user) 
    {
      console.log(" 5 !user )---------------------->");
      // SONDERFÄLLE
      // GLaub das ist nicht gut (man könnte also von de sign up page eifnach mal auf ne protected route drauf?)
      if(!headers.get("referer")?.endsWith("/sign-up")) 
      {
        const newUrl = nextUrl.clone();
        newUrl.pathname = "/sign-in";
        newUrl.search = `?callbackUrl=${encodeURIComponent(nextUrl.pathname + nextUrl.search)}`;
        return NextResponse.redirect(newUrl);
      }
    }
    // if (user) {
    //   console.log(" 6 user :O )---------------------->");
    //   // Check if the URL contains 'clans/{tag}/'
    //   if (isClanTagProtectedSubRoute && clanTag) {
    //     //CLAN PROTECTION PAGES

    //     try {
    //       // Validate the tag format using Zod
    //       const validationResult =
    //         await clanTagValidator.safeParseAsync(clanTag);

    //       console.log("validationResult");
    //       console.log(validationResult);

    //       if (!validationResult.success) {
    //         console.log("IMPOSSIBLE TAG (incorrect format)");

    //         // If the tag doesn't match the expected format, redirect to an error page
    //         return NextResponse.redirect(new URL("/invalid-tag", request.url));
    //       }

    //       if (subRoute === "search-filters") {
    //         // const result =
    //         // await api.player.validateUserHasReadAccessThroughPlayers({
    //         //   action: "READ",
    //         //   clanTag: clanTag,
    //         //   modelX: CLAN_SEARCH_FILTER,
    //         // });
    //         //NEW
    //         //const test = await api.about.getUserData();
    //         //            console.log(test);
    //         // if (!result) {
    //         //   return NextResponse.redirect(
    //         //     new URL("/you-are-not-permitted-in-this-clan", request.url),
    //         //   );
    //         // }
    //       }
    //     } catch (error) {
    //       console.error("Error in middleware:", error);
    //       return NextResponse.redirect(new URL("/error", request.url));
    //     }
    //   }
    // }
    // api routes sollten grundsätzlich auch alel gesperrt werden
    // ausnahme müssen die signup endpunkte bleiben (minimal auth schutz)
    // ausnahme im fall von referer
    // ausnahme 2 wäre wenn ich signin auch auf server side ziehe.
    // und ggf. wegen callback url bei oauth?
  }

  // // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // // creating a new response object with NextResponse.next() make sure to:
  // // 1. Pass the request in it, like so:
  // //    const myNewResponse = NextResponse.next({ request })
  // // 2. Copy over the cookies, like so:
  // //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // // 3. Change the myNewResponse object to fit your needs, but avoid changing
  // //    the cookies!
  // // 4. Finally:
  // //    return myNewResponse
  // // If this is not done, you may be causing the browser and server to go out
  // // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
