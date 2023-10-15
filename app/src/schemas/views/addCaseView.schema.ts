import { z } from "zod";

export const addCaseViewSchema = z.object({
  caseId: z.string().uuid(),
});

export type AddCaseViewSchema = z.input<typeof addCaseViewSchema>;
