import { idValidation } from "@/common/common.validation";

import { z } from "zod";

export const deleteAnswerSchema = z.object({
  answerId: idValidation,
});

export type DeleteAnswerSchema = z.input<typeof deleteAnswerSchema>;
