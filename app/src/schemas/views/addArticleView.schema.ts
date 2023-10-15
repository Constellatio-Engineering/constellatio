import { z } from "zod";

export const addArticleViewSchema = z.object({
  articleId: z.string().uuid(),
});

export type AddArticleViewSchema = z.input<typeof addArticleViewSchema>;
