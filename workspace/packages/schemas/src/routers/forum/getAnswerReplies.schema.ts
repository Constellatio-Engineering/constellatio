import { idValidation } from "~/common/common.validation";

import { z } from "zod";

export const getAnswerRepliesSchema = z.object({
  answerId: idValidation
});

export type GetAnswerRepliesSchema = z.input<typeof getAnswerRepliesSchema>;
