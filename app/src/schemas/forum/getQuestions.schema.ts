import { idValidation } from "@/schemas/common.validation";
import { cursorValidation, limitValidation } from "@/schemas/forum/cursor.valiation";

import { z } from "zod";

export const getQuestionsSchema = z.object({
  cursor: cursorValidation,
  limit: limitValidation,
  questionIds: z.array(idValidation).optional()
});

export type GetQuestionsSchema = z.input<typeof getQuestionsSchema>;
export type GetQuestionsCursorType = GetQuestionsSchema["cursor"]["cursorType"];
