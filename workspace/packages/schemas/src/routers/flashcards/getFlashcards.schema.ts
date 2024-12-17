import { z } from "zod";

import { setIdValidation } from "../../common/flashcards/flashcard.validation";

export const getFlashcardsSchema = z.object({
  setId: setIdValidation.optional()
});

export type GetFlashcardsSchema = z.input<typeof getFlashcardsSchema>;
