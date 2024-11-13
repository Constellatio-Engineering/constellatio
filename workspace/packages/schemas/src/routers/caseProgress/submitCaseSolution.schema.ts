import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const submitCaseSolutionSchema = z.object({
  caseId: idValidation,
  solution: z.string(),
});

export type SubmitCaseSolutionSchema = z.input<typeof submitCaseSolutionSchema>;
