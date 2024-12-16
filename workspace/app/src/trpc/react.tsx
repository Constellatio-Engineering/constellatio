"use client";

import type { AppRouter } from "@constellatio/api";
import { env } from "@constellatio/env";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
// TODO: QUESTION @Kotti: is this correct or what you prefer?
import { SuperJSON as SuperJsonTransformer } from "superjson";

const createQueryClient = () => new QueryClient();

let clientQueryClientSingleton: QueryClient | undefined;
const getQueryClient = () => 
{
  if(typeof window === "undefined") 
  {
    // Server: always make a new query client
    return createQueryClient();
  }
  else 
  {
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= createQueryClient());
  }
};

export const api = createTRPCReact<AppRouter>();

const getBaseUrl = () => 
{
  if(typeof window !== "undefined") { return window.location.origin; }
  if(env.VERCEL_URL) { return `https://${env.VERCEL_URL}`; }
  // eslint-disable-next-line no-restricted-properties
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export function TRPCReactProvider(props: { readonly children: React.ReactNode }) 
{
  const queryClient = getQueryClient();

  // eslint-disable-next-line react/hook-use-state
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          headers() 
          {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react"); // IDEA: hier könnte man ggf. den  playerTag mit geben falls nötig
            return headers;
          },
          transformer: SuperJsonTransformer,
          url: getBaseUrl() + "/api/trpc",
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}

