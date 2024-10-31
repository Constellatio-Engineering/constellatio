import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getAnswerByIdSchema = z.object({
  answerId: idValidation,
});

export type GetAnswerByIdSchema = z.input<typeof getAnswerByIdSchema>;
