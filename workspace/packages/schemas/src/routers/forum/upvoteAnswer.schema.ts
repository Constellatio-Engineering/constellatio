import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const upvoteAnswerSchema = z.object({
  answerId: idValidation
});

export type UpvoteAnswerSchema = z.input<typeof upvoteAnswerSchema>;
