/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { appRouter } from "@/server/api/root";
import { type ClientError, clientErrors } from "@/utils/clientError";
import { EmailAlreadyTakenError, RateLimitError, UnauthorizedError } from "@/utils/serverError";
import { sleep } from "@/utils/utils";

import { createPagesServerClient, type SupabaseClient, type User } from "@supabase/auth-helpers-nextjs";
import { type Session } from "@supabase/auth-helpers-react";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { eq } from "drizzle-orm";
import { type GetServerSidePropsContext, type NextApiRequest, type NextApiResponse } from "next";
import superjson from "superjson";

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

export const getTrpcContext = async (context: GetServerSidePropsContext | {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<TrpcContext> =>
{
  const supabaseServerClient = createPagesServerClient(context, {
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  });

  const { data: { user } } = await supabaseServerClient.auth.getUser();
  const { data: { session } } = await supabaseServerClient.auth.getSession();

  return {
    session,
    supabaseServerClient,
    user,
  };
};

export const createTRPCContext = async (context: CreateNextContextOptions): Promise<TrpcContext> =>
{
  const trpcContext = await getTrpcContext(context);

  if(env.THROTTLE_REQUESTS_IN_MS && env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "production")
  {
    // Caution: This is only for testing purposes in development. It will slow down the API response time.
    console.info(`Caution: Requests are throttled for ${env.THROTTLE_REQUESTS_IN_MS}ms due to 'env.THROTTLE_REQUESTS_IN_MS' being set.`);
    await sleep(env.THROTTLE_REQUESTS_IN_MS);
  }

  return trpcContext;
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
      let errorData: ClientError;

      if(error instanceof EmailAlreadyTakenError)
      {
        errorData = clientErrors["email-already-taken"];
      }
      else if(error instanceof UnauthorizedError)
      {
        errorData = clientErrors.unauthorized;
      }
      else if(error instanceof RateLimitError)
      {
        errorData = clientErrors["too-many-requests"];
      }
      else
      {
        console.warn("Unhandled Server Error. Please check tRPC error formatter in your 'trpc.ts' file. Error was:", error, shape);
        errorData = clientErrors["internal-server-error"];
      }

      return {
        ...shape, // TODO Dont return shape, at least not for internal server errors
        data: {
          clientError: errorData,
          code: error.code,
          httpStatus: shape.data.httpStatus,
        },
      };
    },
    isDev: process.env.NODE_ENV === "development",
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

export const { createCallerFactory } = t;

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

const enforceUserIsAuthenticated = t.middleware(async ({ ctx, next }) =>
{
  const { session } = ctx;

  if(!session)
  {
    throw new UnauthorizedError();
  }

  return next({
    ctx: {
      session,
      userId: session.user.id
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthenticated);

export const forumModProcedure = protectedProcedure.use(async ({ ctx, next, path }) =>
{
  const userData = await db.query.users.findFirst({
    columns: {},
    where: eq(users.id, ctx.userId),
    with: {
      usersToRoles: {
        columns: {},
        with: {
          role: true,
        }
      }
    }
  });

  const isMod = userData?.usersToRoles.some(({ role }) => role.identifier === "forumMod");

  if(!isMod)
  {
    console.warn(`User '${ctx.userId}' tried to access mod-only procedure '${path}' without being a mod.`);
    throw new UnauthorizedError();
  }

  return next({
    ctx: {
      session: ctx.session,
      userId: ctx.session.user.id
    },
  });
});

