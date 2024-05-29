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

      if(tagIds.length === 0)
      {
        await db.delete(documentsToTags).where(eq(documentsToTags.documentId, docId));
        return;
      }

      await db.delete(documentsToTags).where(and(
        notInArray(documentsToTags.tagId, tagIds),
        eq(documentsToTags.documentId, docId),
      ));
      await db.insert(documentsToTags).values(tagIds.map(tagId => ({ documentId: docId, tagId }))).onConflictDoNothing();
    }),
});
