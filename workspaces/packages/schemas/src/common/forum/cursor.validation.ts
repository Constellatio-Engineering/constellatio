import { z } from "zod";

export const cursorValidation = z.discriminatedUnion("cursorType", [
  z.object({
    cursorType: z.literal("upvotes"),
    index: z.number().int().min(0).nullish(),
    upvotes: z.number().int().nullish()
  }),
  z.object({
    cursorType: z.literal("newest"),
    index: z.number().int().min(0).nullish()
  })
]);
  
export const limitValidation = z.number().min(1).max(50);
