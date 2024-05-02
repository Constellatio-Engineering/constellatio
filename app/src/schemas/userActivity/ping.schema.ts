import { z } from "zod";

export const pingSchema = z.object({
  href: z.string().url(),
  path: z.string(),
  search: z.string().optional(),
});

export type PingSchema = z.input<typeof pingSchema>;
