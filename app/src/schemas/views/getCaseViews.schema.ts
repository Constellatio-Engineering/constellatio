import { z } from "zod";

export const getCaseViewsSchema = z.object({
  caseId: z.string().uuid(),
});

export type GetCaseViewsSchema = z.input<typeof getCaseViewsSchema>;
