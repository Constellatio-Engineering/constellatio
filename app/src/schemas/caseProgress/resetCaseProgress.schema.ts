import { idValidation } from "@/schemas/documents/document.validation";

import { z } from "zod";

export const resetCaseProgressSchema = z.object({
  caseId: idValidation,
});

export type ResetCaseProgressSchema = z.input<typeof resetCaseProgressSchema>;
