/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import { type AppRouter } from "@/server/api/root";
import { supabase } from "@/supabase/client";
import { type ClientError } from "@/utils/clientError";

import { QueryCache } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

const getBaseUrl = (): string =>
{
  // browser should use relative url
  if(typeof window !== "undefined")
  {
    return ""; 
  }

  // SSR should use vercel url
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
    return {
      links: [
        /* loggerLink({
          enabled: (opts) => process.env.NODE_ENV === "development" || (opts.direction === "down" && opts.result instanceof Error),
        }),*/
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      queryClientConfig: {
        queryCache: new QueryCache({
          onError: (err) =>
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
              console.log("Server responded with 'UNAUTHORIZED'. Redirecting to login");
              // window.location.replace("/login");
              // void supabase.auth.signOut();
              return;
            }
          },
        }),
      },
      transformer: superjson,
    };
  },
  ssr: false,
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
