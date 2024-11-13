import { z } from "zod";

export const postAnswerSchema = z.object({
  parent: z.discriminatedUnion("parentType", [
    z.object({
      parentType: z.literal("question"),
      questionId: z.string(),
    }),
    z.object({
      answerId: z.string(),
      parentType: z.literal("answer"),
    }),
  ]),
  text: z.string()
});

export type PostAnswerSchema = z.input<typeof postAnswerSchema>;
