import { db } from "@/db/connection";
import { type DocumentInsert, documents, uploadedFiles } from "@/db/schema";
import { meiliSearchAdmin } from "@/lib/meilisearch";
import { createDocumentSchema } from "@/schemas/documents/createDocument.schema";
import { deleteDocumentSchema } from "@/schemas/documents/deleteDocument.schema";
import { getDocumentsSchema } from "@/schemas/documents/getDocuments.schema";
import { updateDocumentSchema } from "@/schemas/documents/updateDocument.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createDocumentSearchIndexItem, documentSearchIndexItemPrimaryKey, type DocumentSearchItemUpdate, searchIndices
} from "@/utils/search";
import { removeHtmlTagsFromString } from "@/utils/utils";

import {
  and, desc, eq, isNull, type SQLWrapper 
} from "drizzle-orm";

export const documentsRouter = createTRPCRouter({
  createDocument: protectedProcedure
    .input(createDocumentSchema)
    .mutation(async ({ ctx: { userId }, input: newDocument }) =>
    {
      const documentInsert: DocumentInsert = {
        ...newDocument,
        userId
      };

      const insertedDocument = await db.insert(documents).values(documentInsert).returning();

      const searchIndexItem = createDocumentSearchIndexItem({
        ...documentInsert,
        folderId: documentInsert.folderId || null,
        id: insertedDocument[0]!.id,
      });

      const addDocumentToIndexTask = await meiliSearchAdmin
        .index(searchIndices.userDocuments)
        .addDocuments([searchIndexItem], { primaryKey: documentSearchIndexItemPrimaryKey });

      const addDocumentToIndexResult = await meiliSearchAdmin.waitForTask(addDocumentToIndexTask.taskUid);

      if(addDocumentToIndexResult.status !== "succeeded")
      {
        console.error("failed to add document to index", addDocumentToIndexResult);
      }

      return insertedDocument;
    }),
  deleteDocument: protectedProcedure
    .input(deleteDocumentSchema)
    .mutation(async ({ ctx: { userId }, input: { id } }) =>
    {
      await db.delete(documents).where(and(
        eq(documents.id, id),
        eq(documents.userId, userId)
      ));

      const removeDeletedDocumentFromIndex = await meiliSearchAdmin
        .index(searchIndices.userDocuments)
        .deleteDocuments({
          filter: `id = ${id}`
        });

      const removeDocumentFromIndexResult = await meiliSearchAdmin.waitForTask(removeDeletedDocumentFromIndex.taskUid);

      if(removeDocumentFromIndexResult.status !== "succeeded")
      {
        console.error("failed to remove document from index", removeDocumentFromIndexResult);
      }
    }),
  getDocuments: protectedProcedure
    .input(getDocumentsSchema)
    .query(async ({ ctx: { userId }, input: { folderId } }) =>
    {
      const queryConditions: SQLWrapper[] = [eq(uploadedFiles.userId, userId)];

      if(folderId)
      {
        queryConditions.push(eq(documents.folderId, folderId));
      }
      else
      {
        queryConditions.push(isNull(documents.folderId));
      }

      return db.query.documents.findMany({
        orderBy: [desc(documents.updatedAt)],
        where: and(...queryConditions)
      });
    }),
  updateDocument: protectedProcedure
    .input(updateDocumentSchema)
    .mutation(async ({ ctx: { userId }, input: documentUpdate }) =>
    {
      const { id, updatedValues } = documentUpdate;
      const { content: updatedContent } = updatedValues;

      const updatedDocument = db.update(documents)
        .set({
          ...updatedValues,
          updatedAt: new Date()
        })
        .where(and(
          eq(documents.id, id),
          eq(documents.userId, userId)
        ))
        .returning();

      if(updatedContent)
      {
        documentUpdate.updatedValues.content = removeHtmlTagsFromString(updatedContent);
      }

      const searchIndexDocumentUpdate: DocumentSearchItemUpdate = {
        ...documentUpdate.updatedValues,
        id,
      };

      const updateDocumentInIndexTask = await meiliSearchAdmin.index(searchIndices.userDocuments).updateDocuments([searchIndexDocumentUpdate]);
      const updateDocumentInIndexResult = await meiliSearchAdmin.waitForTask(updateDocumentInIndexTask.taskUid);

      if(updateDocumentInIndexResult.status !== "succeeded")
      {
        console.error("failed to update document in index", updateDocumentInIndexResult);
      }

      return updatedDocument;
    })
});
