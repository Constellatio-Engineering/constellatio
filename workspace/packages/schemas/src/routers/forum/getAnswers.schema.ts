import { z } from "zod";

import { idValidation } from "../../common/common.validation";

const questionParent = z.object({
  parentType: z.literal("question"),
  questionId: idValidation
});

const answerParent = z.object({
  answerId: idValidation,
  parentType: z.literal("answer")
});

export const getAnswersSchema = z.object({
  parent: z.discriminatedUnion("parentType", [
    questionParent,
    answerParent
  ]),
  sortBy: z.union([z.literal("newest"), z.literal("upvotes")])
});

export type GetAnswersSchema = z.input<typeof getAnswersSchema>;
export type GetAnswersSortingOption = GetAnswersSchema["sortBy"];
export type GetAnswersQuestionParent = z.infer<typeof questionParent>;
export type GetAnswersAnswerParent = z.infer<typeof answerParent>;
