import { idValidation } from "@/schemas/documents/document.validation";

import { z } from "zod";

export const getSubmittedCaseSolutionSchema = z.object({
  caseId: idValidation,
});

export type GetSubmittedCaseSolutionSchema = z.input<typeof getSubmittedCaseSolutionSchema>;
