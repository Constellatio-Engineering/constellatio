import { db } from "@/db/connection";
import {
  type Document, documents, documentsToTags, type UploadedFile, uploadedFiles, uploadedFilesToTags, 
} from "@/db/schema";
import { meiliSearchAdmin } from "@/lib/meilisearch";
import { setTagsForEntitySchema } from "@/schemas/tags/setTagsForEntity.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { type DocumentSearchIndexItem, searchIndices, type TagSearchIndexItem, type UploadSearchIndexItem } from "@/utils/search";
import { NotFoundError } from "@/utils/serverError";
import { type Nullable } from "@/utils/types";

import { and, eq, notInArray } from "drizzle-orm";

export const tagsRouter = createTRPCRouter({
  setTagsForEntity: protectedProcedure
    .input(setTagsForEntitySchema)
    .mutation(async ({ ctx: { userId }, input: { entityId, entityType, tagIds } }) =>
    {
      const tagsDetails = await meiliSearchAdmin.index(searchIndices.tags).getDocuments<TagSearchIndexItem>({
        filter: `id IN [${tagIds.join(", ")}]`
      });

      await meiliSearchAdmin.index<DocumentSearchIndexItem | UploadSearchIndexItem>(entityType).updateDocuments([{
        id: entityId,
        tags: tagsDetails.results
      }]);

      let entityFromDb: Nullable<Document | UploadedFile>;

      if(entityType === "user-documents")
      {
        entityFromDb = await db.query.documents.findFirst({
          where: and(
            eq(documents.id, entityId),
            eq(documents.userId, userId),
          )
        });
      }
      else
      {
        entityFromDb = await db.query.uploadedFiles.findFirst({
          where: and(
            eq(uploadedFiles.id, entityId),
            eq(uploadedFiles.userId, userId),
          )
        });
      }

      if(!entityFromDb)
      {
        throw new NotFoundError();
      }

      if(tagIds.length === 0)
      {
        if(entityType === "user-documents")
        {
          await db.delete(documentsToTags).where(eq(documentsToTags.documentId, entityId));
        }
        else
        {
          await db.delete(uploadedFilesToTags).where(eq(uploadedFilesToTags.fileId, entityId));
        }
        return;
      }

      if(entityType === "user-documents")
      {
        await db.delete(documentsToTags).where(and(
          notInArray(documentsToTags.tagId, tagIds),
          eq(documentsToTags.documentId, entityId),
        ));
        await db.insert(documentsToTags).values(tagIds.map(tagId => ({ documentId: entityId, tagId }))).onConflictDoNothing();
      }
      else
      {
        await db.delete(uploadedFilesToTags).where(and(
          notInArray(uploadedFilesToTags.tagId, tagIds),
          eq(uploadedFilesToTags.fileId, entityId),
        ));
        await db.insert(uploadedFilesToTags).values(tagIds.map(tagId => ({ fileId: entityId, tagId }))).onConflictDoNothing();
      }
    }),
});
