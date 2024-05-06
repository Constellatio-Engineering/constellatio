import { timeZoneOffsetValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getUsageTimeSchema = z
  .object({
    end: z.date(),
    interval: z.enum(["day", "week", "month", "year"]),
    start: z.date(),
    timeZoneOffset: timeZoneOffsetValidation,
  })
  .refine(({ end, start }) => start < end, {
    message: "start must be before end",
  });

export type GetUsageTimeSchema = z.input<typeof getUsageTimeSchema>;
