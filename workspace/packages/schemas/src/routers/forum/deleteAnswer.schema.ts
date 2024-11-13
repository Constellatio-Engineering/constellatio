import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const deleteAnswerSchema = z.object({
  answerId: idValidation,
});

export type DeleteAnswerSchema = z.input<typeof deleteAnswerSchema>;
