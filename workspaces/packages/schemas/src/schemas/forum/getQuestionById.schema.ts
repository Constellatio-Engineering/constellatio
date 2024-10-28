import { idValidation } from "@/common/common.validation";

import { z } from "zod";

export const getQuestionByIdSchema = z.object({
  questionId: idValidation,
});

export type GetQuestionByIdSchema = z.input<typeof getQuestionByIdSchema>;
