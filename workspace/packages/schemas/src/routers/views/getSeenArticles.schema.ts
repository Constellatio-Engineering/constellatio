import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getSeenArticlesSchema = z.object({
  articleIds: z.array(idValidation)
}).optional();

export type GetSeenArticlesSchema = z.input<typeof getSeenArticlesSchema>;
