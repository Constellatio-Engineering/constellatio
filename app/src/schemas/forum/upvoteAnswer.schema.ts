import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const upvoteAnswerSchema = z.object({
  answerId: idValidation
});

export type UpvoteAnswerSchema = z.input<typeof upvoteAnswerSchema>;
