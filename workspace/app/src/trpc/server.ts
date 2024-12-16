
import { supabaseServerClient } from "@/lib/appRouterSpecific/supabase/server";

import type { AppRouter } from "@constellatio/api";
import { createCaller, createTRPCContext } from "@constellatio/api/appRouterSpecific/index";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */

const createContext = cache(async () => 
{
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  const supabase = supabaseServerClient();

  return createTRPCContext({
    headers: heads,
    supabase,
  });
});

const getQueryClient = cache(createQueryClient);

export const caller = createCaller(createContext);

export const { HydrateClient, trpc: api } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
