import {
  and, eq, inArray, isNull, type SQLWrapper 
} from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { type NoteInsert, notes, uploadedFiles } from "@constellatio/db/schema";
import { createNoteSchema } from "@constellatio/schemas/routers/notes/createNote.schema";
import { deleteNoteSchema } from "@constellatio/schemas/routers/notes/deleteNote.schema";
import { getNotesSchema } from "@constellatio/schemas/routers/notes/getNotes.schema";
import { updateNoteSchema } from "@constellatio/schemas/routers/notes/updateNote.schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

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
  getNotes: protectedProcedure
    .input(getNotesSchema)
    .query(async ({ ctx: { userId }, input: { folderId } }) =>
    {
      const queryConditions: SQLWrapper[] = [eq(uploadedFiles.userId, userId)];

      if(folderId)
      {
        queryConditions.push(eq(uploadedFiles.folderId, folderId));
      }
      else if(folderId === null)
      {
        queryConditions.push(isNull(uploadedFiles.folderId));
      }

      const files = await db.select({ id: uploadedFiles.id }).from(uploadedFiles).where(and(...queryConditions));

      if(files.length === 0)
      {
        return [];
      }

      const result = await db.select().from(notes).where(and(
        eq(notes.userId, userId),
        inArray(notes.fileId, files.map(({ id }) => id)),
      ));

      return result;
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
});
