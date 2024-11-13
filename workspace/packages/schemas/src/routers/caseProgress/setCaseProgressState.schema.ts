
import { allCaseProgressStates } from "@constellatio/shared/validation";
import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const setCaseProgressStateSchema = z.object({
  caseId: idValidation,
  progressState: z.enum(allCaseProgressStates),
});

export type SetCaseProgressStateSchema = z.input<typeof setCaseProgressStateSchema>;
