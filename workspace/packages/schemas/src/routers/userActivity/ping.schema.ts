import { timeZoneOffsetValidation } from "~/common/common.validation";

import { z } from "zod";

export const pingSchema = z.object({
  href: z.string().url(),
  path: z.string(),
  search: z.string().optional(),
  timeZoneOffset: timeZoneOffsetValidation
});

export type PingSchema = z.input<typeof pingSchema>;
