import { and, eq, type SQLWrapper } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { type FlashcardInsert, flashcards, flashcardsToCollections } from "@constellatio/db/schema";
import { createFlashcardSchema } from "@constellatio/schemas/routers/flashcards/createFlashcard.schema";
import { deleteFlashcardSchema } from "@constellatio/schemas/routers/flashcards/deleteFlashcard.schema";
import { getFlashcardsSchema } from "@constellatio/schemas/routers/flashcards/getFlashcards.schema";
import { updateFlashcardSchema } from "@constellatio/schemas/routers/flashcards/updateFlashcard.schema";
import { type inferProcedureOutput } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { InternalServerError } from "../utils/serverError";

export const flashcardsRouter = createTRPCRouter({
  createFlashcard: protectedProcedure
    .input(createFlashcardSchema)
    .mutation(async ({ ctx: { userId }, input: newFlashcard }) =>
    {
      const flashcardInsert: FlashcardInsert = {
        answer: newFlashcard.answer,
        question: newFlashcard.question,
        userId
      };

      const [insertedFlashcard] = await db.insert(flashcards).values(flashcardInsert).returning();

      if(!insertedFlashcard)
      {
        throw new InternalServerError(new Error("insertedFlashcard was null after insertion"));
      }

      if(newFlashcard.collectionId)
      {
        await db.insert(flashcardsToCollections).values({
          collectionId: newFlashcard.collectionId,
          flashcardId: insertedFlashcard.id
        });
      }
    }),
  deleteFlashcard: protectedProcedure
    .input(deleteFlashcardSchema)
    .mutation(async ({ ctx: { userId }, input: { id } }) =>
    {
      await db.delete(flashcards).where(and(
        eq(flashcards.id, id),
        eq(flashcards.userId, userId)
      ));
    }),
  getFlashcards: protectedProcedure
    .input(getFlashcardsSchema)
    .query(async ({ ctx: { userId }, input: { collectionId } }) =>
    {
      const queryConditions: SQLWrapper[] = [eq(flashcards.userId, userId)];

      return [];

      /* if(collectionId)
      {
        queryConditions.push(eq(fla.folderId, folderId));
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
      return documentsWithTags;*/
    }),
  updateFlashcard: protectedProcedure
    .input(updateFlashcardSchema)
    .mutation(async ({ ctx: { userId }, input: flashcardUpdate }) =>
    {
      const { id, updatedValues } = flashcardUpdate;

      const _updatedValues: Partial<FlashcardInsert> = {
        answer: updatedValues.answer,
        question: updatedValues.question,
      };

      const updatedFlashcard = await db.update(flashcards)
        .set(_updatedValues)
        .where(and(
          eq(flashcards.id, id),
          eq(flashcards.userId, userId)
        ))
        .returning();

      return updatedFlashcard;
    })
});

export type GetFlashcardsResult = inferProcedureOutput<typeof flashcardsRouter.getFlashcards>;
export type GetFlashcardResult = GetFlashcardsResult[number];
