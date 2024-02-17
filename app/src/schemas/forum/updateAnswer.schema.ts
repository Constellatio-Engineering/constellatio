import { z } from "zod";

export const updateAnswerSchema = z.object({
  answerId: z.string(),
  text: z.string()
});

export type UpdateAnswerSchema = z.input<typeof updateAnswerSchema>;
