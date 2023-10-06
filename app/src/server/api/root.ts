import { authenticationRouter } from "@/server/api/routers/authentication.router";
import { billingRouter } from "@/server/api/routers/billing.router";
import { bookmarksRouter } from "@/server/api/routers/bookmarks.router";
import { caisyRouter } from "@/server/api/routers/caisy.router";
import { documentsRouter } from "@/server/api/routers/documents.router";
import { foldersRouter } from "@/server/api/routers/folders.router";
import { searchRouter } from "@/server/api/routers/search.router";
import { uploadsRouter } from "@/server/api/routers/uploads.router";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  authentication: authenticationRouter,
  billing: billingRouter,
  bookmarks: bookmarksRouter,
  caisy: caisyRouter,
  documents: documentsRouter,
  folders: foldersRouter,
  search: searchRouter,
  uploads: uploadsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
