import {
  and, desc, eq, isNull, type SQLWrapper 
} from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { type DocumentInsert, documents } from "@constellatio/db/schema";
import { searchIndices } from "@constellatio/db-to-search";
import { createDocumentSearchIndexItem, documentSearchIndexItemPrimaryKey, type DocumentSearchItemUpdate } from "@constellatio/meilisearch/utils";
import { createDocumentSchema } from "@constellatio/schemas/routers/documents/createDocument.schema";
import { deleteDocumentSchema } from "@constellatio/schemas/routers/documents/deleteDocument.schema";
import { getDocumentsSchema } from "@constellatio/schemas/routers/documents/getDocuments.schema";
import { updateDocumentSchema } from "@constellatio/schemas/routers/documents/updateDocument.schema";
import { removeHtmlTagsFromString } from "@constellatio/utils/html";
import { type inferProcedureOutput } from "@trpc/server";

import { addUserToCrmUpdateQueue } from "../lib/clickup/utils";
import { meiliSearchAdmin } from "../lib/meilisearch";
import { addTags } from "../services/tags.services";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
      await addUserToCrmUpdateQueue(userId);

      const searchIndexItem = createDocumentSearchIndexItem({
        ...documentInsert,
        createdAt: insertedDocument[0]!.createdAt,
        folderId: documentInsert.folderId || null,
        id: insertedDocument[0]!.id,
        tags: [],
        updatedAt: insertedDocument[0]!.updatedAt,
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

      await addUserToCrmUpdateQueue(userId);

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
      const queryConditions: SQLWrapper[] = [eq(documents.userId, userId)];

      if(folderId)
      {
        queryConditions.push(eq(documents.folderId, folderId));
      }
      else if(folderId === null)
      {
        queryConditions.push(isNull(documents.folderId));
      }

      const documentsFromDb = await db.query.documents.findMany({
        orderBy: [desc(documents.updatedAt)],
        where: and(...queryConditions),
        with: { tags: true }
      });

      const documentsWithTags = await addTags(documentsFromDb);
      return documentsWithTags;
    }),
  updateDocument: protectedProcedure
    .input(updateDocumentSchema)
    .mutation(async ({ ctx: { userId }, input: documentUpdate }) =>
    {
      const { id, updatedValues } = documentUpdate;
      const { content: updatedContent } = updatedValues;

      const _updatedValues: Partial<DocumentInsert> = {
        content: updatedValues.content,
        folderId: updatedValues.folderId,
        name: updatedValues.name
      };

      const updatedDocument = await db.update(documents)
        .set(_updatedValues)
        .where(and(
          eq(documents.id, id),
          eq(documents.userId, userId)
        ))
        .returning();

      if(updatedContent)
      {
        documentUpdate.updatedValues.content = removeHtmlTagsFromString(updatedContent, true);
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

export type GetDocumentsResult = inferProcedureOutput<typeof documentsRouter.getDocuments>;
export type GetDocumentResult = GetDocumentsResult[number];
