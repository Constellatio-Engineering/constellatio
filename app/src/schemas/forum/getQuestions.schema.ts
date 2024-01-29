import { z } from "zod";

export const getQuestionsSchema = z.object({
  cursor: z.discriminatedUnion("cursorType", [
    z.object({
      cursorType: z.literal("upvotes"),
      index: z.number().int().min(0).nullish(),
      upvotes: z.number().int().nullish()
    }),
    z.object({
      cursorType: z.literal("newest"),
      index: z.number().int().min(0).nullish()
    })
  ]),
  limit: z.number().min(1).max(50)
});

export type GetQuestionsSchema = z.input<typeof getQuestionsSchema>;
