import { db } from "@/db/connection";
import { type BookmarkInsert, bookmarks } from "@/db/schema";
import { addBookmarkSchema } from "@/schemas/addBookmarkSchema";
import { registrationFormSchema } from "@/schemas/RegistrationFormSchema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { EmailAlreadyTakenError, InternalServerError, RegisterError } from "@/utils/serverError";

export const bookmarksRouter = createTRPCRouter({
  addBookmark: protectedProcedure
    .input(addBookmarkSchema)
    .mutation(async ({ ctx: { session }, input }) =>
    {
      console.log("addBookmark", input.resourceType, input.resourceId);

      const bookmarkInsert: BookmarkInsert = {
        resourceId: input.resourceId,
        resourceType: input.resourceType,
        userId: session.user.id,
      };

      const result = await db.insert(bookmarks).values(bookmarkInsert);

      console.log(result);
    }),
});
