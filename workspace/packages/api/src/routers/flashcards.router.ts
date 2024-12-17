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
      console.log("schafft es bis api 1.");
      
      const flashcardInsert: FlashcardInsert = {
        answer: newFlashcard.answer,
        question: newFlashcard.question,
        userId
      };
      console.log("schafft es bis api 2.");
      
      const [insertedFlashcard] = await db.insert(flashcards).values(flashcardInsert).returning();
      console.log("schafft es bis api 3.");
      
      if(!insertedFlashcard)
      {
        throw new InternalServerError(new Error("insertedFlashcard was null after insertion"));
      }
      console.log("schafft es bis api 4.");
      
      if(newFlashcard.collectionId)
      {
        await db.insert(flashcardsToCollections).values({
          collectionId: newFlashcard.collectionId,
          flashcardId: insertedFlashcard.id
        });
      }
      console.log("schafft es bis api 5.");
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

      if(!collectionId)
      {
        const result = await db.query.flashcards.findMany({
          where(fields, { eq }) 
          {
            return eq(fields.userId, userId);
          },
        });
  
        return result;
      }

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
