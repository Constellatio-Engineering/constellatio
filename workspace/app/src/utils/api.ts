/* eslint-disable import/no-unused-modules */
import { env } from "@constellatio/env";

/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
// import { supabase } from "@/lib/supabase";
import { type ClientError } from "@constellatio/utils";
import { showErrorNotification, authPaths, getIsPathAppPath } from "@constellatio/utils";
import { QueryCache } from "@tanstack/react-query";
import type { TRPCLink } from "@trpc/client";
import { httpBatchLink, httpLink, loggerLink, TRPCClientError } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { supabase } from "@/lib/supabase";
import { type AppRouter } from "@/server/api/root";

const getBaseUrl = (): string =>
{
  // browser should use relative url
  if(typeof window !== "undefined")
  {
    return ""; 
  }

  // SSR should use Vercel url
  if(process.env.VERCEL_URL)
  {
    return `https://${process.env.VERCEL_URL}`; 
  }

  // dev SSR should use localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}; 

/** A set of type-safe react-query hooks for your tRPC API. */
export const api = createTRPCNext<AppRouter>({
  config: () =>
  {
    const links: Array<TRPCLink<AppRouter>> = [];

    if(env.NEXT_PUBLIC_IS_REQUEST_BATCHING_DISABLED && env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "production")
    {
      console.warn("Warning: Request batching is disabled. This is only intended for development. Set NEXT_PUBLIC_IS_REQUEST_BATCHING_DISABLED to 'false' to enable it.");

      links.push(httpLink({
        transformer: superjson,
        url: `${getBaseUrl()}/api/trpc`,
      }));
    }
    else
    {
      links.push(httpBatchLink({
        transformer: superjson,
        url: `${getBaseUrl()}/api/trpc`,
      }));
    }

    links.push(loggerLink({
      enabled: (opts) => env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "development" || (opts.direction === "down" && opts.result instanceof Error),
    }));

    return ({
      links,
      queryClientConfig: {
        defaultOptions: {
          mutations: {
            onError: (err, variables, context) =>
            {
              console.log("Something went wrong with a mutation: ", { context, err, variables });

              showErrorNotification({
                message: "Bitte versuche es später erneut oder wende dich an den Support.",
                title: "Da ist leider etwas schiefgelaufen.",
              });
            }
          }
        },
        queryCache: new QueryCache({
          onError: async (err) =>
          {
            if(!(err instanceof TRPCClientError))
            {
              console.error("QueryCache error: ", err);
              return;
            }

            const clientError = err.data.clientError as ClientError;

            if(!clientError)
            {
              console.warn("'clientError' not found in server response. Error was TRPCClientError: ", err);
              return;
            }

            if(clientError.identifier === "unauthorized")
            {
              await supabase.auth.signOut();

              if(getIsPathAppPath(window.location.pathname))
              {
                console.log("Server responded with 'UNAUTHORIZED'. Redirecting to Login");
                window.location.replace(authPaths.login);
              }

              return;
            }
          },
        }),
      },
    });
  },
  ssr: false,
  transformer: superjson,
});

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
