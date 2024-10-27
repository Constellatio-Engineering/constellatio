import { and, eq, SQLWrapper } from "@acme/db";
import { db } from "@acme/db/client";
import { BookmarkInsert, bookmarks } from "@acme/db/schema";
import { addOrRemoveBookmarkSchema } from "@acme/schemas";
import { allBookmarkResourceTypes } from "@acme/shared-types";
import { filterBookmarkForClient } from "@acme/utils";
import { z } from "zod";
import { addBadgeForUser } from "~/services/badges.services";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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

      if(input.resourceType === "case" || input.resourceType === "article")
      {
        await addBadgeForUser({ badgeIdentifier: "favorit", userId });
      }
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

      return (await db.select().from(bookmarks).where(and(...queryConditions))).map(filterBookmarkForClient);
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
