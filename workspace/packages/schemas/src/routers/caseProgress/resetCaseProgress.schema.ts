import { idValidation } from "~/common/common.validation";

import { z } from "zod";

export const resetCaseProgressSchema = z.object({
  caseId: idValidation,
});

export type ResetCaseProgressSchema = z.input<typeof resetCaseProgressSchema>;
