import { z } from "zod";

import { idValidation } from "../../common/common.validation";
import { answerValidation, questionValidation } from "../../common/flashcards/flashcard.validation";

export const updateFlashcardSchema = z.object({
  id: idValidation,
  updatedValues: z.object({
    answer: answerValidation,
    question: questionValidation,
  }).partial(),
});

export type UpdateFlashcardSchema = z.input<typeof updateFlashcardSchema>;
