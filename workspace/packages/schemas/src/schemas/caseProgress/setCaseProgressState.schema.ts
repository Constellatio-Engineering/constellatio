import { allCaseProgressStates } from "@constellatio/shared/validation";
import { idValidation } from "@/common/common.validation";

import { z } from "zod";

export const setCaseProgressStateSchema = z.object({
  caseId: idValidation,
  progressState: z.enum(allCaseProgressStates),
});

export type SetCaseProgressStateSchema = z.input<typeof setCaseProgressStateSchema>;
