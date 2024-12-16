import { adminRouter } from "./routers/admin.router";
import { authenticationRouter } from "./routers/authentication.router";
import { badgesRouter } from "./routers/badges.router";
import { billingRouter } from "./routers/billing.router";
import { bookmarksRouter } from "./routers/bookmarks.router";
import { caisyRouter } from "./routers/caisy.router";
import { caseProgressRouter } from "./routers/caseProgress.router";
import { documentsRouter } from "./routers/documents.router";
import { flashcardsRouter } from "./routers/flashcards.router";
import { foldersRouter } from "./routers/folders.router";
import { forumRouter } from "./routers/forum.router";
import { gamesProgressRouter } from "./routers/gamesProgress.router";
import { internalUseOnly_utilsRouter } from "./routers/internalUtils.router";
import { notesRouter } from "./routers/notes.router";
import { notificationsRouter } from "./routers/notifications.router";
import { referralRouter } from "./routers/referral.router";
import { searchRouter } from "./routers/search.router";
import { streakRouter } from "./routers/streak.router";
import { tagsRouter } from "./routers/tags.router";
import { uploadsRouter } from "./routers/uploads.router";
import { usersRouter } from "./routers/user.router";
import { userActivityRouter } from "./routers/userActivity.router";
import { viewsRouter } from "./routers/views.router";
import { createTRPCRouter } from "./trpc";

/**
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  authentication: authenticationRouter,
  badges: badgesRouter,
  billing: billingRouter,
  bookmarks: bookmarksRouter,
  caisy: caisyRouter,
  casesProgress: caseProgressRouter,
  documents: documentsRouter,
  flashcards: flashcardsRouter,
  folders: foldersRouter,
  forum: forumRouter,
  gamesProgress: gamesProgressRouter,
  internalUseOnly_utils: internalUseOnly_utilsRouter,
  notes: notesRouter,
  notifications: notificationsRouter,
  referral: referralRouter,
  search: searchRouter,
  streak: streakRouter,
  tags: tagsRouter,
  uploads: uploadsRouter,
  userActivity: userActivityRouter,
  users: usersRouter,
  views: viewsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
