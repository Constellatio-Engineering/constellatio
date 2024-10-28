import { allOnboardingResults } from "@constellatio/shared-types";

import { z } from "zod";

export const setOnboardingResultSchema = z.object({
  result: z.enum(allOnboardingResults).nullable()
});

export type SetOnboardingResultSchema = z.input<typeof setOnboardingResultSchema>;
