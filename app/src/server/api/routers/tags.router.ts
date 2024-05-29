import { db } from "@/db/connection";
import { documents, documentsToTags, } from "@/db/schema";
import { setTagsForConstellatioDocSchema } from "@/schemas/tags/setTagsForConstellatioDoc.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { NotFoundError } from "@/utils/serverError";

import { and, eq, notInArray } from "drizzle-orm";

export const tagsRouter = createTRPCRouter({
  setTagsForConstellatioDoc: protectedProcedure
    .input(setTagsForConstellatioDocSchema)
    .mutation(async ({ ctx: { userId }, input: { docId, tagIds } }) =>
    {
      const constellationDoc = await db.query.documents.findFirst({
        where: and(
          eq(documents.id, docId),
          eq(documents.userId, userId),
        )
      });

      if(!constellationDoc) 
      {
        throw new NotFoundError();
      }

      await db.delete(documentsToTags).where(notInArray(documentsToTags.tagId, tagIds));
      await db.insert(documentsToTags).values(tagIds.map(tagId => ({ documentId: docId, tagId }))).onConflictDoNothing();
    }),
});
