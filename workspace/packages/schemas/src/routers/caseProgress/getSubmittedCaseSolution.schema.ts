import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getSubmittedCaseSolutionSchema = z.object({
  caseId: idValidation,
});

export type GetSubmittedCaseSolutionSchema = z.input<typeof getSubmittedCaseSolutionSchema>;
