import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getSubmittedCaseSolutionSchema = z.object({
  caseId: idValidation,
});

export type GetSubmittedCaseSolutionSchema = z.input<typeof getSubmittedCaseSolutionSchema>;
