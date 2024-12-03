import { z } from "zod";

import { idValidation } from "../../common/common.validation";
import { answerValidation, questionValidation } from "../../common/flashcards/flashcard.validation";

export const createFlashcardSchema = z.object({
  answer: answerValidation,
  collectionId: idValidation.nullable(),
  question: questionValidation,
});

export type CreateFlashcardSchema = z.input<typeof createFlashcardSchema>;
