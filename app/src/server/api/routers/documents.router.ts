import { db } from "@/db/connection";
import { type DocumentInsert, documents, uploadedFiles } from "@/db/schema";
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
      const documentInsert: DocumentInsert = {
        ...newDocument,
        userId
      };

      return db.insert(documents).values(documentInsert).returning();
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
    .mutation(async ({ ctx: { userId }, input: documentUpdate }) =>
    {
      const { id, updatedValues } = documentUpdate;

      return db.update(documents)
        .set({
          ...updatedValues,
          updatedAt: new Date()
        })
        .where(and(
          eq(documents.id, id),
          eq(documents.userId, userId)
        ))
        .returning();
    })
});
