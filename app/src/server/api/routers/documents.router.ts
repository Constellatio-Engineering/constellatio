import { db } from "@/db/connection";
import { documents, uploadedFiles } from "@/db/schema";
import { createDocumentSchema } from "@/schemas/documents/createDocument.schema";
import { deleteDocumentSchema } from "@/schemas/documents/deleteDocument.schema";
import { getDocumentsSchema } from "@/schemas/documents/getDocuments.schema";
import { updateDocumentSchema } from "@/schemas/documents/updateDocument.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import {
  and, desc, eq, isNull, type SQLWrapper 
} from "drizzle-orm";

export const documentsRouter = createTRPCRouter({
  createDocument: protectedProcedure
    .input(createDocumentSchema)
    .mutation(async ({ ctx: { userId }, input: newDocument }) =>
    {
      await db.insert(documents).values({
        ...newDocument,
        userId
      });
    }),
  deleteDocument: protectedProcedure
    .input(deleteDocumentSchema)
    .mutation(async ({ ctx: { userId }, input: { id } }) =>
    {
      await db.delete(documents).where(and(
        eq(documents.id, id),
        eq(documents.userId, userId)
      ));
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
    .mutation(async ({ ctx: { userId }, input: updatedDocument }) =>
    {
      const {
        id,
        ...updatedDocumentValues
      } = updatedDocument;

      await db.update(documents)
        .set(updatedDocumentValues)
        .where(and(
          eq(documents.id, id),
          eq(documents.userId, userId)
        ));
    })
});
