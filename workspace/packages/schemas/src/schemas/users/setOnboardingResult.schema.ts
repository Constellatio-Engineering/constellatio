import { allOnboardingResults } from "@constellatio/shared/validation";

import { z } from "zod";

export const setOnboardingResultSchema = z.object({
  result: z.enum(allOnboardingResults).nullable()
});

export type SetOnboardingResultSchema = z.input<typeof setOnboardingResultSchema>;
