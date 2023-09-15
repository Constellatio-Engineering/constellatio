import { db } from "@/db/connection";
import { type BookmarkInsert, bookmarksTable } from "@/db/schema";
import { addBookmarkSchema } from "@/schemas/addBookmarkSchema";
import { registrationFormSchema } from "@/schemas/RegistrationFormSchema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { EmailAlreadyTakenError, InternalServerError, RegisterError } from "@/utils/serverError";

import { eq } from "drizzle-orm";

const sleep = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const bookmarksRouter = createTRPCRouter({
  addBookmark: protectedProcedure
    .input(addBookmarkSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      console.log("addBookmark", input.resourceType, input.resourceId);

      const bookmarkInsert: BookmarkInsert = {
        resourceId: input.resourceId,
        resourceType: input.resourceType,
        userId,
      };

      const result = await db.insert(bookmarksTable).values(bookmarkInsert);

      console.log(result);
    }),
  getAllBookmarks: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      return db.select().from(bookmarksTable).where(eq(bookmarksTable.userId, userId));
    })
});
