import { z } from "zod";

export const getArticleViewsSchema = z.object({
  articleId: z.string().uuid(),
});

export type GetArticleViewsSchema = z.input<typeof getArticleViewsSchema>;
