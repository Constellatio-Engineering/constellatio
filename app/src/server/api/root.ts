import { authenticationRouter } from "@/server/api/routers/authentication.router";
import { bookmarksRouter } from "@/server/api/routers/bookmarks.router";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  authentication: authenticationRouter,
  bookmarks: bookmarksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
