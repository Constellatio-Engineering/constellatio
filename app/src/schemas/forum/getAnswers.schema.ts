import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getAnswersSchema = z.object({
  questionId: idValidation
});

export type GetAnswersSchema = z.input<typeof getAnswersSchema>;
