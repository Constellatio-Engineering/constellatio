import { cursorValidation, limitValidation } from "@/schemas/forum/cursor.valiation";

import { z } from "zod";

export const getQuestionsSchema = z.object({
  cursor: cursorValidation,
  limit: limitValidation
});

export type GetQuestionsSchema = z.input<typeof getQuestionsSchema>;
export type GetQuestionsCursorType = GetQuestionsSchema["cursor"]["cursorType"];
