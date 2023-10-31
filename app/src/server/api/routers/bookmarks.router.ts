import { db } from "@/db/connection";
import { allBookmarkResourceTypes, type BookmarkInsert, bookmarks } from "@/db/schema";
import { addOrRemoveBookmarkSchema } from "@/schemas/bookmarks/addOrRemoveBookmark.schema";
import { addBadgeForUser } from "@/server/api/services/badges.services";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { and, eq, type SQLWrapper } from "drizzle-orm";
import z from "zod";

export const bookmarksRouter = createTRPCRouter({
  addBookmark: protectedProcedure
    .input(addOrRemoveBookmarkSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      const existingBookmark = await db.query.bookmarks.findFirst({
        where: and(
          eq(bookmarks.resourceId, input.resourceId),
          eq(bookmarks.resourceType, input.resourceType),
          eq(bookmarks.userId, userId)
        )
      });

      if(existingBookmark)
      {
        console.log("bookmark already exists");
        return;
      }

      const bookmarkInsert: BookmarkInsert = {
        resourceId: input.resourceId,
        resourceType: input.resourceType,
        userId,
      };

      await db.insert(bookmarks).values(bookmarkInsert);
      await addBadgeForUser({ badgeIdentifier: "favorit", userId });
    }),
  getAllBookmarks: protectedProcedure
    .input(z.object({
      resourceType: z.enum(allBookmarkResourceTypes).optional(),
    }).optional())
    .query(async ({ ctx: { userId }, input }) =>
    {
      const queryConditions: SQLWrapper[] = [eq(bookmarks.userId, userId)];

      if(input?.resourceType)
      {
        queryConditions.push(eq(bookmarks.resourceType, input.resourceType));
      }

      return db.select().from(bookmarks).where(and(...queryConditions));
    }),
  removeBookmark: protectedProcedure
    .input(addOrRemoveBookmarkSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      await db.delete(bookmarks).where(
        and(
          eq(bookmarks.resourceId, input.resourceId),
          eq(bookmarks.resourceType, input.resourceType),
          eq(bookmarks.userId, userId)
        )
      );
    })
});
