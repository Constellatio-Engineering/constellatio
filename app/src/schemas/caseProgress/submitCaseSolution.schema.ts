import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const submitCaseSolutionSchema = z.object({
  caseId: idValidation,
  solution: z.string(),
});

export type SubmitCaseSolutionSchema = z.input<typeof submitCaseSolutionSchema>;
