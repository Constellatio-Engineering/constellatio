/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { env } from "@/env.mjs";
import { type ClientError, clientErrors } from "@/utils/clientError";
import { EmailAlreadyTakenError } from "@/utils/serverError";

import { createServerSupabaseClient, type SupabaseClient, type User } from "@supabase/auth-helpers-nextjs";
import { type Session } from "@supabase/auth-helpers-react";
import { initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

type CreateContextOptions = Record<string, never>;

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
const createInnerTRPCContext = (_opts: CreateContextOptions): Record<string, never> =>
{
  return {};
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
type TrpcContext = {
  session: Session | null;
  supabaseServerClient: SupabaseClient;
  user: User | null;
};

export const createTRPCContext = async ({ req, res }: CreateNextContextOptions): Promise<TrpcContext> =>
{
  const supabaseServerClient = createServerSupabaseClient({ req, res });
  const { data: { user } } = await supabaseServerClient.auth.getUser();
  const { data: { session } } = await supabaseServerClient.auth.getSession();

  console.log("--- createTRPCContext ---");
  console.log("user", user);
  console.log("session", session);

  return {
    session,
    supabaseServerClient,
    user
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC
  .context<typeof createTRPCContext>()
  .create({
    errorFormatter: ({ error, shape }) =>
    {
      console.log("error formatter");

      let errorData: ClientError;

      if(error instanceof EmailAlreadyTakenError)
      {
        errorData = clientErrors["email-already-taken"];
      }
      else
      {
        console.warn("Unhandled Server Error. Please check tRPC error formatter. Error was:", error);
        errorData = clientErrors["internal-server-error"];
      }

      return {
        ...shape,
        data: {
          ...errorData
        },
      };
    },
    isDev: env.NEXT_PUBLIC_NODE_ENV === "development",
    /* errorFormatter: ({ error, shape }) =>
    {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      };
    },*/
    transformer: superjson,
  });

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;
