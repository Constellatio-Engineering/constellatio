import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getArticleViewsSchema = z.object({
  articleId: idValidation,
});

export type GetArticleViewsSchema = z.input<typeof getArticleViewsSchema>;
