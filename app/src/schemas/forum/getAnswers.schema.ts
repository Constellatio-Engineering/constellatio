import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getAnswersSchema = z.object({
  parent: z.discriminatedUnion("parentType", [
    z.object({
      parentType: z.literal("question"),
      questionId: idValidation
    }),
    z.object({
      answerId: idValidation,
      parentType: z.literal("answer")
    })
  ]),
  sortBy: z.union([z.literal("newest"), z.literal("upvotes")])
});

export type GetAnswersSchema = z.input<typeof getAnswersSchema>;
export type GetAnswersSortingOptions = GetAnswersSchema["sortBy"];
