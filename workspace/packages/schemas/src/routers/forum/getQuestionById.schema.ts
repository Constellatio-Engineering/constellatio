import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getQuestionByIdSchema = z.object({
  questionId: idValidation,
});

export type GetQuestionByIdSchema = z.input<typeof getQuestionByIdSchema>;
