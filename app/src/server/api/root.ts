import { authenticationRouter } from "@/server/api/routers/authentication.router";
import { badgesRouter } from "@/server/api/routers/badges.router";
import { billingRouter } from "@/server/api/routers/billing.router";
import { bookmarksRouter } from "@/server/api/routers/bookmarks.router";
import { caisyRouter } from "@/server/api/routers/caisy.router";
import { caseProgressRouter } from "@/server/api/routers/caseProgress.router";
import { documentsRouter } from "@/server/api/routers/documents.router";
import { foldersRouter } from "@/server/api/routers/folders.router";
import { forumRouter } from "@/server/api/routers/forum.router";
import { gamesProgressRouter } from "@/server/api/routers/gamesProgress.router";
import { internTrackingFromPosthogRouter } from "@/server/api/routers/internTrackingFromPosthog.router";
import { notesRouter } from "@/server/api/routers/notes.router";
import { notificationsRouter } from "@/server/api/routers/notifications.router";
import { searchRouter } from "@/server/api/routers/search.router";
import { uploadsRouter } from "@/server/api/routers/uploads.router";
import { usersRouter } from "@/server/api/routers/user.router";
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
  forum: forumRouter,
  gamesProgress: gamesProgressRouter,
  internTrackingFromPosthog: internTrackingFromPosthogRouter,
  notes: notesRouter,
  notifications: notificationsRouter,
  search: searchRouter,
  uploads: uploadsRouter,
  users: usersRouter,
  views: viewsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
