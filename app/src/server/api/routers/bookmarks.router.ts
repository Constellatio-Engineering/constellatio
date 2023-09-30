import { db } from "@/db/connection";
import { allBookmarkResourceTypes, type BookmarkInsert, bookmarksTable } from "@/db/schema";
import { addOrRemoveBookmarkSchema } from "@/schemas/bookmarks/addOrRemoveBookmark.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { and, eq, type SQLWrapper } from "drizzle-orm";
import z from "zod";

export const bookmarksRouter = createTRPCRouter({
  addBookmark: protectedProcedure
    .input(addOrRemoveBookmarkSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      const existingBookmark = await db.query.bookmarksTable.findFirst({
        where: and(
          eq(bookmarksTable.resourceId, input.resourceId),
          eq(bookmarksTable.resourceType, input.resourceType),
          eq(bookmarksTable.userId, userId)
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

      console.log(`inserting bookmark for ${input.resourceType} with id ${input.resourceId}`);

      await db.insert(bookmarksTable).values(bookmarkInsert);
    }),
  getAllBookmarks: protectedProcedure
    .input(z.object({
      resourceType: z.enum(allBookmarkResourceTypes).optional(),
    }).optional())
    .query(async ({ ctx: { userId }, input }) =>
    {
      const queryConditions: SQLWrapper[] = [eq(bookmarksTable.userId, userId)];

      if(input?.resourceType)
      {
        queryConditions.push(eq(bookmarksTable.resourceType, input.resourceType));
      }

      return db.select().from(bookmarksTable).where(and(...queryConditions));
    }),
  removeBookmark: protectedProcedure
    .input(addOrRemoveBookmarkSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      console.log(`removing bookmark for ${input.resourceType} with id ${input.resourceId}`);

      await db.delete(bookmarksTable).where(
        and(
          eq(bookmarksTable.resourceId, input.resourceId),
          eq(bookmarksTable.resourceType, input.resourceType),
          eq(bookmarksTable.userId, userId)
        )
      );
    })
});
