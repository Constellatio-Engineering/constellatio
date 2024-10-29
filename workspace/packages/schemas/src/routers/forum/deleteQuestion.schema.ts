import { idValidation } from "~/common/common.validation";

import { z } from "zod";

export const deleteQuestionSchema = z.object({
  questionId: idValidation,
});

export type DeleteQuestionSchema = z.input<typeof deleteQuestionSchema>;
