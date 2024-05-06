import { timeZoneOffsetValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const pingSchema = z.object({
  data: z.any(),
  href: z.string().url(),
  path: z.string(),
  search: z.string().optional(),
  timeZoneOffset: timeZoneOffsetValidation
});

export type PingSchema = z.input<typeof pingSchema>;
