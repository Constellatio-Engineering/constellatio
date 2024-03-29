import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getAnswerByIdSchema = z.object({
  answerId: idValidation,
});

export type GetAnswerByIdSchema = z.input<typeof getAnswerByIdSchema>;
