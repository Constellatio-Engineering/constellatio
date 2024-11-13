import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const resetCaseProgressSchema = z.object({
  caseId: idValidation,
});

export type ResetCaseProgressSchema = z.input<typeof resetCaseProgressSchema>;
