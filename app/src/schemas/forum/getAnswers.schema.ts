import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getAnswersSchema = z.discriminatedUnion("parentType", [
  z.object({
    parentType: z.literal("question"),
    questionId: idValidation
  }),
  z.object({
    answerId: idValidation,
    parentType: z.literal("answer")
  })
]);

export type GetAnswersSchema = z.input<typeof getAnswersSchema>;
