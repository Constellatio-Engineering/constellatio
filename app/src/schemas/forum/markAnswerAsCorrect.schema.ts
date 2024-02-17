import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const markAnswerAsCorrectSchema = z.object({
  answerId: idValidation
});

export type MarkAnswerAsCorrectSchema = z.input<typeof markAnswerAsCorrectSchema>;
