import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const deleteQuestionSchema = z.object({
  questionId: idValidation,
});

export type DeleteQuestionSchema = z.input<typeof deleteQuestionSchema>;
