/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { db } from "@acme/db/client";
import { users } from "@acme/db/schema";
import { eq } from "@acme/db";
import { env } from "@acme/env";
import {
  EmailAlreadyTakenError, NotFoundError, RateLimitError, SelfDeletionRequestError, UnauthorizedError
} from "./utils/serverError";
import { sleep } from "@acme/utils";

import { createPagesServerClient, type SupabaseClient, type User } from "@supabase/auth-helpers-nextjs";
import { type Session } from "@supabase/auth-helpers-react";
import { initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type GetServerSidePropsContext, type NextApiRequest, type NextApiResponse } from "next";
import superjson from "superjson";
import { type ClientError, clientErrors } from "./utils/clientError";

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

const t = initTRPC
  .context<typeof createTRPCContext>()
  .create({
    errorFormatter: ({ error, shape }) =>
    {
      let errorData: ClientError;

      console.log("errorFormatter", error, shape);

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
      else if(error instanceof SelfDeletionRequestError)
      {
        errorData = clientErrors["self-deletion-request-forbidden"];
      }
      else if(error instanceof NotFoundError)
      {
        errorData = clientErrors["not-found"];
      }
      else
      {
        console.warn("Unhandled Server Error. Please check tRPC error formatter in your 'trpc.ts' file. Error was:", error, shape);
        errorData = clientErrors["internal-server-error"];
      }

      console.log("errorData", errorData);

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

export const createTRPCRouter = t.router;

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

export const adminProcedure = protectedProcedure.use(async ({ ctx, next, path }) =>
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

  const isAdmin = userData?.usersToRoles.some(({ role }) => role.identifier === "admin");

  if(!isAdmin)
  {
    console.warn(`User '${ctx.userId}' tried to access admin-only procedure '${path}' without being an admin.`);
    throw new UnauthorizedError();
  }

  return next({
    ctx: {
      adminUserId: ctx.session.user.id,
      session: ctx.session
    },
  });
});

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

