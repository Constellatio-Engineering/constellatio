import { z } from "zod";

export const getQuestionsSchema = z.object({
  cursor: z.discriminatedUnion("cursorType", [
    z.object({
      cursorType: z.literal("upvotes"),
      cursorValue: z.number().int()
    }),
    z.object({
      cursorType: z.literal("newest"),
      cursorValue: z.number().int().min(0)
    })
  ]),
  limit: z.number().min(1).max(50)
});

export type GetQuestionsSchema = z.input<typeof getQuestionsSchema>;
