import { authenticationRouter } from "@/server/api/routers/authentication.router";
import { badgesRouter } from "@/server/api/routers/badges.router";
import { billingRouter } from "@/server/api/routers/billing.router";
import { bookmarksRouter } from "@/server/api/routers/bookmarks.router";
import { caisyRouter } from "@/server/api/routers/caisy.router";
import { caseProgressRouter } from "@/server/api/routers/caseProgress.router";
import { documentsRouter } from "@/server/api/routers/documents.router";
import { foldersRouter } from "@/server/api/routers/folders.router";
import { gamesProgressRouter } from "@/server/api/routers/gamesProgress.router";
import { notesRouter } from "@/server/api/routers/notes.router";
import { searchRouter } from "@/server/api/routers/search.router";
import { uploadsRouter } from "@/server/api/routers/uploads.router";
import { usersRouter } from "@/server/api/routers/user.router";
import { trackingRouter } from "@/server/api/routers/tracking.router";
import { viewsRouter } from "@/server/api/routers/views.router";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  authentication: authenticationRouter,
  badges: badgesRouter,
  billing: billingRouter,
  bookmarks: bookmarksRouter,
  caisy: caisyRouter,
  casesProgress: caseProgressRouter,
  documents: documentsRouter,
  folders: foldersRouter,
  gamesProgress: gamesProgressRouter,
  notes: notesRouter,
  search: searchRouter,
  uploads: uploadsRouter,
  users: usersRouter,
  views: viewsRouter,
  tracking: trackingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
