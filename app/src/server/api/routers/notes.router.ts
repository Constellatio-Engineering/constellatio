import { db } from "@/db/connection";
import { type NoteInsert, notes } from "@/db/schema";
import { createNoteSchema } from "@/schemas/notes/createNote.schema";
import { deleteNoteSchema } from "@/schemas/notes/deleteNote.schema";
import { updateNoteSchema } from "@/schemas/notes/updateNote.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import {
  and, eq,
} from "drizzle-orm";

export const notesRouter = createTRPCRouter({
  createNote: protectedProcedure
    .input(createNoteSchema)
    .mutation(async ({ ctx: { userId }, input: { content, fileId, id } }) =>
    {
      const noteInsert: NoteInsert = {
        content,
        fileId,
        id,
        userId
      };

      return db.insert(notes).values(noteInsert).returning();
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
  updateNote: protectedProcedure
    .input(updateNoteSchema)
    .mutation(async ({ ctx: { userId }, input: updatedNote }) =>
    {
      const { fileId, updatedValues } = updatedNote;

      return db.update(notes)
        .set(updatedValues)
        .where(
          and(
            eq(notes.userId, userId),
            eq(notes.fileId, fileId)
          )
        ).returning();
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
