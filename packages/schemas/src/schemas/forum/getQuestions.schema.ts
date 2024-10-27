import { idValidation } from "@/common/common.validation";
import { cursorValidation, limitValidation } from "@/common/forum/cursor.validation";

import { z } from "zod";

export const getQuestionsSchema = z.object({
  cursor: cursorValidation,
  limit: limitValidation,
  questionIds: z.array(idValidation).optional()
});

export type GetQuestionsSchema = z.input<typeof getQuestionsSchema>;
export type GetQuestionsCursorType = GetQuestionsSchema["cursor"]["cursorType"];
