import { idValidation } from "~/common/common.validation";

import { z } from "zod";

export const upvoteQuestionSchema = z.object({
  questionId: idValidation
});

export type UpvoteQuestionSchema = z.input<typeof upvoteQuestionSchema>;
