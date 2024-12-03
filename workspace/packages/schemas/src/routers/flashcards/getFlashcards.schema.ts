import { z } from "zod";

import { collectionIdValidation } from "../../common/flashcards/flashcard.validation";

export const getFlashcardsSchema = z.object({
  collectionId: collectionIdValidation.optional()
});

export type GetFlashcardsSchema = z.input<typeof getFlashcardsSchema>;
