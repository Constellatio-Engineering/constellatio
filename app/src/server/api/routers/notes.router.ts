import { db } from "@/db/connection";
import { notes } from "@/db/schema";
import { createOrUpdateNoteSchema } from "@/schemas/notes/createOrUpdateNote.schema";
import { deleteNoteSchema } from "@/schemas/notes/deleteNote.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import {
  and, eq,
} from "drizzle-orm";

export const notesRouter = createTRPCRouter({
  createOrUpdateNote: protectedProcedure
    .input(createOrUpdateNoteSchema)
    .mutation(async ({ ctx: { userId }, input: { content, fileId } }) =>
    {
      const existingNote = await db.query.notes.findFirst({
        where: and(
          eq(notes.userId, userId),
          eq(notes.fileId, fileId)
        )
      });

      if(!existingNote)
      {
        return db.insert(notes).values({
          content,
          fileId,
          userId,
        }).returning();
      }
      else
      {
        return db.update(notes).set({ content }).where(
          and(
            eq(notes.userId, userId),
            eq(notes.fileId, fileId)
          )
        ).returning();
      }
    }),
  deleteNote: protectedProcedure
    .input(deleteNoteSchema)
    .mutation(async ({ ctx: { userId }, input: { fileId } }) =>
    {
      await db.delete(notes).where(
        and(
          eq(notes.userId, userId),
          eq(notes.fileId, fileId)
        )
      );
    }),
  /* getNotes: protectedProcedure
    .input(getNotesSchema)
    .query(async ({ ctx: { userId }, input: { folderId } }) =>
    {
      // this is duplicated in getUploadedFiles
      const queryConditions: SQLWrapper[] = [eq(uploadedFiles.userId, userId)];

      if(folderId)
      {
        queryConditions.push(eq(uploadedFiles.folderId, folderId));
      }
      else
      {
        queryConditions.push(isNull(uploadedFiles.folderId));
      }

      const filesInFolder = await db.query.uploadedFiles.findMany({
        where: and(...queryConditions)
      });

      return db.query.notes.findMany({
        where: and(
          eq(notes.userId, userId),
          inArray(notes.fileId, filesInFolder.map(file => file.id)),
        )
      });
    }),*/
});
