import { z } from "zod";

export const postQuestionSchema = z.object({
  legalArea: z.string().min(1),
  legalField: z.string().min(1).nullable(),
  legalTopic: z.string().min(1).nullable(),
  question: z.object({
    html: z.string(),
    text: z.string().min(10)
  }),
  title: z.string().min(10),
});

export type PostQuestionSchema = z.input<typeof postQuestionSchema>;
