import { idValidation } from "@/schemas/common.validation";
import { cursorValidation, limitValidation } from "@/schemas/forum/cursor.valiation";

import { z } from "zod";

export const getAnswersSchema = z.object({
  cursor: cursorValidation,
  limit: limitValidation,
  parent: z.discriminatedUnion("parentType", [
    z.object({
      parentType: z.literal("question"),
      questionId: idValidation
    }),
    z.object({
      answerId: idValidation,
      parentType: z.literal("answer")
    })
  ])
});

export type GetAnswersSchema = z.input<typeof getAnswersSchema>;
