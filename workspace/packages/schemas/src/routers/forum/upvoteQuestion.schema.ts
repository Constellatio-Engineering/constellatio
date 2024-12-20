import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const upvoteQuestionSchema = z.object({
  questionId: idValidation
});

export type UpvoteQuestionSchema = z.input<typeof upvoteQuestionSchema>;
