import { z } from "zod";

export const postQuestionSchema = z.object({
  questionText: z.string().min(10),
  title: z.string().min(10)
});

export type PostQuestionSchema = z.input<typeof postQuestionSchema>;
