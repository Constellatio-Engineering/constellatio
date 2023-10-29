import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const addArticleViewSchema = z.object({
  articleId: idValidation,
});

export type AddArticleViewSchema = z.input<typeof addArticleViewSchema>;
