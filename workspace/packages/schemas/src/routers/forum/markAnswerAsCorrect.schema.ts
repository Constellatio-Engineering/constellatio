import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const markAnswerAsCorrectSchema = z.object({
  answerId: idValidation
});

export type MarkAnswerAsCorrectSchema = z.input<typeof markAnswerAsCorrectSchema>;
