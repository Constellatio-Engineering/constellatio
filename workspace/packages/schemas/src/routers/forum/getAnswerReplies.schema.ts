import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getAnswerRepliesSchema = z.object({
  answerId: idValidation
});

export type GetAnswerRepliesSchema = z.input<typeof getAnswerRepliesSchema>;
